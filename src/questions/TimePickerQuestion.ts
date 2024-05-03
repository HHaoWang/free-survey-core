import { AbstractQuestion, QuestionInfo } from "../../types";
import { AbstractTimePickerQuestion, TimePickerQuestionInfo } from "../../types/Questions/AbstractTimePickerQuestion";

export class TimePickerQuestion extends AbstractTimePickerQuestion {
  /**
   * 选取的时间值
   */
  declare answer: string;

  constructor(id: string | null = null, options: Partial<QuestionInfo & TimePickerQuestionInfo> = {}) {
    const option = {
      isDecoration: false,
      title: "问题",
      showTitle: true,
      placeholder: "",
      defaultValue: "",
      description: "问题描述",
      isShown: true,
      isRequired: false,
      allowDate: true,
      allowTime: true,
      format: "YYYY-MM-DD HH:mm:ss",
      timezone: "",
      notBefore: null,
      notAfter: null,
      answer: "",
      ...options,
    };
    super("timePicker", option, id);
  }

  static parse(obj: any): AbstractQuestion{
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new TimePickerQuestion(obj["id"], obj);
  }
}
