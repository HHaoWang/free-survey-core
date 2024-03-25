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
