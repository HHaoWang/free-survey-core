import { AbstractQuestion } from "../../types";

export class Splitter extends AbstractQuestion {
  constructor(id: string | null = null, options: { title?: string } = {}) {
    super(
      "splitter",
      {
        isDecoration: true,
        title: "",
        showTitle: false,
        placeholder: "",
        defaultValue: "",
        description: "",
        isShown: true,
        isRequired: false,
        ...options,
      },
      id,
    );
  }
}
