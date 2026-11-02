"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageEnter } from "@/components/PageEnter";
import { Sparkline } from "@/components/Sparkline";
import { marketPrices } from "@/mocks";

export default function CostingPage() {
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

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            Costing
          </p>
          <h1 className="display text-4xl text-[var(--leaf-deep)]">Prices & a simple profit check</h1>
          <p className="max-w-2xl text-[var(--muted)]">
            Recent market numbers plus a calm calculator — tweak inputs and see the margin.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {marketPrices.map((item) => (
            <article key={item.crop} className="panel p-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                {item.market}
              </p>
              <h2 className="display text-2xl text-[var(--ink)]">{item.crop}</h2>
              <p className="text-lg font-bold text-[var(--leaf-deep)]">
                ৳{item.priceBdt}{" "}
                <span className="text-sm font-semibold text-[var(--muted)]">{item.unit}</span>
              </p>
              <p
                className={`text-sm font-semibold ${
                  item.changePct >= 0 ? "text-[var(--ok)]" : "text-[var(--danger)]"
                }`}
              >
                {item.changePct >= 0 ? "+" : ""}
                {item.changePct}% vs last week
              </p>
              <Sparkline
                values={item.priceHistory}
                tone={item.changePct >= 0 ? "leaf" : "warn"}
                label={`${item.crop} price trend`}
              />
            </article>
          ))}
        </div>

        <div className="panel p-6 space-y-6">
          <h2 className="display text-2xl text-[var(--ink)]">Profit calculator</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["Expected yield (kg)", yieldKg, setYieldKg],
                ["Price per kg (৳)", pricePerKg, setPricePerKg],
                ["Water / pump (৳)", waterCost, setWaterCost],
                ["Fertilizer (৳)", fertCost, setFertCost],
                ["Labor (৳)", laborCost, setLaborCost],
              ] as const
            ).map(([label, value, setter]) => (
              <label key={label} className="space-y-2 text-sm font-semibold text-[var(--ink)]">
                <span>{label}</span>
                <input
                  type="number"
                  className="w-full rounded-none border border-[rgba(22,21,20,0.18)] bg-[rgba(243,239,230,0.95)] px-3 py-2.5 font-bold outline-none focus:border-[var(--leaf)]"
                  value={value}
                  onChange={(e) => setter(Number(e.target.value) || 0)}
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
              Estimated profit
            </p>
            <p className="display mt-1 text-4xl text-[var(--leaf-deep)]">৳{profit.toLocaleString()}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Revenue ৳{(yieldKg * pricePerKg).toLocaleString()} − costs ৳
              {(waterCost + fertCost + laborCost).toLocaleString()}
            </p>
          </motion.div>
        </div>
      </section>
    </PageEnter>
  );
}
