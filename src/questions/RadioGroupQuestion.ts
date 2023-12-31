import { AbstractQuestion, KeyValuePair, QuestionInfo } from "../../types";

export class RadioGroupQuestion extends AbstractQuestion {
  /**
   * 可选选项
   */
  choices: Array<KeyValuePair> = [];
  /**
   * 记录选项的键而非值，若allowOther为true则记录“其它”中填写的内容
   */
  declare answer: string;
  /**
   * 是否允许“其它”选项
   */
  allowOther: boolean;

  constructor(
    options: Partial<
      QuestionInfo & {
        allowOther: boolean;
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
      ...options,
    };
    super("radioGroup", option);
    this.allowOther = option.allowOther;
  }
}
