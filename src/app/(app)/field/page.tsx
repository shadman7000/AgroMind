"use client";

import Link from "next/link";
import { PageEnter } from "@/components/PageEnter";
import { SoilGauge } from "@/components/SoilGauge";
import { DropMark } from "@/components/icons/WeatherMark";
import { useLocale } from "@/i18n/LocaleProvider";
import { farm, fields } from "@/mocks";

export default function FieldPage() {
  const { t } = useLocale();
  const focus = fields.find((f) => f.id === "field-b") ?? fields[0];

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            {t("field.eyebrow")}
          </p>
          <h1 className="display text-3xl text-[var(--leaf-deep)] sm:text-4xl">{t("field.title")}</h1>
          <p className="max-w-2xl text-[var(--muted)]">{t("field.blurb")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="panel p-3.5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="display text-2xl text-[var(--ink)]">{farm.name}</h2>
              <Link href="/soil" className="text-sm font-semibold text-[var(--leaf-deep)]">
                {t("field.openSoil")}
              </Link>
            </div>
            <div className="field-plot grid min-h-[280px] grid-cols-2 gap-3 p-4">
              {fields.map((field) => (
                <button
                  key={field.id}
                  type="button"
                  className={`rounded-none border p-4 text-left transition ${
                    field.id === focus.id
                      ? "border-[var(--leaf)] bg-[rgba(243,239,230,0.92)] shadow-sm"
                      : "border-transparent bg-[rgba(243,239,230,0.55)] hover:bg-[rgba(243,239,230,0.8)]"
                  }`}
                >
                  <p className="font-bold text-[var(--leaf-deep)]">
                    {t(`field.${field.id}.name`)}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {t(`field.${field.id}.crop`)} · {field.areaAcres} {t("common.acres")}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[var(--soil-deep)]">
                    {t(`field.${field.id}.status`)}
                  </p>
                </button>
              ))}
              <div className="rounded-none border border-dashed border-[rgba(22,21,20,0.25)] bg-[rgba(243,239,230,0.35)] p-4 text-sm text-[var(--muted)]">
                {t("field.rest")}
              </div>
            </div>
          </div>

          <div className="panel space-y-4 p-3.5 sm:space-y-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                  {t("field.focus")}
                </p>
                <h2 className="display mt-1 text-2xl text-[var(--ink)]">
                  {t(`field.${focus.id}.name`)}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {t(`field.${focus.id}.status`)}
                </p>
              </div>
              <DropMark />
            </div>
            <SoilGauge
              label={t("common.moisture")}
              value={focus.moisturePct}
              suffix="%"
              hint={t("field.hintThirsty")}
            />
            <SoilGauge
              label={t("common.nitrogen")}
              value={focus.nitrogen}
              max={50}
              suffix=" ppm"
              hint={t("field.hintN")}
            />
            <SoilGauge
              label={t("common.phosphorus")}
              value={focus.phosphorus}
              max={40}
              suffix=" ppm"
              hint={t("field.hintP")}
            />
            <SoilGauge
              label={t("common.potassium")}
              value={focus.potassium}
              max={40}
              suffix=" ppm"
              hint={t("field.hintK")}
            />
            <SoilGauge
              label={t("common.ph")}
              value={focus.ph}
              max={14}
              hint={t("field.hintPh")}
            />
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
