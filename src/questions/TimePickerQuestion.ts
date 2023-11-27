import { QuestionInfo } from "../../types";
import { AbstractTimePickerQuestion, TimePickerQuestionInfo } from "../../types/Questions/AbstractTimePickerQuestion";

export class TimePickerQuestion extends AbstractTimePickerQuestion {
  /**
   * 选取的时间值
   */
  declare answer: string;

  constructor(options: Partial<QuestionInfo & TimePickerQuestionInfo> = {}) {
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
      ...options,
    };
    super("timePicker", option);
  }
}
