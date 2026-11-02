"use client";

import { PageEnter } from "@/components/PageEnter";
import { useLocale } from "@/i18n/LocaleProvider";
import { soilHistory } from "@/mocks";

function Nutrient({
  name,
  value,
  unit,
  hint,
}: {
  name: string;
  value: number | string;
  unit?: string;
  hint: string;
}) {
  return (
    <div className="rounded-none bg-[rgba(35,79,50,0.07)] px-3 py-3">
      <p className="text-xs font-bold text-[var(--leaf-deep)]">{name}</p>
      <p className="mt-1 text-lg font-bold text-[var(--ink)]">
        {value}
        {unit ? <span className="text-sm font-semibold text-[var(--muted)]"> {unit}</span> : null}
      </p>
      <p className="mt-1 text-xs text-[var(--muted)]">{hint}</p>
    </div>
  );
}

export default function SoilPage() {
  const { t } = useLocale();

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            {t("soil.eyebrow")}
          </p>
          <h1 className="display text-4xl text-[var(--leaf-deep)]">{t("soil.title")}</h1>
          <p className="max-w-2xl text-[var(--muted)]">{t("soil.blurb")}</p>
        </div>

        <div className="grid gap-4">
          {soilHistory.map((row) => (
            <article key={row.id} className="panel space-y-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="display text-2xl text-[var(--ink)]">
                    {t(`field.${row.fieldId}.name`)}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {t("soil.readingFrom", { date: row.date })}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Nutrient
                  name={t("common.nitrogen")}
                  value={row.nitrogen}
                  unit="ppm"
                  hint={t("soil.hintN")}
                />
                <Nutrient
                  name={t("common.phosphorus")}
                  value={row.phosphorus}
                  unit="ppm"
                  hint={t("soil.hintP")}
                />
                <Nutrient
                  name={t("common.potassium")}
                  value={row.potassium}
                  unit="ppm"
                  hint={t("soil.hintK")}
                />
                <Nutrient
                  name={t("soil.moisture")}
                  value={row.moisturePct}
                  unit="%"
                  hint={t("soil.hintMoisture")}
                />
                <Nutrient name={t("common.ph")} value={row.ph} hint={t("soil.hintPh")} />
              </div>

              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {t(`soil.${row.id}.note`)}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageEnter>
  );
}
