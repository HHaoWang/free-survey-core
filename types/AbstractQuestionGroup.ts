import { AbstractQuestion } from "./AbstractQuestion";
import { AbstractPageElement } from "./AbstractPageElement";

export abstract class AbstractQuestionGroup extends AbstractPageElement {
  readonly questions: Array<AbstractQuestion> = new Array<AbstractQuestion>();

  title: string;
  description: string;

  /**
   * 获取结构化展示的题组的答案
   * @returns 题组的答案
   */
  abstract getAnswer(): { [key: string]: any };

  /**
   * 获取扁平化展示的题组的答案
   * @returns 题组的答案
   */
  abstract getAnswerFlattened(): { [key: string]: any };

  /**
   * 构造函数
   * @param title 题组标题
   * @param description 题组描述
   * @param id 题组ID
   * @protected
   */
  protected constructor(title: string, description: string, id: string | null = null) {
    super("questionGroup", id);
    this.title = title;
    this.description = description;
  }
}
