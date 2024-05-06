import { AbstractQuestion, KeyValuePair, QuestionInfo } from "../../types";
import { ValidationError } from "../../types/Common";

export class DropdownQuestion extends AbstractQuestion {
  /**
   * 可选选项
   */
  choices: Array<KeyValuePair> = [];

  /**
   * 记录选项的键而非值
   */
  declare answer: string | undefined;

  constructor(id: string | null = null, options: Partial<QuestionInfo> = {}) {
    const option = {
      isDecoration: false,
      title: "问题",
      showTitle: true,
      placeholder: "",
      defaultValue: "",
      description: "问题描述",
      isShown: true,
      isRequired: false,
      allowMultipleAnswers: false,
      answer: "",
      ...options,
    };
    super("dropdown", option, id);
  }

  static parse(obj: any): AbstractQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new DropdownQuestion(obj["id"], obj);
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
    if (this.answer && !this.choices.map((item) => item.key).includes(this.answer)) {
      errors.push({
        elementId: this.id,
        msg: `已选选项${this.answer}不在可选选项内！`,
        validatedData: this.answer,
      });
    }
    return errors.length > 0 ? Promise.resolve(errors) : Promise.resolve(true);
  }
}
