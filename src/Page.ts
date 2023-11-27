import { AbstractPage, AbstractQuestion, AbstractQuestionGroup } from "../types";
import { IdGenerator } from "../types/AbstractElement";

export class Page extends AbstractPage {
  constructor(idGenerator: IdGenerator | null = null) {
    super(idGenerator);
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
}
