import { AbstractQuestion, KeyValuePair, QuestionInfo } from "../../types";
import { ValidationError } from "../../types/Common";

/**
 * 多选问题
 */
export class CheckBoxQuestion extends AbstractQuestion {
  /**
   * 可选选项
   */
  choices: Array<KeyValuePair> = [];

  /**
   * 记录选项的键而非值
   */
  declare answer: Array<string>;

  constructor(
    id: string | null = null,
    options: Partial<
      QuestionInfo & {
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
      answer: [],
      ...options,
    };
    super("checkbox", option, id);
    this.choices = option.choices || [];
  }

  static parse(obj: any): AbstractQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new CheckBoxQuestion(obj["id"], obj);
  }

  answerIsValid(): Promise<true | Array<ValidationError>> {
    const errors: ValidationError[] = [];
    if (this.isRequired && this.answer.length <= 0) {
      errors.push({
        elementId: this.id,
        msg: "此问题必填！",
        validatedData: this.answer,
      });
    }
    const choicesKeys = this.choices.map((item) => item.key);
    for (const selectedItem of this.answer) {
      if (!choicesKeys.includes(selectedItem)) {
        errors.push({
          elementId: this.id,
          msg: `已选选项${selectedItem}不在可选选项内！`,
          validatedData: this.answer,
        });
      }
    }
    return errors.length > 0 ? Promise.resolve(errors) : Promise.resolve(true);
  }
}
