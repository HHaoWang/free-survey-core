import { TimePickerQuestion } from "../src";

test("时间选择问题-日期选择测试", async () => {
  const timePickerQuestion1 = new TimePickerQuestion(null, {
    isRequired: true,
    format: "YYYY-MM-DD",
    allowTime: false,
    notBefore: "2024-02-10",
    notAfter: "2024-05-16",
  });

  timePickerQuestion1.answer = "test answer 1";
  let result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2024-02-06";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2024-02-09T16:00:00+00:00";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2024-02-09T16:00:00Z";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2024-05-16";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timePickerQuestion1.answer = "2024-05-17";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2024-02-29";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timePickerQuestion1.answer = "2024-02-30";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2023-02-29";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);
});

test("时间选择问题-时间选择测试", async () => {
  const timePickerQuestion1 = new TimePickerQuestion(null, {
    isRequired: true,
    format: "HH:mm:ss",
    allowDate: false,
    notBefore: "14:00:00",
    notAfter: "17:00:00",
  });

  timePickerQuestion1.answer = "test answer 1";
  let result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "14:00:00:00";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "14:00:00";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timePickerQuestion1.answer = "17:00:00";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timePickerQuestion1.answer = "17:00:01";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);
});

test("时间选择问题-日期时间选择测试",async () => {
  const timePickerQuestion1 = new TimePickerQuestion(null, {
    isRequired: true,
    format: "YYYY-MM-DD HH:mm:ss",
    notBefore: "2024-02-17T14:00:00Z",
    notAfter: "2024-05-16T17:00:00Z",
  });

  timePickerQuestion1.answer = "test answer 1";
  let result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "13:59:59";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2024-02-17";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2024-02-17T13:59:59Z";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  timePickerQuestion1.answer = "2024-02-17T14:00:00Z";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timePickerQuestion1.answer = "2024-05-16T17:00:00Z";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  timePickerQuestion1.answer = "2024-05-16T17:00:01Z";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  // 测试在UTC-8时区的日期时间
  timePickerQuestion1.answer = "2024-02-17T06:00:00-08:00";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  // 测试在UTC+8时区的日期时间
  timePickerQuestion1.answer = "2024-02-17T22:00:00+08:00";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).toBe(true);

  // 测试在UTC-8时区的日期时间，但是早于notBefore
  timePickerQuestion1.answer = "2024-02-17T05:59:59-08:00";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);

  // 测试在UTC+8时区的日期时间，但是晚于notAfter
  timePickerQuestion1.answer = "2024-05-17T01:00:01+08:00";
  result = await timePickerQuestion1.answerIsValid();
  expect(result).not.toBe(true);
})