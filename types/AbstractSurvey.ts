import { AbstractPage } from "./AbstractPage";
import { ElementType, IdGenerator, AbstractElement } from "./AbstractElement";
import { AbstractQuestion } from "./AbstractQuestion";
import { AbstractQuestionGroup } from "./AbstractQuestionGroup";

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
  abstract getAllElements: () => Array<AbstractElement>;
  abstract getElement: (id: string) => AbstractElement | null;
  abstract getElementWithExtraInfos: (
    idOrElement: string | AbstractElement,
  ) => { target: AbstractElement; parent: AbstractElement | null } | null;
  abstract getAllPages: () => Array<AbstractPage>;
  abstract getAllQuestionGroups: () => Array<AbstractQuestionGroup>;
  abstract getAllQuestions: () => Array<AbstractQuestion>;
  abstract deleteElement: (id: string) => boolean;

  protected constructor(type: ElementType, idGenerator: IdGenerator | null = null) {
    super(type, idGenerator);
  }
}
