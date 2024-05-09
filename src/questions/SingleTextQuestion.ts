import { AbstractQuestion, QuestionInfo } from "../../types";
import { tryGetQuestionInfoValue } from "../utils/TypeUtils";
import { ValidationError } from "../../types/Common";

export class SingleTextQuestion extends AbstractQuestion {
  declare answer: string;
  /**
   * 最小长度，如果不设置则不限制，若isRequired为true则答案长度必须大于0，然后再根据此设置进行校验
   */
  minLength: number | undefined;
  /**
   * 最大长度，如果不设置则不限制
   */
  maxLength: number | undefined;

  constructor(id: string | null = null, options: Partial<QuestionInfo> = {}) {
    super(
      "singleText",
      {
        isDecoration: false,
        title: "问题",
        showTitle: true,
        placeholder: "",
        defaultValue: "",
        description: "问题描述",
        isShown: true,
        isRequired: false,
        answer: "",
        ...options,
      },
      id,
    );
  }

  static parse(obj: any): AbstractQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new SingleTextQuestion(obj["id"], tryGetQuestionInfoValue(obj));
  }

  answerIsValid(): Promise<true | Array<ValidationError>> {
    const errors: ValidationError[] = [];
    const answer = this.answer.trim() + "";
    if (this.isRequired && answer.length <= 0) {
      errors.push({
        msg: "此问题必填且不能为空白字符！",
        elementId: this.id,
        validatedData: this.answer,
      });
    }

    if (this.minLength && answer.length < this.minLength) {
      errors.push({
        elementId: this.id,
        msg: "此问题要求回答字数不少于" + this.minLength + "!",
        validatedData: answer,
      });
    }

    if (this.maxLength && answer.length > this.maxLength) {
      errors.push({
        elementId: this.id,
        msg: "此问题要求回答字数不多于" + this.maxLength + "!",
        validatedData: answer,
      });
    }

    return errors.length > 0 ? Promise.resolve(errors) : Promise.resolve(true);
  }
}
