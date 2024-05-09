import { AbstractPage } from "./AbstractPage";
import { AbstractElement } from "./AbstractElement";
import { AbstractQuestion } from "./AbstractQuestion";
import { AbstractQuestionGroup } from "./AbstractQuestionGroup";

export abstract class AbstractSurvey extends AbstractElement {
  title: string = "";
  description: string = "";
  pages: Array<AbstractPage> = new Array<AbstractPage>();

  /**
   * 获取问卷中全部组件，采用前序遍历
   */
  abstract getAllElements(): Array<AbstractElement>;
  /**
   * 获取指定ID的组件
   * @param id 组件ID
   * @returns 指定ID的组件，找不到时返回null
   */
  abstract getElement(id: string): AbstractElement | null;
  /**
   * 获取指定组件及其父项
   * @param idOrElement 模板题目ID或元素
   * @returns 目标题目及其父项，找不到时返回null
   */
  abstract getElementWithExtraInfos(
    idOrElement: string | AbstractElement,
  ): { target: AbstractElement; parent: AbstractElement | null } | null;
  /**
   * 获取全部页面
   * @returns 全部页面
   */
  abstract getAllPages(): Array<AbstractPage>;
  /**
   * 获取全部题组
   * @returns 全部题组
   */
  abstract getAllQuestionGroups(): Array<AbstractQuestionGroup>;
  /**
   * 获取全部问题
   * @returns 全部问题
   */
  abstract getAllQuestions(): Array<AbstractQuestion>;
  /**
   * 删除组件
   * @param idOrElement 组件ID或组件
   * @returns 删除是否成功，如果不存在该组件则返回true
   */
  abstract deleteElement(idOrElement: string | AbstractElement): boolean;
  /**
   * 获取结构化的问卷答案，此方法不检查答案的合法性
   */
  abstract getAnswer(): { [key: string]: any };
  /**
   * 获取所有问题答案数组，此方法不检查答案的合法性
   */
  abstract getAnswerFlattened(): { [key: string]: any };
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
