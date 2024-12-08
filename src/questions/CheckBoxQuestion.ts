import { AbstractQuestion, KeyValuePair, QuestionInfo } from "../../types";
import { ValidationError } from "../../types";

/**
 * 多选问题
 */
export class CheckBoxQuestion extends AbstractQuestion {
  /**
   * 可选选项
   */
  choices: Array<KeyValuePair> = [];

  /**
   * 最多选择选项数量，undefined表示不限制
   */
  maxSelect: number | undefined;

  /**
   * 最少选择选项数量，undefined表示不限制<br>
   * isRequired为true时至少选择一项,此时minSelect若为0或不限制无效
   */
  minSelect: number | undefined;

  /**
   * 记录选项的键而非值
   */
  declare answer: Array<string>;

  constructor(
    id: string | null = null,
    options: Partial<
      QuestionInfo & {
        choices: Array<KeyValuePair>;
        maxSelect: number | undefined;
        minSelect: number | undefined;
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
    this.maxSelect = option.maxSelect;
    this.minSelect = option.minSelect;
  }

  /**
   * 解析Json对象为CheckBoxQuestion实例
   * @param obj 解析后的Json对象
   * @returns CheckBoxQuestion实例
   */
  static parse(obj: { [key: string]: any }): AbstractQuestion {
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
    if (this.minSelect && this.answer.length < this.minSelect) {
      errors.push({
        elementId: this.id,
        msg: `至少选择${this.minSelect}项！`,
        validatedData: this.answer,
      });
    }
    if (this.maxSelect && this.answer.length > this.maxSelect) {
      errors.push({
        elementId: this.id,
        msg: `最多选择${this.maxSelect}项！`,
        validatedData: this.answer,
      });
    }
    return errors.length > 0 ? Promise.resolve(errors) : Promise.resolve(true);
  }

  getAnswerTextFromValue(answerValue: string | string[]): string | string[] {
    if (Array.isArray(answerValue)) {
      return answerValue.map((val) => {
        return this.choices.find((p) => p.key === val)?.value ?? val;
      });
    }
    return this.choices.find((p) => p.key === answerValue)?.value ?? answerValue;
  }
}
