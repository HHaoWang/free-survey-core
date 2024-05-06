import { AbstractPage } from "./AbstractPage";
import { AbstractElement } from "./AbstractElement";
import { AbstractQuestion } from "./AbstractQuestion";
import { AbstractQuestionGroup } from "./AbstractQuestionGroup";

export abstract class AbstractSurvey extends AbstractElement {
  title: string = "";
  description: string = "";
  pages: Array<AbstractPage> = new Array<AbstractPage>();

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

  /**
   * 从json格式保存的问卷中导入并覆盖当前问卷实例
   */
  abstract importFromJson(jsonContent: string): void;

  /**
   * 导出当前问卷为json格式字符串
   */
  abstract exportToJson(): string;

  protected constructor(id: string | null = null) {
    super("survey", id);
  }
}
