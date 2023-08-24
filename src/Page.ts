import { AbstractPage } from "../types";
import { IdGenerator } from "../types/AbstractElement";

export class Page extends AbstractPage {
  constructor(idGenerator: IdGenerator | null = null) {
    super(idGenerator);
  }
}
