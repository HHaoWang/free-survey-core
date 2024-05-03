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
    const question = new RadioGroupQuestion(obj["id"], obj);
    return question;
  }
}
