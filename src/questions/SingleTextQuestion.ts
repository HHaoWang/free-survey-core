import { AbstractQuestion, QuestionInfo } from "../../types";

export class SingleTextQuestion extends AbstractQuestion {
  declare answer: string;

  constructor(options: Partial<QuestionInfo> = {}) {
    super("singleText", {
      isDecoration: false,
      title: "问题",
      showTitle: true,
      placeholder: "",
      defaultValue: "",
      description: "问题描述",
      isShown: true,
      isRequired: false,
      ...options,
    });
  }
}
