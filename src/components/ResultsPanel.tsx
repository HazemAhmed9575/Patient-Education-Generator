"use client";

import type { GenerateResult } from "./GeneratorForm";
import type { Locale } from "@/lib/i18n";

type Props = {
  dict: any;
  locale: Locale;
  isLoading: boolean;
  error?: string | null;
  result?: GenerateResult | null;
  onRetry?: () => void;
};

export default function ResultsPanel({ dict, locale, isLoading, error, result, onRetry }: Props) {
  if (isLoading) {
    return (
      <div role="status" aria-live="polite" className="rounded-2xl border p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-56 bg-black/10 rounded" />
          <div className="h-4 w-3/4 bg-black/10 rounded" />
          <div className="h-4 w-2/3 bg-black/10 rounded" />
          <div className="h-4 w-1/2 bg-black/10 rounded" />
        </div>
        <p className="mt-4 text-sm opacity-70">{dict.results.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="rounded-2xl border p-6">
        <h3 className="font-semibold mb-2">{dict.results.errorTitle}</h3>
        <p className="text-sm opacity-80 mb-3">{error}</p>
        {onRetry && (
          <button onClick={onRetry} className="px-3 py-2 rounded-md bg-black text-white">
            {dict.results.retry}
          </button>
        )}
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl border p-6 text-center">
        <div className="text-lg font-medium">{dict.results.emptyTitle}</div>
        <div className="text-sm opacity-70 mt-1">{dict.results.emptySubtitle}</div>
      </div>
    );
  }

  return (
    <div aria-live="polite" className="rounded-2xl border p-6 space-y-5">
      <div className="text-xs opacity-70">
        {dict.results.provenance} · {new Date(result.lineage.createdAt).toLocaleString(locale)} ·{" "}
        {dict.results.sourcesCount.replace("{{count}}", String(result.lineage.sourcesCount))}
      </div>
      <h2 className="text-xl font-semibold">{result.title}</h2>

      {result.sections.map((s, i) => (
        <section key={i} className="space-y-1">
          <h3 className="font-medium">{s.heading}</h3>
          <p className="text-sm leading-6">{s.text}</p>
          {s.citations?.length ? (
            <div className="text-xs">
              <span className="font-medium">{dict.results.citations}:</span>{" "}
              {s.citations.map((c, j) => (
                <a
                  key={j}
                  href={c}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline me-2"
                >
                  [{j + 1}]
                </a>
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </div>
  );
}
