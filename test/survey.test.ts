import { Page, QuestionGroup, SingleTextQuestion, Survey } from "../src";

//survey
//|-page1
//|  |-qg1
//|  |-qg2
//|     |-st1
//|-page2
//   |-st2

const survey = new Survey();
const page1 = new Page();
const page2 = new Page();
const questionGroup1 = new QuestionGroup();
const qg2 = new QuestionGroup();
const singleText1 = new SingleTextQuestion({ title: "st1" });
const st2 = new SingleTextQuestion({ title: "st2" });
qg2.questions.push(singleText1);
page1.elements.push(questionGroup1);
page1.elements.push(qg2);
page2.elements.push(st2);
survey.pages.push(page1);
survey.pages.push(page2);

test("问卷元素访问", () => {
  expect(survey.pages.length).toBe(2);
  expect(survey.getAllElements().length).toBe(7);
  expect(survey.getAllPages().length).toBe(2);
  expect(survey.getAllQuestions().length).toBe(2);
  expect(survey.getAllQuestionGroups().length).toBe(2);
});

test("问卷元素查找", () => {
  expect(survey.getElement("123")).toBeNull();
  expect(survey.getElement(st2.id)).toBe(st2);
  expect(survey.getElementWithExtraInfos(st2.id)).toEqual({
    target: st2,
    parent: page2,
  });
  expect(survey.getElementWithExtraInfos("123")).toBeNull();
  expect(survey.getElementWithExtraInfos(survey.id)).toEqual({
    target: survey,
    parent: null,
  });
  expect(survey.getElementWithExtraInfos(page2.id)).toEqual({
    target: page2,
    parent: survey,
  });
  expect(survey.getElementWithExtraInfos(questionGroup1.id)).toEqual({
    target: questionGroup1,
    parent: page1,
  });
  expect(survey.getElementWithExtraInfos(singleText1.id)).toEqual({
    target: singleText1,
    parent: qg2,
  });
});

test("问卷元素删除测试", () => {
  let result = survey.deleteElement(singleText1.id);
  expect(result).toBe(true);
  expect(survey.getAllElements().length).toBe(6);
  expect(survey.getAllQuestions().length).toBe(1);

  result = survey.deleteElement("123");
  expect(result).toBe(true);

  result = survey.deleteElement(survey);
  expect(result).toBe(false);

  result = survey.deleteElement(qg2);
  expect(result).toBe(true);
  expect(survey.getAllQuestionGroups().length).toBe(1);
  expect(survey.pages[0].elements.length).toBe(1);

  result = survey.deleteElement(page2);
  expect(result).toBe(true);
  expect(survey.pages.length).toBe(1);
});
