import { IQuestion } from "./question";

export interface IPanel {
  readonly id: string;
  questions: Array<IQuestion>;
}
