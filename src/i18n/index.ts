import { bn } from "./bn";
import { en } from "./en";
import type { Locale, Messages, TranslateFn } from "./types";

export type { Locale, Messages, TranslateFn };

export const dictionaries: Record<Locale, Messages> = { en, bn };

export const LOCALE_STORAGE_KEY = "agromind-locale";

export function createTranslator(locale: Locale): TranslateFn {
  const table = dictionaries[locale];
  const fallback = dictionaries.en;

  return (key, vars) => {
    let text = table[key] ?? fallback[key] ?? key;
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        text = text.replaceAll(`{${name}}`, String(value));
      }
    }
    return text;
  };
}
