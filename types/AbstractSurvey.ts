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

  abstract getAllElements: () => Array<AbstractElement>;
  abstract getElement: (id: string) => AbstractElement | null;
  abstract getElementWithExtraInfos: (
    idOrElement: string | AbstractElement,
  ) => { target: AbstractElement; parent: AbstractElement | null } | null;
  abstract getAllPages: () => Array<AbstractPage>;
  abstract getAllQuestionGroups: () => Array<AbstractQuestionGroup>;
  abstract getAllQuestions: () => Array<AbstractQuestion>;
  abstract deleteElement: (id: string) => boolean;
  abstract getAnswer: () => { [key: string]: any };
  abstract getAnswerFlattened: () => { [key: string]: any };

  protected constructor(type: ElementType, idGenerator: IdGenerator | null = null) {
    super(type, idGenerator);
  }
}
