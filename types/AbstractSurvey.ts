import { AbstractPage } from "./AbstractPage";
import { ElementType, IdGenerator, AbstractElement } from "./AbstractElement";

export abstract class AbstractSurvey extends AbstractElement {
  title: string = "";
  description: string = "";
  pages: Array<AbstractPage> = new Array<AbstractPage>();
  currentPageNum: Number | null = null;
  currentPage: AbstractPage | null = null;
  abstract moveToNextPage: () => void;
  abstract moveToPrePage: () => void;
  abstract isValidForm: () => true | string;
  answer: object | null = null;

  protected constructor(type: ElementType, idGenerator: IdGenerator | null = null) {
    super(type, idGenerator);
  }
}
