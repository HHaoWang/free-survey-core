import { AbstractQuestionParserFactory, Parser } from "../types/AbstractQuestionParserFactory";
import { QuestionType } from "../types";
import { SingleTextQuestion } from "./questions/SingleTextQuestion";
import { RadioGroupQuestion } from "./questions/RadioGroupQuestion";
import { CheckBoxQuestion } from "./questions/CheckBoxQuestion";
import { DropdownQuestion } from "./questions/DropdownQuestion";
import { TimePickerQuestion } from "./questions/TimePickerQuestion";
import { TimeSpanPickerQuestion } from "./questions/TimeSpanPickerQuestion";
import { Splitter } from "./decoration-question/Splitter";

export class QuestionParserFactory extends AbstractQuestionParserFactory {
  private static questionTypeParserMap: Map<QuestionType, Parser> = new Map();

  getParser(questionType: QuestionType): Parser {
    if (!QuestionParserFactory.questionTypeParserMap.has(questionType)) {
      throw Error(`没有${questionType}类型对应的解析器！`);
    }
    return QuestionParserFactory.questionTypeParserMap.get(questionType)!;
  }

  registerParser(questionType: QuestionType, parser: Parser): void {
    QuestionParserFactory.questionTypeParserMap.set(questionType, parser);
  }

  static {
    QuestionParserFactory.questionTypeParserMap.set("singleText", SingleTextQuestion.parse);
    QuestionParserFactory.questionTypeParserMap.set("radioGroup", RadioGroupQuestion.parse);
    QuestionParserFactory.questionTypeParserMap.set("checkbox", CheckBoxQuestion.parse);
    QuestionParserFactory.questionTypeParserMap.set("dropdown", DropdownQuestion.parse);
    QuestionParserFactory.questionTypeParserMap.set("timePicker", TimePickerQuestion.parse);
    QuestionParserFactory.questionTypeParserMap.set("timeSpanPicker", TimeSpanPickerQuestion.parse);

    QuestionParserFactory.questionTypeParserMap.set("splitter", Splitter.parse);
  }
}
