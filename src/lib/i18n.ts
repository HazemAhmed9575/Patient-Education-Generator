export const LOCALES = ["en", "ar"] as const;
export type Locale = typeof LOCALES[number];

import en from "@/messages/en.json";
import ar from "@/messages/ar.json";

export function getDict(locale: Locale) {
  return locale === "ar" ? ar : en;
}

export const isRTL = (locale: Locale) => locale === "ar";
