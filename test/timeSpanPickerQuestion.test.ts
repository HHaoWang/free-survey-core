import { TimeSpanPickerQuestion } from "../src";

test("时间段选择问题-日期时间选择测试", async () => {
  const timeSpanPickerQuestion1 = new TimeSpanPickerQuestion(null, {
    isRequired: true,
    format: "YYYY-MM-DD HH:mm:ss",
    notBefore: "2024-02-17T14:00:00Z",
    notAfter: "2024-05-16T17:00:00Z",
  });

  timeSpanPickerQuestion1.answer = ["test answer 1", "test answer 2"];
  let result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  // @ts-ignore
  timeSpanPickerQuestion1.answer = ["2024-02-17T13:59:59Z"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  // @ts-ignore
  timeSpanPickerQuestion1.answer = "2024-02-17T13:59:59Z";
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timeSpanPickerQuestion1.answer = ["2024-02-17T13:59:59Z", "2024-02-18T14:00:00Z"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timeSpanPickerQuestion1.answer = ["2024-02-17T14:00:00Z", "2024-05-16T17:00:00Z"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timeSpanPickerQuestion1.answer = ["2024-02-17T14:00:00Z", "2024-05-16T17:00:01Z"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  // Testing date and time in UTC-8 timezone
  timeSpanPickerQuestion1.answer = ["2024-02-17T06:00:00-08:00", "2024-05-16T09:00:00-08:00"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  // Testing date and time in UTC+8 timezone
  timeSpanPickerQuestion1.answer = ["2024-02-17T22:00:00+08:00", "2024-05-17T01:00:00+08:00"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  // Testing date and time in UTC-8 timezone, but earlier than notBefore
  timeSpanPickerQuestion1.answer = ["2024-02-17T05:59:59-08:00", "2024-05-16T09:00:00-08:00"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  // Testing date and time in UTC+8 timezone, but later than notAfter
  timeSpanPickerQuestion1.answer = ["2024-02-17T22:00:00+08:00", "2024-05-17T01:00:01+08:00"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);
});

test("时间段选择问题-日期选择测试", async () => {
  const timeSpanPickerQuestion1 = new TimeSpanPickerQuestion(null, {
    isRequired: true,
    format: "YYYY-MM-DD",
    allowTime: false,
    notBefore: "2024-02-17",
    notAfter: "2024-05-16",
  });

  timeSpanPickerQuestion1.answer = ["test answer 1", "test answer 2"];
  let result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timeSpanPickerQuestion1.answer = ["2024-02-16", "2024-02-17"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timeSpanPickerQuestion1.answer = ["2024-02-17", "2024-05-16"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timeSpanPickerQuestion1.answer = ["2024-02-17", "2024-05-17"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);
});

test("时间段选择问题-时间选择测试", async () => {
  const timeSpanPickerQuestion1 = new TimeSpanPickerQuestion(null, {
    isRequired: true,
    format: "HH:mm:ss",
    allowDate: false,
    notBefore: "14:00:00",
    notAfter: "17:00:00",
  });

  timeSpanPickerQuestion1.answer = ["test answer 1", "test answer 2"];
  let result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timeSpanPickerQuestion1.answer = ["13:59:59", "14:00:00"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timeSpanPickerQuestion1.answer = ["14:00:00", "17:00:00"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timeSpanPickerQuestion1.answer = ["14:00:00", "17:00:01"];
  result = await timeSpanPickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);
});
