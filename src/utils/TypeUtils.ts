import { ElementType, ElementTypes } from "../../types/AbstractElement";
import { QuestionInfo } from "../../types";
import { QuestionInfoDefinition } from "../../types/AbstractQuestion";

export function isElementType(value: unknown): asserts value is ElementType {
  if (typeof value !== "string") {
    throw Error(`Value ${value} Not An Element Type.`);
  }
  if ((ElementTypes as unknown as Array<string>).indexOf(value) < 0) {
    throw Error(`Value ${value} Not An Element Type.`);
  }
}

export function tryGetSpecifiedTypeValue(obj: any, keyName: string, type: string) {
  if (!(keyName in obj)) {
    return undefined;
  }
  if (type === "array") {
    if (!Array.isArray(obj[keyName])) {
      return undefined;
    }
  } else if (type === "any") {
    return obj[keyName];
  } else if (typeof obj[keyName] !== type) {
    return undefined;
  }
  return obj[keyName];
}

export function tryGetQuestionInfoValue(obj: any): Partial<QuestionInfo> {
  const definition: { [key: string]: string } = QuestionInfoDefinition as { [key: string]: string };
  const info: { [key: string]: any } = {};
  for (const prop in definition) {
    const value = tryGetSpecifiedTypeValue(obj, prop, definition[prop]);
    if (value === undefined) {
      continue;
    }
    info[prop] = value;
  }
  return info;
}
