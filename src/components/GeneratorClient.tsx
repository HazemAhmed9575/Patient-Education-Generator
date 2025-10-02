"use client";

import { useRef, useState, useTransition } from "react";
import GeneratorForm, { type GenerateResult } from "./GeneratorForm";
import ResultsPanel from "./ResultsPanel";
import type { Locale } from "@/lib/i18n";

type Props = {
  dict: any;
  locale: Locale;
};

export default function GeneratorClient({ dict, locale }: Props) {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  function handleStart() {
    setError(null);
    setLoading(true);
    abortRef.current?.abort();
    abortRef.current = new AbortController();
  }

  function handleSuccess(data: GenerateResult) {
    setLoading(false);
    setResult(data);
  }

  function handleError(msg?: string) {
    setLoading(false);
    setError(msg || "Request failed");
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl border p-6">
        <h1 className="text-2xl font-bold mb-4">{dict.title}</h1>

        <GeneratorForm
          dict={dict}
          locale={locale}
          onStart={handleStart}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>

      <ResultsPanel
        dict={dict}
        locale={locale}
        isLoading={isLoading || isPending}
        error={error}
        result={result}
        onRetry={() => {
          setError(null);
        }}
      />
    </div>
  );
}
