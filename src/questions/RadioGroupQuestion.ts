import { AbstractQuestion, KeyValuePair, QuestionInfo } from "../../types";
import { ValidationError } from "../../types/Common";

export class RadioGroupQuestion extends AbstractQuestion {
  /**
   * 可选选项
   */
  choices: Array<KeyValuePair> = [];
  /**
   * 记录选项的键而非值，若allowOther为true则记录“其它”中填写的内容
   */
  declare answer: string | undefined;
  /**
   * 是否允许“其它”选项
   */
  allowOther: boolean;

  constructor(
    id: string | null = null,
    options: Partial<
      QuestionInfo & {
        allowOther: boolean;
        choices: Array<KeyValuePair>;
      }
    > = {},
  ) {
    const option = {
      isDecoration: false,
      title: "问题",
      showTitle: true,
      placeholder: "",
      defaultValue: "",
      description: "问题描述",
      isShown: true,
      isRequired: false,
      allowOther: false,
      answer: "",
      ...options,
    };
    super("radioGroup", option, id);
    this.allowOther = option.allowOther;
    this.choices = option.choices || [];
  }

  static parse(obj: any): RadioGroupQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new RadioGroupQuestion(obj["id"], obj);
  }

  answerIsValid(): Promise<true | Array<ValidationError>> {
    const errors: ValidationError[] = [];
    if (this.isRequired && !this.answer) {
      errors.push({
        elementId: this.id,
        msg: "此问题必填！",
        validatedData: this.answer,
      });
    }
    if (
      this.answer &&
      !this.choices.map((item) => item.key).includes(this.answer) &&
      !this.answer.startsWith("other:")
    ) {
      errors.push({
        elementId: this.id,
        msg: `已选选项${this.answer}不在可选选项内！`,
        validatedData: this.answer,
      });
    }
    if (this.answer && this.answer.startsWith("other:") && !this.allowOther) {
      errors.push({
        elementId: this.id,
        msg: `不允许填写“其它”选项！`,
        validatedData: this.answer,
      });
    }
    if (this.answer && this.answer.startsWith("other:") && this.answer.length <= 6) {
      errors.push({
        elementId: this.id,
        msg: `“其它”选项内容不能为空！`,
        validatedData: this.answer,
      });
    }
    return errors.length > 0 ? Promise.resolve(errors) : Promise.resolve(true);
  }
}
