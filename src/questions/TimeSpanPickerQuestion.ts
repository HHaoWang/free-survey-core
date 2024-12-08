import { AbstractQuestion, QuestionInfo } from "../../types";
import { AbstractTimePickerQuestion, TimePickerQuestionInfo } from "../../types/Questions/AbstractTimePickerQuestion";
import { ValidationError } from "../../types";
import { LocalDate, LocalTime, ZonedDateTime } from "@js-joda/core";

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

    try {
      let Parser;
      if (this.allowDate && this.allowTime) {
        Parser = ZonedDateTime;
      } else if (this.allowDate && !this.allowTime) {
        Parser = LocalDate;
      } else if (!this.allowDate && this.allowTime) {
        Parser = LocalTime;
      } else if (!this.allowDate && !this.allowTime) {
        throw "时间选择器不允许选择日期和时间！";
      }
      const answerTimes = [Parser!.parse(this.answer[0]), Parser!.parse(this.answer[1])];
      const notBefore = this.notBefore ? Parser!.parse(this.notBefore) : null;
      const notAfter = this.notAfter ? Parser!.parse(this.notAfter) : null;
      // @ts-ignore
      if (answerTimes[0].isAfter(answerTimes[1])) {
        errors.push({
          elementId: this.id,
          msg: "选择的时间段不合法！",
          validatedData: this.answer,
        });
      }
      // @ts-ignore
      if (this.notAfter && answerTimes[1].isAfter(notAfter)) {
        errors.push({
          elementId: this.id,
          msg: `选择的时间在${this.notAfter}之后！`,
          validatedData: this.answer,
        });
      }
      // @ts-ignore
      if (this.notBefore && answerTimes[0].isBefore(notBefore)) {
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

  getAnswerTextFromValue(answerValue: string[]): string[] {
    return answerValue;
  }
}
