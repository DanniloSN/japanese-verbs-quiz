"use client";

import Button from "@/components/button";
import Delimiter from "@/components/delimiter";
import { Verb } from "@/database/verbs";
import { useRouter } from "next/navigation";

export default function LastResultsPage() {
  const router = useRouter();

  const lastResults = JSON.parse(
    localStorage.getItem("lastResults") ?? "[]"
  ) as Verb[];

  return (
    <main>
      <Delimiter className="p-3">
        <h1 className="text-center">Last results</h1>
        <br />
        <ul>
          {lastResults.map((result) => {
            return (
              <li className="mb-5" key={result.kanji}>
                <p>
                  - {result.kanji} ({result.reading}):
                </p>
                <p>
                  Your answer:
                  <span
                    className={
                      result.answers?.includes(result.answered ?? "")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {` ${result.answered}`}
                  </span>
                </p>
                <p>
                  Correct answers: {result.answers && result.answers.join("､ ")}
                </p>
              </li>
            );
          })}
        </ul>
      </Delimiter>
      <Delimiter fixed>
        <Button onClick={() => router.push("/")}>Back</Button>
      </Delimiter>
    </main>
  );
}
