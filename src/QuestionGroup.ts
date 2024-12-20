import { AbstractQuestionGroup, QuestionType } from "../types";
import { AbstractElement } from "../types/AbstractElement";
import { QuestionParserFactory } from "./QuestionParserFactory";
import { ValidationError } from "../types/Common";

export class QuestionGroup extends AbstractQuestionGroup {
  constructor(id: string | null = null) {
    super("问题组", "问题组描述", id);
  }

  getAnswer() {
    const answer: { [key: string]: any } = {};
    for (const question of this.questions) {
      answer[question.id] = question.answer;
    }
    return answer;
  }

  getAnswerFlattened() {
    return this.getAnswer();
  }

  public static Parse(obj: any): AbstractQuestionGroup {
    const baseInfo = AbstractElement.ExtractFromObject(obj);
    if (baseInfo.type !== "questionGroup") {
      throw Error(`解析失败，此对象不是题组对象！Object:${obj}`);
    }

    const questionGroup = new QuestionGroup();
    questionGroup.id = baseInfo.id;

    if (typeof obj["title"] === "string") {
      questionGroup.title = obj["title"];
    }
    if (typeof obj["description"] === "string") {
      questionGroup.description = obj["description"];
    }

    if (!Array.isArray(obj["questions"])) {
      return questionGroup;
    }

    const factory = new QuestionParserFactory();
    for (const question of obj["questions"]) {
      if (typeof question !== "object") {
        continue;
      }
      if (typeof question["questionType"] !== "string") {
        continue;
      }
      const parser = factory.getParser(question["questionType"] as QuestionType);
      questionGroup.questions.push(parser(question));
    }

    return questionGroup;
  }

  answerIsValid() {
    const results = [];
    for (const question of this.questions) {
      results.push(question.answerIsValid());
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
