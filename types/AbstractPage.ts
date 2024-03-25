import { AbstractElement } from "./AbstractElement";
import { AbstractPageElement } from "./AbstractPageElement";

export abstract class AbstractPage extends AbstractElement {
  elements: Array<AbstractPageElement> = new Array<AbstractPageElement>();
  abstract getAnswer: () => { [key: string]: any };
  abstract getAnswerFlattened: () => { [key: string]: any };

  protected constructor(id: string | null = null) {
    super("page", id);
  }
}
