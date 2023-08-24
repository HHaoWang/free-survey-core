import { AbstractElement, IdGenerator } from "./AbstractElement";
import { AbstractPageElement } from "./AbstractPageElement";

export abstract class AbstractPage extends AbstractElement {
  elements: Array<AbstractPageElement> = new Array<AbstractPageElement>();

  protected constructor(idGenerator: IdGenerator | null = null) {
    super("page", idGenerator);
  }
}
