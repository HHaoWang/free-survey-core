import { AbstractQuestion } from "../../types";

export class Splitter extends AbstractQuestion {
  constructor(options: { title?: string } = {}) {
    super("splitter", {
      isDecoration: true,
      title: "",
      showTitle: false,
      placeholder: "",
      defaultValue: "",
      description: "",
      isShown: true,
      isRequired: false,
      ...options,
    });
  }
}
