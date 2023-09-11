import { AbstractPageElement } from "./AbstractPageElement";
import { IdGenerator } from "./AbstractElement";

export interface QuestionInfo {
  title: string;
  showTitle: boolean;
  placeholder: string;
  defaultValue: any;
  description: string;
  isShown: boolean;
  isRequired: boolean;
  isDecoration: boolean;
}

export type QuestionType = "singleText" | "dropdown" | "radioGroup" | "checkbox" | "file" | "splitter" | "time";

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

  protected constructor(questionType: QuestionType, options: QuestionInfo, idGenerator: IdGenerator | null = null) {
    super("question", idGenerator);

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
}
