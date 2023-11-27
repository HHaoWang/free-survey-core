import { AbstractPage, AbstractQuestion, AbstractQuestionGroup, AbstractSurvey } from "../types";
import { AbstractElement, IdGenerator } from "../types/AbstractElement";

export class Survey extends AbstractSurvey {
  moveToNextPage = () => {
    if (this.pages.length === 0) {
      return;
    }
  };
  moveToPrePage = () => {
    if (this.pages.length === 0) {
      return;
    }
  };

  isValidForm = () => {
    return "";
  };

  constructor(title: string | null = null, description: string | null = null, idGenerator: IdGenerator | null = null) {
    super("survey", idGenerator);
    this.title = title ? title : "问卷标题";
    this.description = description ? description : "感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！";
  }

  getAllPages = () => {
    return this.pages;
  };

  getAllQuestionGroups = (): Array<AbstractQuestionGroup> => {
    return <Array<AbstractQuestionGroup>>(
      this.pages.flatMap((page) => page.elements.filter((element) => element.type === "questionGroup"))
    );
  };

  getAllQuestions = (): Array<AbstractQuestion> =>
    <Array<AbstractQuestion>>(
      this.pages.flatMap((page) =>
        page.elements.flatMap((element) =>
          element.type === "question" ? element : (element as AbstractQuestionGroup).questions,
        ),
      )
    );

  /**
   * 获取问卷中全部组件，采用前序遍历
   */
  getAllElements = (): Array<AbstractElement> => {
    const elements: Array<AbstractElement> = [];
    elements.push(this);
    for (const page of this.pages) {
      elements.push(page);
      for (const element of page.elements) {
        elements.push(element);
        if (element.type === "question") {
          continue;
        }
        for (const question of (element as AbstractQuestionGroup).questions) {
          elements.push(question);
        }
      }
    }
    return elements;
  };

  getElement = (id: string): AbstractElement | null =>
    this.getAllElements().find((element) => element.id === id) ?? null;

  getElementWithExtraInfos = (
    idOrElement: string | AbstractElement,
  ): {
    target: AbstractElement;
    parent: AbstractElement | null;
  } | null => {
    const allElements = this.getAllElements();
    const targetElementIndex = allElements.findIndex(
      (element) => element === idOrElement || element.id === idOrElement,
    );
    if (targetElementIndex < 0) {
      return null;
    }
    const targetElement = allElements[targetElementIndex];
    if (targetElement.type === "survey") {
      return {
        target: targetElement,
        parent: null,
      };
    }
    if (targetElement.type === "page") {
      return {
        target: targetElement,
        parent: this,
      };
    }
    const targetElementPage = allElements
      .slice(0, targetElementIndex)
      .filter((element) => element.type === "page")
      .slice(-1)[0];
    if (targetElement.type === "questionGroup") {
      // 前序遍历情况下题组所在的页面为题组元素之前的最后一个页面
      return {
        target: targetElement,
        parent: targetElementPage,
      };
    }
    // 问题直接包含在页面中
    if ((targetElementPage as AbstractPage).elements.findIndex((element) => element.id === targetElement.id) >= 0) {
      return {
        target: targetElement,
        parent: targetElementPage,
      };
    }
    // 问题包含在题组中时
    for (const questionGroup of <Array<AbstractQuestionGroup>>(
      (targetElementPage as AbstractPage).elements.filter((element) => element.type === "questionGroup")
    )) {
      if (questionGroup.questions.findIndex((question) => question.id === targetElement.id) >= 0) {
        return {
          target: targetElement,
          parent: questionGroup,
        };
      }
    }
    throw Error("找不到该元素！所查元素信息:" + idOrElement);
  };

  deleteElement = (idOrElement: string | AbstractElement): boolean => {
    const targetElementInfo = this.getElementWithExtraInfos(idOrElement);
    if (targetElementInfo === null) {
      return true;
    }

    if (targetElementInfo.target.type === "survey" || targetElementInfo.parent === null) {
      console.warn("问卷元素不可删除！");
      return false;
    }

    let list: Array<AbstractElement> = [];
    switch (targetElementInfo.parent.type) {
      case "survey":
        list = (targetElementInfo.parent as AbstractSurvey).pages;
        break;
      case "page":
        list = (targetElementInfo.parent as AbstractPage).elements;
        break;
      case "questionGroup":
        list = (targetElementInfo.parent as AbstractQuestionGroup).questions;
        break;
    }

    const index = list.findIndex((element) => element.id === targetElementInfo.target.id);
    if (index < 0) {
      return true;
    }
    list.splice(index, 1);
    return true;
  };

  getAnswer = () => {
    const answer: { [key: string]: any } = {};
    for (const page of this.pages) {
      answer[page.id] = page.getAnswer();
    }
    return answer;
  };

  getAnswerFlattened = () => {
    let answer: { [key: string]: any } = {};
    for (const page of this.pages) {
      answer = {
        ...answer,
        ...page.getAnswerFlattened(),
      };
    }
    return answer;
  };
}
