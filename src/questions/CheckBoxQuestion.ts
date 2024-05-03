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
}
