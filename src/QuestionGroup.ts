import { AbstractQuestionGroup } from "../types";
import { IdGenerator } from "../types/AbstractElement";

export class QuestionGroup extends AbstractQuestionGroup {
  constructor(idGenerator: IdGenerator | null = null) {
    super("问题组", "问题组描述", idGenerator);
  }
}
