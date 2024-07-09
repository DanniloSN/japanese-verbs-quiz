"use client";

import Button from "@/components/button";
import Delimiter from "@/components/delimiter";
import Form from "@/components/form";
import Select from "@/components/select";
import { useRouter } from "next/navigation";

export type VerbType = "Godan" | "Ichidan" | "Irregular";
export type VerbFormType =
  | "Polite"
  | "Negative"
  | "Negative_Polite"
  | "Imperative"
  | "Conditional"
  | "Te";

export default function Home() {
  const verbTypes: VerbType[] = ["Godan", "Ichidan", "Irregular"];
  const verbForms: VerbFormType[] = [
    "Polite",
    "Negative",
    "Negative_Polite",
    "Imperative",
    "Conditional",
    "Te",
  ];
  const router = useRouter();

  const onSubmit = (data: { verbType: VerbType; verbForm: VerbFormType }) => {
    localStorage.setItem("verbType", data.verbType);
    localStorage.setItem("verbForm", data.verbForm);
    router.push("/verbs");
  };

  return (
    <Form onSubmit={onSubmit}>
      <Delimiter className="p-3">
        <h1 className="text-center">Verbs</h1>
        <br />
        <div className="flex gap-2">
          <Select className="flex-1" name="verbType">
            {verbTypes.map((type) => {
              return (
                <option key={type} value={type}>
                  {type}
                </option>
              );
            })}
          </Select>
          <Select className="flex-1" name="verbForm">
            {verbForms.map((form) => {
              return (
                <option key={form} value={form}>
                  {form}
                </option>
              );
            })}
          </Select>
        </div>
      </Delimiter>
      <Delimiter fixed>
        <Button>Start</Button>
      </Delimiter>
    </Form>
  );
}
