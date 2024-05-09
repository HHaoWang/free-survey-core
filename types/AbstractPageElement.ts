import { AbstractElement, PageElementType } from "./AbstractElement";

export abstract class AbstractPageElement extends AbstractElement {
  public declare "type": PageElementType;

  /**
   * 构造函数
   * @param type 页面元素类型
   * @param id 页面元素ID
   * @protected
   */
  protected constructor(type: PageElementType, id: string | null = null) {
    super(type, id);
  }
}
