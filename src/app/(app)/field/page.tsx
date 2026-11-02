"use client";

import Link from "next/link";
import { PageEnter } from "@/components/PageEnter";
import { SoilGauge } from "@/components/SoilGauge";
import { DropMark } from "@/components/icons/WeatherMark";
import { fields } from "@/mocks";

export default function FieldPage() {
  const focus = fields.find((f) => f.id === "field-b") ?? fields[0];

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            Field layout
          </p>
          <h1 className="display text-4xl text-[var(--leaf-deep)]">Walk the plots</h1>
          <p className="max-w-2xl text-[var(--muted)]">
            A simple map of your demo farm. Tap into soil details when a plot looks off.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="panel p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="display text-2xl text-[var(--ink)]">Shondha Fields</h2>
              <Link href="/soil" className="text-sm font-semibold text-[var(--leaf-deep)]">
                Open soil list →
              </Link>
            </div>
            <div className="field-plot grid grid-cols-2 gap-3 p-4 min-h-[280px]">
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
                  <p className="font-bold text-[var(--leaf-deep)]">{field.name}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {field.crop} · {field.areaAcres} acres
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[var(--soil-deep)]">
                    {field.statusNote}
                  </p>
                </button>
              ))}
              <div className="rounded-none border border-dashed border-[rgba(22,21,20,0.25)] bg-[rgba(243,239,230,0.35)] p-4 text-sm text-[var(--muted)]">
                Rest plot / path
              </div>
            </div>
          </div>

          <div className="panel space-y-5 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                  Focus plot
                </p>
                <h2 className="display mt-1 text-2xl text-[var(--ink)]">{focus.name}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{focus.statusNote}</p>
              </div>
              <DropMark />
            </div>
            <SoilGauge
              label="Moisture"
              value={focus.moisturePct}
              suffix="%"
              hint="Below 35% — soil looks thirsty"
            />
            <SoilGauge
              label="Nitrogen"
              value={focus.nitrogen}
              max={50}
              suffix=" ppm"
              hint="For leafy growth"
            />
            <SoilGauge
              label="Phosphorus"
              value={focus.phosphorus}
              max={40}
              suffix=" ppm"
              hint="For roots and flowering"
            />
            <SoilGauge
              label="Potassium"
              value={focus.potassium}
              max={40}
              suffix=" ppm"
              hint="For plant strength"
            />
            <SoilGauge
              label="Soil pH (acidity)"
              value={focus.ph}
              max={14}
              hint="Comfort zone is usually around 6.0–6.8"
            />
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
