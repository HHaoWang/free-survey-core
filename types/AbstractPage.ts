import { AbstractElement } from "./AbstractElement";
import { AbstractPageElement } from "./AbstractPageElement";

export abstract class AbstractPage extends AbstractElement {
  elements: Array<AbstractPageElement> = new Array<AbstractPageElement>();
  abstract getAnswer(): { [key: string]: any };
  abstract getAnswerFlattened(): { [key: string]: any };

  /**
   * 构造函数
   * @param id 页面ID
   * @protected
   */
  protected constructor(id: string | null = null) {
    super("page", id);
  }
}
