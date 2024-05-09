/**
 * 表示一个键值对
 */
export interface KeyValuePair {
  key: string;
  value: string;
}

export type TypeNameMap = {
  string: string;
  boolean: boolean;
  number: number;
  null: null;
  bigint: bigint;
  undefined: undefined;
  object: object;
  any: any;
};

export type FromMap<T> = {
  [P in keyof T]: TypeNameMap[T[P] extends keyof TypeNameMap ? T[P] : never];
};

export type Type<TypeName> = TypeName extends "string"
  ? string
  : TypeName extends "number"
    ? number
    : TypeName extends "boolean"
      ? boolean
      : TypeName extends "object"
        ? object
        : TypeName extends "bigint"
          ? bigint
          : TypeName extends "null"
            ? null
            : TypeName extends "undefined"
              ? undefined
              : any;

/**
 * 表示答案不符合校验规则导致验证不通过的相关信息
 */
export type ValidationError = {
  /**
   * 验证不通过的提示信息
   */
  msg: string;
  /**
   * 验证不通过发生的组件id
   */
  elementId: string;
  /**
   * 验证不通过的数据
   */
  validatedData: any;
};
