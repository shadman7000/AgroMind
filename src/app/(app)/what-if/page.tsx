"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageEnter } from "@/components/PageEnter";
import { useLocale } from "@/i18n/LocaleProvider";
import { softSpring } from "@/lib/motion";
import { defaultWhatIf, evaluateWhatIf } from "@/mocks";
import type { WhatIfControls } from "@/mocks/types";

export default function WhatIfPage() {
  const { t } = useLocale();
  const [controls, setControls] = useState<WhatIfControls>(defaultWhatIf);
  const result = useMemo(() => evaluateWhatIf(controls), [controls]);

  const controlsMeta: {
    key: keyof WhatIfControls;
    label: string;
    min: number;
    max: number;
    step: number;
    format: (v: number) => string;
  }[] = [
    {
      key: "rainProbability",
      label: t("whatif.rainChance"),
      min: 0,
      max: 100,
      step: 1,
      format: (v) => `${v}%`,
    },
    {
      key: "waterPrice",
      label: t("whatif.waterPrice"),
      min: 8,
      max: 40,
      step: 1,
      format: (v) => t("whatif.per100", { v }),
    },
    {
      key: "laborHours",
      label: t("whatif.laborHours"),
      min: 1,
      max: 10,
      step: 0.5,
      format: (v) => t("whatif.hours", { v }),
    },
    {
      key: "greensPriceChange",
      label: t("whatif.greensChange"),
      min: -15,
      max: 15,
      step: 1,
      format: (v) => `${v > 0 ? "+" : ""}${v}%`,
    },
  ];

  const promptChips = [
    { label: t("whatif.chip.rain"), patch: { rainProbability: 75 } },
    { label: t("whatif.chip.water"), patch: { waterPrice: 32 } },
    { label: t("whatif.chip.labor"), patch: { laborHours: 2 } },
    { label: t("whatif.chip.greens"), patch: { greensPriceChange: 10 } },
  ] as const;

  const metrics = [
    { label: t("whatif.watering"), value: `${result.wateringLiters} L` },
    { label: t("whatif.fertilizer"), value: `${result.fertilizerKg} kg` },
    {
      label: t("whatif.profit"),
      value: `৳${result.expectedProfitBdt.toLocaleString()}`,
    },
    { label: t("whatif.disease"), value: `${result.diseaseRiskPct}%` },
  ];

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            {t("whatif.eyebrow")}
          </p>
          <h1 className="display text-3xl text-[var(--leaf-deep)] sm:text-4xl">{t("whatif.title")}</h1>
          <p className="max-w-2xl text-[var(--muted)]">{t("whatif.blurb")}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel space-y-4 p-3.5 sm:space-y-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="display text-xl text-[var(--ink)]">{t("whatif.try")}</h2>
                <p className="text-sm text-[var(--muted)]">{t("whatif.tryHint")}</p>
              </div>
              <button
                type="button"
                className="btn btn-secondary text-sm"
                onClick={() => setControls(defaultWhatIf)}
              >
                {t("common.reset")}
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {promptChips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="rounded-none border border-[rgba(22,21,20,0.16)] bg-[rgba(243,239,230,0.9)] px-3 py-1.5 text-xs font-semibold text-[var(--soil-deep)] hover:bg-white"
                  onClick={() => setControls((c) => ({ ...c, ...chip.patch }))}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {controlsMeta.map((c) => (
                <label key={c.key} className="block space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-[var(--ink)]">{c.label}</span>
                    <span className="font-bold text-[var(--leaf-deep)]">
                      {c.format(controls[c.key])}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={c.min}
                    max={c.max}
                    step={c.step}
                    value={controls[c.key]}
                    onChange={(e) =>
                      setControls((prev) => ({
                        ...prev,
                        [c.key]: Number(e.target.value),
                      }))
                    }
                    className="w-full accent-[var(--leaf)]"
                  />
                </label>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${result.rainy}-${result.wateringLiters}-${result.expectedProfitBdt}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={softSpring}
              className="space-y-4"
            >
              <div className="panel space-y-3 p-3.5 sm:p-6">
                <h2 className="display text-2xl text-[var(--ink)]">
                  {result.rainy ? t("whatif.rainyPath") : t("whatif.dryPath")}
                </h2>
                <p className="rounded-none bg-[rgba(200,62,43,0.12)] px-4 py-3 text-sm font-semibold text-[var(--warn)]">
                  {result.rainy ? t("whatif.risk.rain") : t("whatif.risk.dry")}
                </p>
                <p className="text-base leading-relaxed text-[var(--ink)]">
                  {result.rainy ? t("whatif.summary.rain") : t("whatif.summary.dry")}
                </p>
                <p className="text-sm text-[var(--muted)]">
                  {t("whatif.waterCostLabor", {
                    water: result.waterCost,
                    labor: result.laborCost,
                  })}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div key={metric.label} className="panel p-3 sm:p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                      {metric.label}
                    </p>
                    <p className="display mt-1 text-3xl text-[var(--leaf-deep)]">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="display text-xl text-[var(--ink)]">{t("whatif.actions")}</h3>
                {result.actions.map((action) => (
                  <article key={action.id} className="panel p-3 sm:p-4">
                    <p className="font-bold text-[var(--ink)]">{t(`plan.${action.id}.title`)}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {t(`plan.${action.id}.why`)}
                    </p>
                  </article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageEnter>
  );
}
