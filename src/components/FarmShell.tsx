"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DemoBadge } from "@/components/DemoBadge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLocale } from "@/i18n/LocaleProvider";
import { farm } from "@/mocks";

const links = [
  { href: "/today", labelKey: "nav.today" },
  { href: "/field", labelKey: "nav.field" },
  { href: "/soil", labelKey: "nav.soil" },
  { href: "/weather", labelKey: "nav.weather" },
  { href: "/costing", labelKey: "nav.costing" },
  { href: "/plan", labelKey: "nav.plan" },
  { href: "/what-if", labelKey: "nav.whatIf" },
] as const;

export function FarmShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <div className="farm-shell min-h-screen">
      <header className="sticky top-0 z-20 border-b-[1.5px] border-[var(--ink)] bg-[var(--ink-soft)] text-[var(--newsprint)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="display text-2xl text-[var(--newsprint)] sm:text-3xl">AgroMind</p>
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[rgba(243,239,230,0.7)]">
                {farm.name} · {farm.location}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <LanguageToggle tone="dark" />
              <span className="border border-[var(--vermilion)] bg-[var(--vermilion)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-widest text-white">
                {t("common.demo")}
              </span>
              <DemoBadge />
              <Link
                href="/"
                className="border border-[var(--newsprint)] px-3 py-2 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-widest text-[var(--newsprint)] hover:bg-[var(--newsprint)] hover:text-[var(--ink)]"
              >
                {t("common.signOut")}
              </Link>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-1" aria-label={t("nav.main")}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link whitespace-nowrap !border-[rgba(243,239,230,0.25)] !text-[rgba(243,239,230,0.75)] hover:!bg-[rgba(243,239,230,0.12)] hover:!text-[var(--newsprint)] data-[active=true]:!bg-[var(--newsprint)] data-[active=true]:!text-[var(--ink)]"
                data-active={pathname === link.href}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}
