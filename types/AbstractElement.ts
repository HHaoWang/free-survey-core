import { ulid } from "ulid";

export abstract class AbstractElement {
  readonly id: string;
  readonly idGenerator: IdGenerator;
  readonly type: ElementType;

  protected constructor(type: ElementType, idGenerator: IdGenerator | null = null) {
    this.type = type;
    this.idGenerator = idGenerator ? idGenerator : () => ulid();
    this.id = this.idGenerator(type);
  }
}
export type IdGenerator = (type: ElementType) => string;
export type PageElementType = "questionGroup" | "question";
export type ElementType = "survey" | "page" | PageElementType;
