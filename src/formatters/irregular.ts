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
  if (["来る", "くる"].includes(verb)) {
    return "きます";
  } else {
    return "します";
  }
};

const formatNegative = (verb: string) => {
  if (["来る", "くる"].includes(verb)) {
    return "こない";
  } else {
    return "しない";
  }
};

const formatNegativePolite = (verb: string) => {
  if (["来る", "くる"].includes(verb)) {
    return "きません";
  } else {
    return "しません";
  }
};

const formatImperative = (verb: string) => {
  if (["来る", "くる"].includes(verb)) {
    return "こい";
  } else {
    return "しろ";
  }
};

const formatConditional = (verb: string) => {
  if (["来る", "くる"].includes(verb)) {
    return "くれば";
  } else {
    return "すれば";
  }
};

const formatTe = (verb: string) => {
  if (["来る", "くる"].includes(verb)) {
    return "きて";
  } else {
    return "して";
  }
};
