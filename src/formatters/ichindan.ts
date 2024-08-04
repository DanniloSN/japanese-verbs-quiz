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

const formatPolite = (verb: string) => {
  return verb;
};

const formatNegative = (verb: string) => {
  return verb;
};

const formatNegativePolite = (verb: string) => {
  return verb;
};

const formatImperative = (verb: string) => {
  return verb;
};

const formatConditional = (verb: string) => {
  return verb;
};

const formatTe = (verb: string) => {
  return verb;
};
