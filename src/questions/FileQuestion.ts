import { AbstractQuestion, KeyValuePair, QuestionInfo, ValidationError } from "../../types";

export class FileQuestion extends AbstractQuestion {
  acceptFileTypes: string[] = [];
  maxFileSize: number = 5120; // in KiB
  maxFileCount: number = 1; // 最多上传多少个文件

  /**
   * 文件链接列表
   *
   * 这里是最终用户上传的文件链接，如果是多文件上传，则为多个链接
   *
   * 校验时仅校验链接数量，不对链接内容校验
   */
  declare answer: string[];

  constructor(
    id: string | null = null,
    options: Partial<
      QuestionInfo & {
        maxFileSize: number; // in KiB
        acceptFileTypes: string[]; // 后缀名，带点
        maxFileCount: number; // 最多上传多少个文件
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
      allowMultipleAnswers: false,
      answer: "",
      ...options,
    };
    super("file", option, id);
  }

  answerIsValid(): Promise<true | Array<ValidationError>> {
    if (this.isRequired && (!this.answer || !Array.isArray(this.answer) || this.answer.length === 0)) {
      return Promise.resolve([
        {
          elementId: this.id,
          msg: "此问题必填！",
          validatedData: this.answer,
        },
      ]);
    }

    return Promise.resolve(true);
  }

  static parse(obj: any): AbstractQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new FileQuestion(obj["id"], obj);
  }
}
