import { IPage } from "./page";
import { IQuestion } from "./question";

export interface ISurvey {
  readonly id: string;
  title: string;
  description: string;
  pages: Array<IPage>;
  currentPage: IPage;
  moveToNextPage: () => void;
  moveToPrePage: () => void;
  isValidForm: () => true | string;
  getQuestionByName: (questionName: string) => IQuestion | null;
  answer: object;
}
