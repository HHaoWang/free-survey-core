import { AbstractQuestion, QuestionInfo } from "../../types";
import { AbstractTimePickerQuestion, TimePickerQuestionInfo } from "../../types/Questions/AbstractTimePickerQuestion";
import { ValidationError } from "../../types/Common";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";

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

  static parse(obj: any): AbstractQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new TimePickerQuestion(obj["id"], obj);
  }

  answerIsValid(): Promise<true | Array<ValidationError>> {
    const errors: ValidationError[] = [];
    if (this.isRequired && !this.answer) {
      errors.push({
        elementId: this.id,
        msg: "此问题必填！",
        validatedData: this.answer,
      });
    }

    try {
      dayjs.extend(CustomParseFormat);
      if (this.format) {
      }
      const time = dayjs(this.answer, this.format, true);
      if (this.notAfter && time.isAfter(dayjs(this.notAfter))) {
        errors.push({
          elementId: this.id,
          msg: `选择的时间在${this.notAfter}之后！`,
          validatedData: this.answer,
        });
      }
      if (this.notBefore && time.isBefore(dayjs(this.notBefore))) {
        errors.push({
          elementId: this.id,
          msg: `选择的时间在${this.notBefore}之前！`,
          validatedData: this.answer,
        });
      }
    } catch (error) {
      errors.push({
        elementId: this.id,
        msg: "解析时间失败，此回答不是有效的时间！",
        validatedData: this.answer,
      });
    }

    return errors.length > 0 ? Promise.resolve(errors) : Promise.resolve(true);
  }
}
