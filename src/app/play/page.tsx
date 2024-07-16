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
  const formatMethod = useRef<Function>(() => {});
  const answered = useRef<Verb[]>([]);
  const router = useRouter();

  const [verbType, setVerbType] = useState<VerbType>();
  const [verbForm, setVerbForm] = useState<VerbFormType>();

  useEffect(() => {
    const verbTypeLS = localStorage.getItem("verbType") as VerbType;
    const verbFormLS = localStorage.getItem("verbForm") as VerbFormType;
    const verbListAux = [...getVerbList(verbTypeLS)];
    setVerbList(verbListAux);
    setVerbType(verbTypeLS);
    setVerbForm(verbFormLS);
    switch (verbTypeLS) {
      case "Godan":
        formatMethod.current = GodanFormatter.getFormatter(verbFormLS);
        break;
      case "Ichidan":
        formatMethod.current = IchidanFormatter.getFormatter(verbFormLS);
        break;
      case "Irregular":
        formatMethod.current = IrregularFormatter.getFormatter(verbFormLS);
        break;
    }
    generateNewRandomVerb(verbListAux);
  }, []);

  const generateNewRandomVerb = (verbList: Verb[] = []) => {
    const index = Math.floor(Math.random() * verbList.length);
    const newVerb: Verb = { ...verbList[index] };
    newVerb.answers = [
      formatMethod.current(newVerb.reading),
      formatMethod.current(newVerb.kanji),
    ];
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
          Write the <b>{verbForm}</b> Form of {actualVerb?.kanji} (
          {actualVerb?.reading}) -{actualVerb?.meaning}
        </p>
        <p>
          {verbList.length + 1} {verbType} verb{verbList.length > 1 ? "s" : ""}{" "}
          remaining
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
