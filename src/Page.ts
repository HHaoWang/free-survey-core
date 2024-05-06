import { AbstractPage, AbstractQuestion, AbstractQuestionGroup, QuestionType } from "../types";
import { AbstractElement } from "../types/AbstractElement";
import { QuestionGroup } from "./QuestionGroup";
import { QuestionParserFactory } from "./QuestionParserFactory";
import { ValidationError } from "../types/Common";

export class Page extends AbstractPage {
  constructor(id: string | null = null) {
    super(id);
  }

  getAnswer = () => {
    const answer: { [key: string]: any } = {};
    for (const element of this.elements) {
      if (element.type === "question") {
        const question = element as AbstractQuestion;
        answer[question.id] = question.answer;
      } else if (element.type === "questionGroup") {
        const questionGroup = element as AbstractQuestionGroup;
        answer[questionGroup.id] = questionGroup.getAnswer();
      }
    }
    return answer;
  };

  getAnswerFlattened = () => {
    let answer: { [key: string]: any } = {};
    for (const element of this.elements) {
      if (element.type === "question") {
        const question = element as AbstractQuestion;
        answer[question.id] = question.answer;
      } else if (element.type === "questionGroup") {
        const questionGroup = element as AbstractQuestionGroup;
        answer = {
          ...answer,
          ...questionGroup.getAnswerFlattened(),
        };
      }
    }
    return answer;
  };

  static Parse(obj: any): AbstractPage {
    const baseInfo = AbstractElement.ExtractFromObject(obj);
    if (baseInfo.type !== "page") {
      throw Error("解析失败，此Json字符串格式不符合问卷要求！");
    }
    const page = new Page();
    page.id = baseInfo.id;

    if (!Array.isArray(obj["elements"])) {
      return page;
    }
    const factory = new QuestionParserFactory();
    for (const pageElement of obj["elements"]) {
      const elementBaseInfo = AbstractElement.ExtractFromObject(pageElement);
      if (elementBaseInfo.type !== "question" && elementBaseInfo.type !== "questionGroup") {
        throw Error("解析失败，此Json字符串格式不符合问卷要求！");
      }
      if (elementBaseInfo.type === "questionGroup") {
        const questionGroup = QuestionGroup.Parse(pageElement);
        page.elements.push(questionGroup);
        continue;
      }
      if (elementBaseInfo.type === "question") {
        if (typeof pageElement !== "object") {
          continue;
        }
        if (typeof pageElement["questionType"] !== "string") {
          continue;
        }
        const parser = factory.getParser(pageElement["questionType"] as QuestionType);
        page.elements.push(parser(pageElement));
      }
    }
    return page;
  }

  answerIsValid() {
    const results = [];
    for (const element of this.elements) {
      results.push(element.answerIsValid());
    }
    // noinspection DuplicatedCode
    return Promise.allSettled(results).then((res) => {
      const errors = [];
      for (const result of res) {
        if (result.status === "fulfilled" && result.value !== true) {
          errors.push(...(result.value as ValidationError[]));
        }
      }
      if (errors.length > 0) {
        return errors;
      }
      return true as const;
    });
  }
}
