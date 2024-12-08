import { AbstractPageElement } from "./AbstractPageElement";
import { FromMap } from "./Common";

export const QuestionInfoDefinition = {
  title: "string",
  showTitle: "boolean",
  placeholder: "string",
  defaultValue: "any",
  description: "string",
  isShown: "boolean",
  isRequired: "boolean",
  isDecoration: "boolean",
  answer: "any",
} as const;

export type QuestionInfo = FromMap<typeof QuestionInfoDefinition>;

export const DecoratedQuestionTypes = ["splitter"] as const;
export type DecoratedQuestionType = (typeof DecoratedQuestionTypes)[number];

export const QuestionTypes = [
  "singleText",
  "dropdown",
  "radioGroup",
  "checkbox",
  "file",
  "timePicker",
  "timeSpanPicker",
  ...DecoratedQuestionTypes,
] as const;
export type QuestionType = (typeof QuestionTypes)[number];

export abstract class AbstractQuestion extends AbstractPageElement implements QuestionInfo {
  /**
   * 问题类型
   */
  questionType: QuestionType;

  defaultValue: string;
  description: string;
  isRequired: boolean;
  isShown: boolean;
  placeholder: string;
  showTitle: boolean;
  title: string;
  isDecoration: boolean;

  answer: any;

  /**
   * 构造函数
   * @param questionType 问题类型
   * @param options 问题信息
   * @param id 问题ID
   * @protected
   */
  protected constructor(questionType: QuestionType, options: QuestionInfo, id: string | null = null) {
    super("question", id);

    this.questionType = questionType;

    this.title = options.title;
    this.showTitle = options.showTitle;
    this.placeholder = options.placeholder;
    this.defaultValue = options.defaultValue;
    this.description = options.description;
    this.isShown = options.isShown;
    this.isRequired = options.isRequired;
    this.isDecoration = options.isDecoration;

    this.answer = this.defaultValue;
  }

  /**
   * 获取所给答案值在该问题下的字面形式<br>
   * e.g radioGroup 0->是 1->否<br>
   * 当具体的问题类型没有实现这一方法时，会按原样返回参数值
   * @param answerValue 需要获取对应字面形式的答案值
   */
  public getAnswerTextFromValue(answerValue: unknown): string | string[] {
    return answerValue as string;
  }
}
