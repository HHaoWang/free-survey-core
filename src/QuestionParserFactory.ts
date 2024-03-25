import { AbstractQuestionParserFactory, Parser } from "../types/AbstractQuestionParserFactory";
import { QuestionType } from "../types";
import { SingleTextQuestion } from "./questions/SingleTextQuestion";
import { tryGetQuestionInfoValue } from "./utils/TypeUtils";

export class QuestionParserFactory extends AbstractQuestionParserFactory {
  questionTypeParserMap: Map<QuestionType, Parser> = new Map([["singleText", this.singleTextQuestionParser]]);

  getParser(questionType: QuestionType): Parser {
    if (!this.questionTypeParserMap.has(questionType)) {
      throw Error(`没有${questionType}类型对应的解析器！`);
    }
    return this.questionTypeParserMap.get(questionType)!;
  }

  singleTextQuestionParser(obj: any): SingleTextQuestion {
    if (typeof obj["id"] !== "string") {
      throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
    }
    return new SingleTextQuestion(obj["id"], tryGetQuestionInfoValue(obj));
  }
}
