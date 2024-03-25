import { AbstractQuestion, KeyValuePair, QuestionInfo } from "../../types";

export class CheckBoxQuestion extends AbstractQuestion {
  /**
   * 可选选项
   */
  choices: Array<KeyValuePair> = [];

  /**
   * 记录选项的键而非值
   */
  declare answer: Array<string>;

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
      ...options,
    };
    super("checkbox", option, id);
  }
}
