import { Page } from "./page";

export interface Survey {
  title: string;
  description: string;
  pages: Array<Page>;
}
