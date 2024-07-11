"use client";

import Delimiter from "@/components/delimiter";
import Form from "@/components/form";
import Input from "@/components/input";
import { getVerbList, Verb } from "@/database/verbs";
import * as GodanFormatter from "@/formatters/godan";
import * as IchidanFormatter from "@/formatters/ichindan";
import * as IrregularFormatter from "@/formatters/irregular";
import { FormEvent, useEffect, useState } from "react";
import { VerbFormType, VerbType } from "../page";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

export default function PlayPage() {
  const [verbList, setVerbList] = useState<Verb[]>([]);
  const [formatMethod, setFormatMethod] = useState<Function>((_: string) => {});
  const [actualVerb, setActualVerb] = useState<Verb>({} as Verb);
  const [answered, setAnswered] = useState<Verb[]>([]);
  const router = useRouter();

  const verbType = localStorage.getItem("verbType") as VerbType;
  const verbForm = localStorage.getItem("verbForm") as VerbFormType;

  useEffect(() => {
    if (!verbType || !verbForm) {
      return;
    }
    setVerbList([...getVerbList(verbType)]);
    switch (verbType) {
      case "Godan":
        setFormatMethod((_) => GodanFormatter.getFormatter);
        break;
      case "Ichidan":
        setFormatMethod((_) => IchidanFormatter.getFormatter);
        break;
      case "Irregular":
        setFormatMethod((_) => IrregularFormatter.getFormatter);
        break;
      default:
        break;
    }
  }, [verbType, verbForm]);

  useEffect(() => {
    if (!verbList.length) {
      return;
    }
    generateNewRandomVerb();
  });

  const randomNumber = (toNumber: number) => {
    return Math.floor(Math.random() * toNumber);
  };

  const generateNewRandomVerb = () => {
    const index = randomNumber(verbList.length);
    const newVerb: Verb = { ...verbList[index] };
    newVerb.answers = [
      formatMethod(newVerb.reading),
      formatMethod(newVerb.kanji),
    ];
    verbList.splice(index, 1);
    setActualVerb(newVerb);
    setVerbList(verbList);
  };

  const onSubmit = (
    { response }: { response: string },
    event: FormEvent<HTMLFormElement> | undefined
  ) => {
    setAnswered([...answered, { ...actualVerb, answered: response }]);
    event?.currentTarget.reset();
    if (!verbList.length) {
      return finish();
    }
    generateNewRandomVerb();
  };

  const finish = () => {
    localStorage.setItem("lastResults", JSON.stringify(answered));
    router.replace("/last-results");
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
