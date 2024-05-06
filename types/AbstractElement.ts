import { factory, detectPrng } from "ulid";
import { ValidationError } from "./Common";

// 启用不安全的Math.random，因为我们不需要其作为加密算法的一部分，而只是需要一个随机数生成器
const prng = detectPrng(true);
const ulid = factory(prng);

export abstract class AbstractElement {
  private _type: ElementType;
  public get type(): ElementType {
    return this._type;
  }

  protected set type(value: ElementType) {
    this._type = value;
  }

  private _id: string;
  public get id(): string {
    return this._id;
  }

  protected set id(value: string) {
    this._id = value;
  }

  protected constructor(type: ElementType, id: string | null = null) {
    this._type = type;
    this._id = id ?? ulid();
  }

  public static ExtractFromObject(obj: any): { id: string; type: ElementType } {
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

  public toJSON(): string {
    let obj: any = {};

    for (let key in this) {
      if (key[0] === "_") {
        obj[key.substring(1)] = this[key];
      } else {
        obj[key] = this[key];
      }
    }

    return obj;
  }

  abstract answerIsValid(): Promise<true | Array<ValidationError>>;
}
export const PageElementTypes = ["questionGroup", "question"] as const;
export type PageElementType = (typeof PageElementTypes)[number];
export const ElementTypes = ["survey", "page", ...PageElementTypes] as const;
export type ElementType = (typeof ElementTypes)[number];
