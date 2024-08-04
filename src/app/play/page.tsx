"use client";

import Delimiter from "@/components/delimiter";
import Form from "@/components/form";
import Input from "@/components/input";
import { getVerbList, Verb } from "@/database/verbs";
import * as GodanFormatter from "@/formatters/godan";
import * as IchidanFormatter from "@/formatters/ichindan";
import * as IrregularFormatter from "@/formatters/irregular";
import { FormEvent, useEffect, useRef, useState } from "react";
import { VerbFormType, VerbType } from "../page";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

export default function PlayPage() {
  const [verbList, setVerbList] = useState<Verb[]>([]);
  const [actualVerb, setActualVerb] = useState<Verb>({} as Verb);
  const [verbForm, setVerbForm] = useState<VerbFormType>();
  const answered = useRef<Verb[]>([]);
  const router = useRouter();

  useEffect(() => {
    const verbFormLS = localStorage.getItem("verbForm") as VerbFormType;
    const verbTypeLS = localStorage.getItem("verbType") as VerbType;
    let verbListAux = [...getVerbList(verbTypeLS)];
    verbListAux = verbListAux.map((verb) => {
      switch (verb.type) {
        case "Godan":
          verb.formatter = GodanFormatter.getFormatter(verbFormLS);
          break;
        case "Ichidan":
          verb.formatter = IchidanFormatter.getFormatter(verbFormLS);
          break;
        case "Irregular":
          verb.formatter = IrregularFormatter.getFormatter(verbFormLS);
          break;
      }
      if (verb.formatter) {
        verb.answers = [
          verb.formatter(verb.reading),
          verb.formatter(verb.kanji),
        ];
      }
      return verb;
    });
    setVerbList(verbListAux);
    setVerbForm(verbFormLS);
    generateNewRandomVerb(verbListAux);
  }, []);

  const generateNewRandomVerb = (verbList: Verb[] = []) => {
    const index = Math.floor(Math.random() * verbList.length);
    const newVerb: Verb = { ...verbList[index] };
    verbList.splice(index, 1);
    setActualVerb(newVerb);
    setVerbList(verbList);
  };

  const onSubmit = (
    { response }: { response: string },
    event: FormEvent<HTMLFormElement> | undefined
  ) => {
    answered.current = [
      ...answered.current,
      { ...actualVerb, answered: response },
    ];
    event?.currentTarget.reset();
    if (!verbList.length) {
      localStorage.setItem("lastResults", JSON.stringify(answered.current));
      router.replace("/last-results");
      return;
    }
    generateNewRandomVerb(verbList);
  };

  return (
    <main>
      <Delimiter className="p-3">
        <h1 className="text-center">Verbs Conjulgation Quiz</h1>
        <br />
        <p>
          Write the <b>{verbForm}</b> Form of <b>{actualVerb?.type}</b>{" "}
          {actualVerb?.kanji} ({actualVerb?.reading}) -{actualVerb?.meaning}
        </p>
        <p>
          {verbList.length + 1} verb{verbList.length > 1 ? "s" : ""} remaining
        </p>
        <br />
        <Form onSubmit={onSubmit}>
          <Input
            className="p-1 py-14 text-2xl text-center"
            name="response"
            required
          />
        </Form>
      </Delimiter>
      <Delimiter fixed>
        <Button onClick={() => router.back()}>Back</Button>
      </Delimiter>
    </main>
  );
}
