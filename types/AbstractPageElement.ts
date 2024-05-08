import { AbstractElement, PageElementType } from "./AbstractElement";

export abstract class AbstractPageElement extends AbstractElement {
  public declare "type": PageElementType;

  protected constructor(type: PageElementType, id: string | null = null) {
    super(type, id);
  }
}
