"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageEnter } from "@/components/PageEnter";
import { Sparkline } from "@/components/Sparkline";
import { useLocale } from "@/i18n/LocaleProvider";
import { marketPrices } from "@/mocks";

const cropKey: Record<string, string> = {
  "Boro rice": "crop.boro",
  "Leafy greens": "crop.greens",
  "Urea fertilizer": "crop.urea",
};
const unitKey: Record<string, string> = {
  "per maund": "unit.maund",
  "per kg": "unit.kg",
};
const marketKey: Record<string, string> = {
  "Savar local": "market.savar",
  "Input shop": "market.shop",
};

export default function CostingPage() {
  const { t } = useLocale();
  const [yieldKg, setYieldKg] = useState(120);
  const [pricePerKg, setPricePerKg] = useState(42);
  const [waterCost, setWaterCost] = useState(90);
  const [fertCost, setFertCost] = useState(112);
  const [laborCost, setLaborCost] = useState(250);

  const profit = useMemo(() => {
    const revenue = yieldKg * pricePerKg;
    const costs = waterCost + fertCost + laborCost;
    return revenue - costs;
  }, [yieldKg, pricePerKg, waterCost, fertCost, laborCost]);

  const fields = [
    { label: t("costing.yield"), value: yieldKg, setter: setYieldKg },
    { label: t("costing.priceKg"), value: pricePerKg, setter: setPricePerKg },
    { label: t("costing.water"), value: waterCost, setter: setWaterCost },
    { label: t("costing.fert"), value: fertCost, setter: setFertCost },
    { label: t("costing.labor"), value: laborCost, setter: setLaborCost },
  ];

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            {t("costing.eyebrow")}
          </p>
          <h1 className="display text-4xl text-[var(--leaf-deep)]">{t("costing.title")}</h1>
          <p className="max-w-2xl text-[var(--muted)]">{t("costing.blurb")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {marketPrices.map((item) => (
            <article key={item.crop} className="panel space-y-2 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                {t(marketKey[item.market] ?? "market.savar")}
              </p>
              <h2 className="display text-2xl text-[var(--ink)]">
                {t(cropKey[item.crop] ?? item.crop)}
              </h2>
              <p className="text-lg font-bold text-[var(--leaf-deep)]">
                ৳{item.priceBdt}{" "}
                <span className="text-sm font-semibold text-[var(--muted)]">
                  {t(unitKey[item.unit] ?? "unit.kg")}
                </span>
              </p>
              <p
                className={`text-sm font-semibold ${
                  item.changePct >= 0 ? "text-[var(--ok)]" : "text-[var(--danger)]"
                }`}
              >
                {item.changePct >= 0 ? "+" : ""}
                {item.changePct}% {t("costing.vsWeek")}
              </p>
              <Sparkline
                values={item.priceHistory}
                tone={item.changePct >= 0 ? "leaf" : "warn"}
                label={t(cropKey[item.crop] ?? item.crop)}
              />
            </article>
          ))}
        </div>

        <div className="panel space-y-6 p-6">
          <h2 className="display text-2xl text-[var(--ink)]">{t("costing.calculator")}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fields.map((field) => (
              <label key={field.label} className="space-y-2 text-sm font-semibold text-[var(--ink)]">
                <span>{field.label}</span>
                <input
                  type="number"
                  className="w-full rounded-none border border-[rgba(22,21,20,0.18)] bg-[rgba(243,239,230,0.95)] px-3 py-2.5 font-bold outline-none focus:border-[var(--leaf)]"
                  value={field.value}
                  onChange={(e) => field.setter(Number(e.target.value) || 0)}
                />
              </label>
            ))}
          </div>

          <motion.div
            key={profit}
            initial={{ opacity: 0.4, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-none bg-[rgba(35,79,50,0.1)] px-5 py-4"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--leaf-deep)]">
              {t("costing.estimated")}
            </p>
            <p className="display mt-1 text-4xl text-[var(--leaf-deep)]">
              ৳{profit.toLocaleString()}
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              {t("costing.revenueCosts", {
                rev: (yieldKg * pricePerKg).toLocaleString(),
                costs: (waterCost + fertCost + laborCost).toLocaleString(),
              })}
            </p>
          </motion.div>
        </div>
      </section>
    </PageEnter>
  );
}
