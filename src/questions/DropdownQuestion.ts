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
    id: string | null = null,
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
      answer: "",
      ...options,
    };
    super("dropdown", option, id);
    this.allowMultipleAnswers = option.allowMultipleAnswers;
  }

  static parse(obj: any): AbstractQuestion{
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new DropdownQuestion(obj["id"], obj);
  }
}
