"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageEnter } from "@/components/PageEnter";
import { softSpring } from "@/lib/motion";
import { defaultWhatIf, evaluateWhatIf } from "@/mocks";
import type { WhatIfControls } from "@/mocks/types";

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
    label: "Chance of rain (next 36h)",
    min: 0,
    max: 100,
    step: 1,
    format: (v) => `${v}%`,
  },
  {
    key: "waterPrice",
    label: "Pump / water cost",
    min: 8,
    max: 40,
    step: 1,
    format: (v) => `৳${v} per 100L`,
  },
  {
    key: "laborHours",
    label: "Hours of work available",
    min: 1,
    max: 10,
    step: 0.5,
    format: (v) => `${v}h`,
  },
  {
    key: "greensPriceChange",
    label: "Leafy greens price change",
    min: -15,
    max: 15,
    step: 1,
    format: (v) => `${v > 0 ? "+" : ""}${v}%`,
  },
];

const promptChips = [
  { label: "Kal heavy rain hole?", patch: { rainProbability: 75 } },
  { label: "Water becomes expensive", patch: { waterPrice: 32 } },
  { label: "Only 2 hours labor", patch: { laborHours: 2 } },
  { label: "Greens price up", patch: { greensPriceChange: 10 } },
] as const;

export default function WhatIfPage() {
  const [controls, setControls] = useState<WhatIfControls>(defaultWhatIf);
  const result = useMemo(() => evaluateWhatIf(controls), [controls]);

  const metrics = [
    { label: "Watering", value: `${result.wateringLiters} L` },
    { label: "Fertilizer", value: `${result.fertilizerKg} kg` },
    { label: "Expected profit", value: `৳${result.expectedProfitBdt.toLocaleString()}` },
    { label: "Disease risk", value: `${result.diseaseRiskPct}%` },
  ];

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            What-if
          </p>
          <h1 className="display text-4xl text-[var(--leaf-deep)]">
            Kal rainfall hole ki hote pare?
          </h1>
          <p className="max-w-2xl text-[var(--muted)]">
            Move the sliders or tap a quick prompt. The plan updates as the scenario changes.
            for the core demo.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="panel p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="display text-xl text-[var(--ink)]">Try a what-if</h2>
                <p className="text-sm text-[var(--muted)]">Sliders beat a vague chat box for grading</p>
              </div>
              <button
                type="button"
                className="btn btn-secondary text-sm"
                onClick={() => setControls(defaultWhatIf)}
              >
                Reset
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
              <div className="panel p-5 sm:p-6 space-y-3">
                <h2 className="display text-2xl text-[var(--ink)]">
                  {result.rainy ? "Rainy path" : "Dry path"}
                </h2>
                <p className="rounded-none bg-[rgba(200,62,43,0.12)] px-4 py-3 text-sm font-semibold text-[var(--warn)]">
                  {result.riskNote}
                </p>
                <p className="text-base leading-relaxed text-[var(--ink)]">{result.planSummary}</p>
                <p className="text-sm text-[var(--muted)]">
                  Water cost ~৳{result.waterCost} · Labor budget ~৳{result.laborCost}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div key={metric.label} className="panel p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                      {metric.label}
                    </p>
                    <p className="display mt-1 text-3xl text-[var(--leaf-deep)]">{metric.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="display text-xl text-[var(--ink)]">Suggested actions</h3>
                {result.actions.map((action) => (
                  <article key={action.id} className="panel p-4">
                    <p className="font-bold text-[var(--ink)]">{action.title}</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">{action.why}</p>
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
