"use client";

import { PageEnter } from "@/components/PageEnter";
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
  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            Soil nutrition
          </p>
          <h1 className="display text-4xl text-[var(--leaf-deep)]">What’s in the ground</h1>
          <p className="max-w-2xl text-[var(--muted)]">
            Full nutrient names — not lab shorthand — so anyone on the farm can read the list.
          </p>
        </div>

        <div className="grid gap-4">
          {soilHistory.map((row) => (
            <article key={row.id} className="panel p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="display text-2xl text-[var(--ink)]">{row.fieldName}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">Reading from {row.date}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Nutrient
                  name="Nitrogen"
                  value={row.nitrogen}
                  unit="ppm"
                  hint="Helps leafy growth (often shortened to N)"
                />
                <Nutrient
                  name="Phosphorus"
                  value={row.phosphorus}
                  unit="ppm"
                  hint="Helps roots and flowering (often shortened to P)"
                />
                <Nutrient
                  name="Potassium"
                  value={row.potassium}
                  unit="ppm"
                  hint="Helps strength and stress tolerance (often shortened to K)"
                />
                <Nutrient
                  name="Soil moisture"
                  value={row.moisturePct}
                  unit="%"
                  hint="How wet the soil feels right now"
                />
                <Nutrient
                  name="Soil pH (acidity)"
                  value={row.ph}
                  hint="Around 6.0–6.8 is usually comfortable for these crops"
                />
              </div>

              <p className="text-sm leading-relaxed text-[var(--muted)]">{row.note}</p>
            </article>
          ))}
        </div>
      </section>
    </PageEnter>
  );
}
