"use client";

import { useLocale } from "@/i18n/LocaleProvider";

export function DemoBadge() {
  const { t } = useLocale();
  return (
    <span className="demo-badge" title={t("common.demoBadgeTitle")}>
      <span aria-hidden>◎</span>
      {t("common.demoBadge")}
    </span>
  );
}
