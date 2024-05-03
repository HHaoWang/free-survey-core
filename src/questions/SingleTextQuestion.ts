import { AbstractQuestion, QuestionInfo } from "../../types";
import { tryGetQuestionInfoValue } from "../utils/TypeUtils";

export class SingleTextQuestion extends AbstractQuestion {
  declare answer: string;

  constructor(id: string | null = null, options: Partial<QuestionInfo> = {}) {
    super(
      "singleText",
      {
        isDecoration: false,
        title: "问题",
        showTitle: true,
        placeholder: "",
        defaultValue: "",
        description: "问题描述",
        isShown: true,
        isRequired: false,
        answer: "",
        ...options,
      },
      id,
    );
  }

  static parse(obj: any): AbstractQuestion{
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new SingleTextQuestion(obj["id"], tryGetQuestionInfoValue(obj));
  }
}
