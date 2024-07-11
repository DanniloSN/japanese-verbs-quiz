import { VerbType } from "@/app/page";

export interface Verb {
  kanji: string;
  reading: string;
  meaning: string;
  answers?: string[];
  answered?: string;
}

export const getVerbList = (verbType: VerbType) => {
  switch (verbType) {
    case "Godan":
      return godanVerbs;
    case "Ichidan":
      return ichidanVerbs;
    case "Irregular":
      return irregularVerbs;
    default:
      return [];
  }
};

const godanVerbs: Verb[] = [
  { kanji: "合う", reading: "あう", meaning: "To meet (with people)" },
  { kanji: "開く", reading: "あく", meaning: "To open" },
  { kanji: "遊ぶ", reading: "あそぶ", meaning: "To play" },
  { kanji: "洗う", reading: "あらう", meaning: "To wash" },
  { kanji: "在る", reading: "ある", meaning: "To exist" },
  { kanji: "有る", reading: "ある", meaning: "To have, to possess" },
  { kanji: "歩く", reading: "ある", meaning: "To walk" },
  { kanji: "言う", reading: "いう", meaning: "To say, to speak" },
  { kanji: "行く", reading: "いく", meaning: "To go" },
  {
    kanji: "要る",
    reading: "いる",
    meaning: "To need, to be necessary",
  },
  { kanji: "歌う", reading: "うたう", meaning: "To sing" },
  { kanji: "売る", reading: "うる", meaning: "To sell" },
  { kanji: "置く", reading: "おく", meaning: "To put, to place" },
  { kanji: "送る", reading: "おくる", meaning: "To send" },
  { kanji: "押す", reading: "おす", meaning: "To push, to press" },
  { kanji: "泳ぐ", reading: "およぐ", meaning: "To swim" },
  { kanji: "終わる", reading: "おわる", meaning: "To finish, to end" },
  { kanji: "買う", reading: "かう", meaning: "To buy" },
  { kanji: "返す", reading: "かえす", meaning: "To return (an object)" },
  { kanji: "帰る", reading: "かえる", meaning: "To return home" },
  { kanji: "掛かる", reading: "かかる", meaning: "To take (time, money)" },
  { kanji: "書く", reading: "かく", meaning: "To write, to draw" },
  { kanji: "貸す", reading: "かす", meaning: "To lend" },
  { kanji: "被る", reading: "かぶる", meaning: "To put on (a hat)" },
  { kanji: "聞く", reading: "きく", meaning: "To listen, to hear" },
];

const ichidanVerbs: Verb[] = [];

const irregularVerbs: Verb[] = [
  { kanji: "来る", reading: "くる", meaning: "To come" },
  { kanji: "する", reading: "する", meaning: "To do" },
];
