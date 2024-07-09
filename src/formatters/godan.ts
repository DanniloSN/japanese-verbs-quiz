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

const verbsFinals: { [key: string]: string[] } = {
  う: ["あ", "い", "う", "え", "お"],
  く: ["か", "き", "く", "け", "こ"],
  ぐ: ["が", "ぎ", "ぐ", "げ", "ご"],
  ぶ: ["ば", "び", "ぶ", "べ", "ぼ"],
  る: ["ら", "り", "る", "れ", "ろ"],
  す: ["さ", "し", "す", "せ", "そ"],
};

const formatPolite = (verb: string) => {
  const lastKana = verb.slice(-1);
  const iForm = verbsFinals[lastKana][1];
  verb = verb.slice(0, -1);
  return `${verb}${iForm}ます`;
};

const formatNegative = (verb: string) => {
  const lastKana = verb.slice(-1);
  const naiForm = verbsFinals[lastKana][0];
  verb = verb.slice(0, -1);
  return `${verb}${naiForm}ない`;
};

const formatNegativePolite = (verb: string) => {
  const lastKana = verb.slice(-1);
  const masenForm = verbsFinals[lastKana][1];
  verb = verb.slice(0, -1);
  return `${verb}${masenForm}ません`;
};

const formatImperative = (verb: string) => {
  const lastKana = verb.slice(-1);
  const imperativeForm = verbsFinals[lastKana][3];
  verb = verb.slice(0, -1);
  return `${verb}${imperativeForm}`;
};

const formatConditional = (verb: string) => {
  const lastKana = verb.slice(-1);
  const conditionalForm = verbsFinals[lastKana][3];
  verb = verb.slice(0, -1);
  return `${verb}${conditionalForm}ば`;
};

const formatTe = (verb: string) => {
  if (["行く", "いく"].includes(verb)) {
    return "いって";
  }
  const lastKana = verb.slice(-1);
  let final = "";
  switch (lastKana) {
    case "る":
    case "つ":
    case "う":
      final = "って";
      break;
    case "す":
      final = "して";
      break;
    case "く":
      final = "いて";
      break;
    case "ぐ":
      final = "いで";
      break;
    case "ぬ":
    case "ぶ":
    case "む":
      final = "んで";
      break;
  }
  verb = verb.slice(0, -1);
  return `${verb}${final}`;
};
