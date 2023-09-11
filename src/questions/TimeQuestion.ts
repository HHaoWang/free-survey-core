import { AbstractQuestion, QuestionInfo } from "../../types";

export class TimeQuestion extends AbstractQuestion {
  /**
   * 是否需要填写日期
   */
  allowDate: boolean;

  /**
   * 是否需要填写时间
   */
  allowTime: boolean;

  /**
   * 记录选项的键而非值
   */
  declare answer: Array<string>;

  /**
   * 时间记录格式，参考Dayjs
   */
  format: string;

  /**
   * 日期时区，解析或者输入时都会指定
   */
  timezone: string;

  constructor(
    options: Partial<
      QuestionInfo & {
        allowDate: boolean;
        allowTime: boolean;
        format: string;
        timezone: string;
      }
    > = {},
  ) {
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
      ...options,
    };
    super("time", option);
    this.allowTime = option.allowTime;
    this.allowDate = option.allowDate;
    this.format = option.format;
    this.timezone = option.timezone;
  }
}
