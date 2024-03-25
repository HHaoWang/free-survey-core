import { AbstractElement, PageElementType } from "./AbstractElement";

export abstract class AbstractPageElement extends AbstractElement {
  public get type(): PageElementType {
    return super.type as PageElementType;
  }

  protected constructor(type: PageElementType, id: string | null = null) {
    super(type, id);
  }
}
