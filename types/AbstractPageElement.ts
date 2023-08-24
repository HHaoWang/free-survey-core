import { AbstractElement, IdGenerator, PageElementType } from "./AbstractElement";

export abstract class AbstractPageElement extends AbstractElement {
  declare type: PageElementType;

  protected constructor(type: PageElementType, idGenerator: IdGenerator | null = null) {
    super(type, idGenerator);
  }
}
