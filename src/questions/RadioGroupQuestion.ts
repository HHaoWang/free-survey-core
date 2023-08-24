import { AbstractQuestion, KeyValuePair, QuestionInfo } from "../../types";

export class RadioGroupQuestion extends AbstractQuestion {
  choices: Array<KeyValuePair> = new Array<KeyValuePair>();
  declare answer: string;

  constructor(
    options: QuestionInfo & {
      allowOther: boolean;
    } = {
      isDecoration: false,
      title: "问题",
      showTitle: true,
      placeholder: "",
      defaultValue: "",
      description: "问题描述",
      isShown: true,
      isRequired: false,
      allowOther: false,
    },
  ) {
    super("radioGroup", options);
  }
}
