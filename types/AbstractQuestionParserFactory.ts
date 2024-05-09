import { AbstractQuestion, QuestionType } from "./AbstractQuestion";

export type Parser = (obj: any) => AbstractQuestion;

export abstract class AbstractQuestionParserFactory {
  /**
   * 获取问题解析器
   * @param questionType 问题类型
   */
  abstract getParser(questionType: QuestionType): Parser;

  /**
   * 注册问题解析器
   * @param questionType 问题类型
   * @param parser 解析器
   */
  abstract registerParser(questionType: QuestionType, parser: Parser): void;
}
