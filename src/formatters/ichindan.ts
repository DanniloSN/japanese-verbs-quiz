import { VerbFormType } from "@/app/page";

export const getFormatter = (formatMethod: VerbFormType) => {
  switch (formatMethod) {
    case "Polite":
      return formatPolite;
    case "Negative":
      return formatNegative;
    case "Negative_Polite":
      return formatNegativePolite;
    case "Imperative":
      return formatImperative;
    case "Conditional":
      return formatConditional;
    case "Te":
      return formatTe;
  }
};

const formatPolite = (verb: string) => {};

const formatNegative = (verb: string) => {};

const formatNegativePolite = (verb: string) => {};

const formatImperative = (verb: string) => {};

const formatConditional = (verb: string) => {};

const formatTe = (verb: string) => {};
