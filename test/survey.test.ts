import {
  DropdownQuestion,
  Page,
  QuestionGroup,
  SingleTextQuestion,
  Survey,
  TimePickerQuestion,
  TimeSpanPickerQuestion,
} from "../src";

//survey
//|-page1
//|  |-qg1
//|  |-qg2
//|     |-st1
//|-page2
//   |-st2
//   |-tp

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

test("问卷答案有效性测试", async () => {
  const survey = new Survey();
  const page1 = new Page();
  const page2 = new Page();
  const questionGroup1 = new QuestionGroup();
  const singleTextQuestion1 = new SingleTextQuestion(null, { title: "st1", isRequired: true });
  const singleTextQuestion2 = new SingleTextQuestion(null, { title: "st2", isRequired: true });
  // 创建一个下拉选择问题
  const dropdownQuestion = new DropdownQuestion(null, { title: "dd1", isRequired: true });
  dropdownQuestion.choices.push({ key: "choice1", value: "Choice 1" }, { key: "choice2", value: "Choice 2" });

  // 创建一个时间选择问题
  const timePickerQuestion = new TimePickerQuestion(null, {
    isRequired: true,
    format: "YYYY-MM-DD",
    allowTime: false,
    notAfter: "2024-05-16",
    notBefore: "2024-02-10",
  });

  const timeSpanPickerQuestion1 = new TimeSpanPickerQuestion(null, {
    isRequired: true,
    format: "HH:mm:ss",
    allowDate: false,
    notBefore: "14:00:00",
    notAfter: "17:00:00",
  });

  page1.elements.push(singleTextQuestion1, singleTextQuestion2);
  questionGroup1.questions.push(dropdownQuestion);
  questionGroup1.questions.push(timePickerQuestion);
  page2.elements.push(questionGroup1, timeSpanPickerQuestion1);
  survey.pages.push(page1);
  survey.pages.push(page2);

  // 当所有问题都没有答案时，`answerIsValid`应返回错误信息
  let result = await survey.answerIsValid();
  expect(result).not.toBe(true);

  // 当部分问题有答案时，`answerIsValid`应返回错误信息
  singleTextQuestion1.answer = "test answer 1";
  result = await survey.answerIsValid();
  expect(result).not.toBe(true);

  // 当所有问题都有答案时，`answerIsValid`应返回`true`
  singleTextQuestion2.answer = "test answer 2";
  dropdownQuestion.answer = "choice1";
  timePickerQuestion.answer = "2024-05-07";
  timeSpanPickerQuestion1.answer = ["14:00:00", "14:15:00"];
  result = await survey.answerIsValid();
  expect(result).toBe(true);

  timeSpanPickerQuestion1.answer = ["15:00:00", "14:15:00"];
  result = await survey.answerIsValid();
  expect(result).not.toBe(true);
});
