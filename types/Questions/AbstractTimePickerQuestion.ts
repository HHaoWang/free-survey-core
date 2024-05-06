import { AbstractQuestion, QuestionInfo, QuestionType } from "../AbstractQuestion";

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
   * 时间显示格式，参考Dayjs，此格式仅用于数据展示时使用
   * 保存答案时统一采用ISO8601格式
   */
  format: string;

  /**
   * 可选最早时间，ISO8601格式，为null表示不限制
   */
  notBefore: string | null;

  /**
   * 可选最晚时间，ISO8601格式，为null表示不限制
   */
  notAfter: string | null;
}

export abstract class AbstractTimePickerQuestion extends AbstractQuestion implements TimePickerQuestionInfo {
  allowDate: boolean;
  allowTime: boolean;
  format: string;
  notAfter: string | null;
  notBefore: string | null;
  protected constructor(
    questionType: QuestionType,
    option: QuestionInfo & TimePickerQuestionInfo,
    id: string | null = null,
  ) {
    super(questionType, option, id);
    this.allowTime = option.allowTime;
    this.allowDate = option.allowDate;
    this.format = option.format;
    this.notAfter = option.notAfter;
    this.notBefore = option.notBefore;
  }
}
