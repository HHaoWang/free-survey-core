import { AbstractQuestion, QuestionInfo, QuestionType } from "../AbstractQuestion";
import { IdGenerator } from "../AbstractElement";

export interface TimePickerQuestionInfo {
  /**
   * 是否需要填写日期
   */
  allowDate: boolean;

  /**
   * 是否需要填写时间
   */
  allowTime: boolean;

  /**
   * 时间记录格式，参考Dayjs
   */
  format: string;

  /**
   * 日期时区，解析或者输入时都会指定
   */
  timezone: string;

  /**
   * 可选最早时间，为null表示不限制
   */
  notBefore: string | null;

  /**
   * 可选最晚时间，为null表示不限制
   */
  notAfter: string | null;
}

export abstract class AbstractTimePickerQuestion extends AbstractQuestion implements TimePickerQuestionInfo {
  allowDate: boolean;
  allowTime: boolean;
  format: string;
  notAfter: string | null;
  notBefore: string | null;
  timezone: string;
  protected constructor(
    questionType: QuestionType,
    option: QuestionInfo & TimePickerQuestionInfo,
    idGenerator: IdGenerator | null = null,
  ) {
    super(questionType, option, idGenerator);
    this.allowTime = option.allowTime;
    this.allowDate = option.allowDate;
    this.format = option.format;
    this.timezone = option.timezone;
    this.notAfter = option.notAfter;
    this.notBefore = option.notBefore;
  }
}
