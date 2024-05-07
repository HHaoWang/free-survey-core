import { AbstractPage, AbstractQuestion, AbstractQuestionGroup, AbstractSurvey } from "../types";
import { AbstractElement } from "../types/AbstractElement";
import * as console from "console";
import { Page } from "./Page";
import { ValidationError } from "../types/Common";

export class Survey extends AbstractSurvey {
  constructor(title: string | null = null, description: string | null = null, id: string | null = null) {
    super(id);
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

  /**
   * 获取目标题目及其父项
   * @param idOrElement 模板题目ID或元素
   */
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

  /**
   * 获取结构化的问卷答案，此方法不检查答案的合法性
   */
  getAnswer = () => {
    const answer: { [key: string]: any } = {};
    for (const page of this.pages) {
      answer[page.id] = page.getAnswer();
    }
    return answer;
  };

  /**
   * 获取所有问题答案数组，此方法不检查答案的合法性
   */
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

  answerIsValid() {
    const results = [];
    for (const page of this.pages) {
      results.push(page.answerIsValid());
    }
    return Promise.allSettled(results).then((res) => {
      const errors = [];
      for (const result of res) {
        if (result.status === "fulfilled" && result.value !== true) {
          errors.push(...(result.value as ValidationError[]));
        }
      }
      if (errors.length > 0) {
        return errors;
      }
      return true as const;
    });
  }

  exportToJson(): string {
    return JSON.stringify(this);
  }

  importFromJson(jsonContent: string): void {
    try {
      let obj = JSON.parse(jsonContent);
      if (obj["type"] !== "survey") {
        throw Error("解析失败，此Json字符串不包含问卷内容！");
      }
      if (
        !(typeof obj["id"] === "string" && typeof obj["title"] === "string" && typeof obj["description"] === "string")
      ) {
        throw Error("解析失败，此Json字符串没有包含问卷所需内容！");
      }
      this.id = obj["id"];
      this.title = obj["title"];
      this.description = obj["description"];
      this.pages = [];
      if (!Array.isArray(obj["pages"])) {
        return;
      }
      for (const page of obj["pages"]) {
        this.pages.push(Page.Parse(page));
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw Error("解析失败，不是有效的Json格式！", {
          cause: e,
        });
      }
      throw e;
    }
  }
}
