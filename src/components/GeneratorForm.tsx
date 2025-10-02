"use client";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

export type GenerateResult = {
  title: string;
  sections: { heading: string; text: string; citations?: string[] }[];
  lineage: { createdAt: string; sourcesCount: number };
};

type Props = {
  dict: any;         
  locale: Locale;     
  onStart?: () => void;
  onSuccess?: (data: GenerateResult) => void;
  onError?: (msg?: string) => void;
};

export default function GeneratorForm({ dict, locale, onStart, onSuccess, onError }: Props) {
  const [condition, setCondition] = useState("");
  const [readingLevel, setReadingLevel] = useState<"basic"|"intermediate"|"advanced">("basic");
  const [sourceInput, setSourceInput] = useState("");
  const [sources, setSources] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!condition.trim()) {
      onError?.(locale === "ar" ? "الحالة مطلوبة" : "Condition is required");
      return;
    }
    onStart?.();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          condition,
          language: locale,
          readingLevel,
          sources,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || res.statusText);
      }

      const data = (await res.json()) as GenerateResult;
      onSuccess?.(data);
    } catch (err: any) {
      onError?.(err?.message || "Request failed");
    }
  }

  function addSource() {
    const url = sourceInput.trim();
    if (!url) return;
    setSources((s) => [...s, url]);
    setSourceInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          {dict.form.conditionLabel}
        </label>
        <input
          className="w-full rounded-md border p-2"
          placeholder={dict.form.conditionPlaceholder}
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
      </div>

      <div>
        <div className="block text-sm font-medium mb-1">
          {dict.form.readingLabel}
        </div>
        <div className="flex gap-2">
          {(["basic","intermediate","advanced"] as const).map((lvl) => (
            <button
              type="button"
              key={lvl}
              onClick={() => setReadingLevel(lvl)}
              className={`px-3 py-2 rounded-md border ${
                readingLevel === lvl ? "bg-black text-white" : "bg-white"
              }`}
            >
              {lvl === "basic" ? dict.form.readingBasic :
               lvl === "intermediate" ? dict.form.readingIntermediate :
               dict.form.readingAdvanced}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {dict.form.sourcesLabel}
        </label>
        <div className="flex gap-2">
          <input
            className="flex-1 rounded-md border p-2"
            placeholder="https://example.com/medical-resource"
            value={sourceInput}
            onChange={(e) => setSourceInput(e.target.value)}
          />
          <button type="button" onClick={addSource} className="px-3 py-2 rounded-md bg-black text-white">
            {dict.form.addSource}
          </button>
        </div>
        {sources.length > 0 && (
          <ul className="mt-2 text-xs space-y-1 opacity-80">
            {sources.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="w-full rounded-md bg-black text-white py-2">
        {dict.form.submit}
      </button>
    </form>
  );
}
