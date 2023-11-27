import { AbstractQuestion } from "./AbstractQuestion";
import { AbstractPageElement } from "./AbstractPageElement";
import { IdGenerator } from "./AbstractElement";

export abstract class AbstractQuestionGroup extends AbstractPageElement {
  readonly questions: Array<AbstractQuestion> = new Array<AbstractQuestion>();

  title: string;
  description: string;

  abstract getAnswer: () => { [key: string]: any };
  abstract getAnswerFlattened: () => { [key: string]: any };

  protected constructor(title: string, description: string, idGenerator: IdGenerator | null = null) {
    super("questionGroup", idGenerator);
    this.title = title;
    this.description = description;
  }
}
