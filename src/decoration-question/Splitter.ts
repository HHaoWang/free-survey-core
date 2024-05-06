import { AbstractQuestion } from "../../types";
import { ValidationError } from "../../types/Common";

export class Splitter extends AbstractQuestion {
  constructor(id: string | null = null, options: { title?: string } = {}) {
    super(
      "splitter",
      {
        isDecoration: true,
        title: "",
        showTitle: false,
        placeholder: "",
        defaultValue: "",
        description: "",
        isShown: true,
        isRequired: false,
        answer: "",
        ...options,
      },
      id,
    );
  }

  static parse(obj: any): AbstractQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new Splitter(obj["id"]);
  }

  answerIsValid(): Promise<true | Array<ValidationError>> {
    return Promise.resolve(true);
  }
}
