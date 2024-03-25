import { AbstractQuestion, QuestionType } from "./AbstractQuestion";

export type Parser = (obj: any) => AbstractQuestion;

export abstract class AbstractQuestionParserFactory {
  abstract getParser(questionType: QuestionType): Parser;
}
