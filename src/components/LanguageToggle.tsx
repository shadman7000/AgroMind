"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/types";

export function LanguageToggle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, setLocale, t } = useLocale();

  const base =
    tone === "dark"
      ? "border-[rgba(243,239,230,0.35)] text-[rgba(243,239,230,0.75)]"
      : "border-[var(--ink)] text-[var(--ink)]";
  const active =
    tone === "dark"
      ? "bg-[var(--newsprint)] text-[var(--ink)] border-[var(--newsprint)]"
      : "bg-[var(--ink)] text-[var(--newsprint)] border-[var(--ink)]";

  function pick(next: Locale) {
    setLocale(next);
  }

  return (
    <div
      className={`inline-flex border ${base}`}
      role="group"
      aria-label={t("lang.switch")}
    >
      {(["en", "bn"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => pick(code)}
          className={`px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-widest transition ${
            locale === code ? active : "hover:opacity-80"
          }`}
          aria-pressed={locale === code}
        >
          {t(`lang.${code}`)}
        </button>
      ))}
    </div>
  );
}
