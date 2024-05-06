import { AbstractQuestion, QuestionInfo } from "../../types";
import { AbstractTimePickerQuestion, TimePickerQuestionInfo } from "../../types/Questions/AbstractTimePickerQuestion";
import { ValidationError } from "../../types/Common";
import dayjs from "dayjs";
import CustomParseFormat from "dayjs/plugin/customParseFormat";

export class TimeSpanPickerQuestion extends AbstractTimePickerQuestion {
  /**
   * 选取的时间值
   */
  declare answer: [string, string];

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
      timezone: "Asia/Shanghai",
      notBefore: null,
      notAfter: null,
      answer: ["", ""],
      ...options,
    };
    super("timeSpanPicker", option, id);
  }

  static parse(obj: any): AbstractQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new TimeSpanPickerQuestion(obj["id"], obj);
  }

  answerIsValid(): Promise<true | Array<ValidationError>> {
    const errors: ValidationError[] = [];
    if (
      this.isRequired &&
      (!this.answer ||
        this.answer.length !== 2 ||
        typeof this.answer[0] !== "string" ||
        typeof this.answer[1] !== "string")
    ) {
      errors.push({
        elementId: this.id,
        msg: "此问题必填！",
        validatedData: this.answer,
      });
    }
    dayjs.extend(CustomParseFormat);
    try {
      const times = [dayjs(this.answer[0], this.format, true), dayjs(this.answer[1], this.format, true)];
      if (times[0].isAfter(times[1])) {
        errors.push({
          elementId: this.id,
          msg: "选取时间段开始时间必须在结束时间之前！",
          validatedData: this.answer,
        });
      }
      if (this.notBefore && times[0].isBefore(dayjs(this.notBefore))) {
        errors.push({
          elementId: this.id,
          msg: `选择的时间在${this.notBefore}之前！`,
          validatedData: this.answer,
        });
      }
      if (this.notAfter && times[1].isAfter(dayjs(this.notAfter))) {
        errors.push({
          elementId: this.id,
          msg: `选择的时间在${this.notAfter}之之后！`,
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
