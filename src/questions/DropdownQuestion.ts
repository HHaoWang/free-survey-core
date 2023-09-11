import { AbstractQuestion, KeyValuePair, QuestionInfo } from "../../types";

export class DropdownQuestion extends AbstractQuestion {
  /**
   * 可选选项
   */
  choices: Array<KeyValuePair> = [];

  /**
   * 记录选项的键而非值
   */
  declare answer: Array<string>;

  /**
   * 是否允许多选
   */
  allowMultipleAnswers: boolean;

  constructor(
    options: Partial<
      QuestionInfo & {
        allowMultipleAnswers: boolean;
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
      allowMultipleAnswers: false,
      ...options,
    };
    super("dropdown", option);
    this.allowMultipleAnswers = option.allowMultipleAnswers;
  }
}
