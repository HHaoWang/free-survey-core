import { Page, QuestionGroup, SingleTextQuestion, Survey, TimePickerQuestion } from "../src";

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
const singleText1 = new SingleTextQuestion(null, { title: "st1" });
const st2 = new SingleTextQuestion(null, { title: "st2" });
const timePickerQuestion1 = new TimePickerQuestion(null, {
  isRequired: true,
  format: "YYYY-MM-DD",
  allowTime: false,
  notAfter: "2024-05-16",
  notBefore: "2024-02-10",
});
qg2.questions.push(singleText1);
page1.elements.push(questionGroup1);
page1.elements.push(qg2);
page2.elements.push(st2);
page2.elements.push(timePickerQuestion1);
survey.pages.push(page1);
survey.pages.push(page2);

test("问卷元素访问", () => {
  expect(survey.pages.length).toBe(2);
  expect(survey.getAllElements().length).toBe(8);
  expect(survey.getAllPages().length).toBe(2);
  expect(survey.getAllQuestions().length).toBe(3);
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

test("问卷答案获取测试", () => {
  singleText1.answer = "test answer 1";
  st2.answer = "test answer 2";
  const answer = survey.getAnswer();
  const flattenedAnswer = survey.getAnswerFlattened();
  expect(flattenedAnswer).toStrictEqual({
    [singleText1.id]: singleText1.answer,
    [st2.id]: st2.answer,
    [timePickerQuestion1.id]: timePickerQuestion1.answer,
  });
  expect(answer).toStrictEqual({
    [page1.id]: {
      [questionGroup1.id]: {},
      [qg2.id]: {
        [singleText1.id]: singleText1.answer,
      },
    },
    [page2.id]: {
      [st2.id]: st2.answer,
      [timePickerQuestion1.id]: timePickerQuestion1.answer,
    },
  });
});

test("问卷元素删除测试", () => {
  let result = survey.deleteElement(singleText1.id);
  expect(result).toBe(true);
  expect(survey.getAllElements().length).toBe(7);
  expect(survey.getAllQuestions().length).toBe(2);

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

test("导出测试", () => {
  const json = survey.exportToJson();
  expect(json).toBe(JSON.stringify(survey));
});

test("导入测试", () => {
  const json = survey.exportToJson();
  const newSurvey = new Survey();
  newSurvey.importFromJson(json);
  expect(survey.exportToJson()).toBe(newSurvey.exportToJson());
});

