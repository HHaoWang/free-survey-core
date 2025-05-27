import { isElementType, tryGetSpecifiedTypeValue, tryGetQuestionInfoValue } from "../../src/utils/TypeUtils";

describe("TypeUtils", () => {
  describe("isElementType", () => {
    it("should throw an error for non-string values", () => {
      expect(() => isElementType(123)).toThrow("Value 123 Not An Element Type.");
      expect(() => isElementType({})).toThrow("Value [object Object] Not An Element Type.");
    });

    it("should throw an error for invalid element types", () => {
      expect(() => isElementType("invalidType")).toThrow("Value invalidType Not An Element Type.");
    });

    it("should not throw an error for valid element types", () => {
      expect(() => isElementType("survey")).not.toThrow();
      expect(() => isElementType("page")).not.toThrow();
      expect(() => isElementType("question")).not.toThrow();
      expect(() => isElementType("questionGroup")).not.toThrow();
    });
  });
});

describe("tryGetSpecifiedTypeValue", () => {
  it("should return undefined for non-existing keys", () => {
    const obj = { a: 1, b: "test" };
    expect(tryGetSpecifiedTypeValue(obj, "c", "string")).toBeUndefined();
  });

  it("should return the value for existing keys with correct type", () => {
    const obj = { a: 1, b: "test" };
    expect(tryGetSpecifiedTypeValue(obj, "a", "number")).toBe(1);
    expect(tryGetSpecifiedTypeValue(obj, "b", "string")).toBe("test");
  });

  it("should return undefined for existing keys with incorrect type", () => {
    const obj = { a: 1, b: "test" };
    expect(tryGetSpecifiedTypeValue(obj, "a", "string")).toBeUndefined();
    expect(tryGetSpecifiedTypeValue(obj, "b", "number")).toBeUndefined();
  });

  it("should handle array type correctly", () => {
    const obj = { arr: [1, 2, 3] };
    expect(tryGetSpecifiedTypeValue(obj, "arr", "array")).toEqual([1, 2, 3]);
    expect(tryGetSpecifiedTypeValue(obj, "arr", "string")).toBeUndefined();
  });

  it("should return undefined for non-array when expecting array", () => {
    const obj = { notArray: "test" };
    expect(tryGetSpecifiedTypeValue(obj, "notArray", "array")).toBeUndefined();
  });

  it("should handle any type correctly", () => {
    const obj = { anyValue: { key: "value" } };
    expect(tryGetSpecifiedTypeValue(obj, "anyValue", "any")).toEqual({ key: "value" });
  });
});

describe("tryGetQuestionInfoValue", () => {
  it("should return an empty object for an empty input", () => {
    expect(tryGetQuestionInfoValue({})).toEqual({});
  });

  it("should extract valid question info properties", () => {
    const obj = { title: "What is your name?", isRequired: true, choices: ["Option 1", "Option 2"] };
    const result = tryGetQuestionInfoValue(obj);
    expect(result).toEqual({
      title: "What is your name?",
      isRequired: true,
    });
  });

  it("should ignore invalid properties", () => {
    const obj = { questionText: "What is your age?", invalidProp: "invalid" };
    const result = tryGetQuestionInfoValue(obj);
    expect(result).toEqual({});
  });
});
