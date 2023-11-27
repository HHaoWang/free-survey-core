import { AbstractElement, IdGenerator } from "./AbstractElement";
import { AbstractPageElement } from "./AbstractPageElement";

export abstract class AbstractPage extends AbstractElement {
  elements: Array<AbstractPageElement> = new Array<AbstractPageElement>();
  abstract getAnswer: () => { [key: string]: any };
  abstract getAnswerFlattened: () => { [key: string]: any };

  protected constructor(idGenerator: IdGenerator | null = null) {
    super("page", idGenerator);
  }
}
