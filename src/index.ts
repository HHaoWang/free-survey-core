import { IPage } from "../types/page";
import { IQuestion } from "../types/question";
import { ISurvey } from "../types/survey";

class Survey implements ISurvey {
  currentPage: IPage;
  moveToNextPage: () => void;
  moveToPrePage: () => void;
  isValidForm: () => string | true;
  getQuestionByName: (questionName: string) => IQuestion | null;
  answer: object;
  id: string;
  pages: Array<IPage>;
  public title: string;
  public description: string;
}
