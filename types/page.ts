import { IPanel } from "./panel";

export interface IPage {
  readonly id: string;
  panels: Array<IPanel>;
}
