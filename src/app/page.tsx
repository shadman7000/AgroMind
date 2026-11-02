"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DemoBadge } from "@/components/DemoBadge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLocale } from "@/i18n/LocaleProvider";
import { farm } from "@/mocks";

export default function LoginPage() {
  const { t } = useLocale();

  return (
    <div className="login-screen relative flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        className="panel w-full max-w-xl overflow-hidden"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="field-plot h-36 w-full" aria-hidden />
        <div className="space-y-5 p-5 sm:space-y-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <DemoBadge />
            <LanguageToggle tone="light" />
          </div>
          <div className="space-y-3">
            <p className="mono-label text-[var(--vermilion)]">{t("login.eyebrow")}</p>
            <h1 className="display text-4xl text-[var(--ink)] sm:text-5xl">AgroMind</h1>
            <p className="max-w-md text-base leading-relaxed text-[var(--muted)]">
              {t("login.blurb")}
            </p>
          </div>

          <div className="border border-[var(--ink)] bg-[var(--parchment)] px-4 py-3 text-sm text-[var(--leaf-deep)]">
            {t("login.demoFarm")} <strong>{farm.name}</strong> · {farm.location}
          </div>

          <Link href="/today" className="btn btn-primary w-full sm:w-auto">
            {t("login.continue")}
          </Link>
          <p className="text-xs text-[var(--muted)]">{t("login.authNote")}</p>
        </div>
      </motion.div>
    </div>
  );
}
