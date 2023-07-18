export interface IQuestion {
  /**
   * 自动生成的唯一标识
   */
  readonly id: string;

  /**
   * 此问题在问卷所有问题中的排序号
   */
  globalSerialNumber: number;

  /**
   * 此问题在页面所有问题中的排序号
   */
  pageSerialNumber: number;

  /**
   * 此问题在面板所有问题中的排序号
   */
  panelSerialNumber: number;

  /**
   * 结合了页面号和面板号码的路径标识，例如：3.1.2
   */
  fullPathId: string;

  /**
   * 问题类型
   */
  type: QuestionType;
  title: string;
  description: string;
  placeholder: string;
  defaultValue: string | number;
  showTitle: boolean;
  isRequired: boolean;
  isShown: boolean;
}

export type QuestionType = "singleText" | "dropdown" | "radioGroup" | "checkbox" | "file" | "spliter";
