import { AbstractSurvey } from "../types";
import { IdGenerator } from "../types/AbstractElement";

export class Survey extends AbstractSurvey {
  moveToNextPage = () => {};
  moveToPrePage = () => {};

  isValidForm = () => {
    return "";
  };

  constructor(title: string | null = null, description: string | null = null, idGenerator: IdGenerator | null = null) {
    super("survey", idGenerator);
    this.title = title ? title : "问卷标题";
    this.description = description ? description : "感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！";
  }
}
