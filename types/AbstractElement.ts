import { factory, detectPrng } from "ulid";
import { ValidationError } from "./Common";

// 启用不安全的Math.random，因为我们不需要其作为加密算法的一部分，而只是需要一个随机数生成器
const prng = detectPrng(true);
const ulid = factory(prng);

export abstract class AbstractElement {
  public "type": ElementType;
  public id: string;

  protected constructor(type: ElementType, id: string | null = null) {
    this.type = type;
    this.id = id ?? ulid();
  }

  /**
   * 从对象中提取id和type
   * @param obj 对象
   * @returns id和type
   */
  public static ExtractFromObject(obj: { [key: string]: any }): { id: string; type: ElementType } {
    if (typeof obj !== "object" || !obj) {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    if (!(typeof obj["id"] === "string" && typeof obj["type"] === "string")) {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    const type = obj["type"];
    return {
      id: obj["id"],
      type: type as ElementType,
    };
  }

  /**
   * 检查答案是否有效
   * @returns true表示答案有效，否则返回错误信息数组
   */
  abstract answerIsValid(): Promise<true | Array<ValidationError>>;
}
export const PageElementTypes = ["questionGroup", "question"] as const;
export type PageElementType = (typeof PageElementTypes)[number];
export const ElementTypes = ["survey", "page", ...PageElementTypes] as const;
export type ElementType = (typeof ElementTypes)[number];
