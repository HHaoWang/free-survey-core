import { AbstractQuestion } from "./AbstractQuestion";
import { AbstractPageElement } from "./AbstractPageElement";

export abstract class AbstractQuestionGroup extends AbstractPageElement {
  readonly questions: Array<AbstractQuestion> = new Array<AbstractQuestion>();

  title: string;
  description: string;

  abstract getAnswer: () => { [key: string]: any };
  abstract getAnswerFlattened: () => { [key: string]: any };

  protected constructor(title: string, description: string, id: string | null = null) {
    super("questionGroup", id);
    this.title = title;
    this.description = description;
  }
}
