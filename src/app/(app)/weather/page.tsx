"use client";

import { PageEnter } from "@/components/PageEnter";
import { LeafMark, WeatherMark } from "@/components/icons/WeatherMark";
import { diseaseRisks, monthlyOutlook, weatherForecast, weatherStations } from "@/mocks";

export default function WeatherPage() {
  return (
    <PageEnter>
      <section className="space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            Weather & plant health
          </p>
          <h1 className="display text-4xl text-[var(--leaf-deep)]">Sky first, then the leaves</h1>
          <p className="max-w-2xl text-[var(--muted)]">
            Near-term forecast, nearby station snapshots, and a simple monthly outlook — all demo data
            for now, shaped like real feeds.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="display text-2xl text-[var(--ink)]">Next few days</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weatherForecast.map((day) => (
              <article key={day.day} className="panel p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                    {day.day}
                  </p>
                  <WeatherMark
                    rainChancePct={day.rainChancePct}
                    humidityPct={day.humidityPct}
                    size={42}
                  />
                </div>
                <p className="display text-3xl text-[var(--leaf-deep)]">{day.tempC}°</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{day.summary}</p>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[var(--ink)]">
                  <span>High {day.highC}°</span>
                  <span>Low {day.lowC}°</span>
                  <span>Rain {day.rainChancePct}%</span>
                  <span>Wind {day.windKmh} km/h</span>
                  <span className="col-span-2">Humidity {day.humidityPct}%</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="display text-2xl text-[var(--ink)]">Nearby weather stations</h2>
            <p className="text-xs font-semibold text-[var(--soil)]">
              Simulated BMD-style nodes · replace with live API later
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {weatherStations.map((station) => (
              <article key={station.id} className="panel p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">{station.name}</h3>
                    <p className="text-xs text-[var(--muted)]">
                      {station.distanceKm} km away · updated {station.updatedLabel}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <WeatherMark
                      rainChancePct={station.rainfallMmToday > 0.5 ? 70 : 15}
                      humidityPct={station.humidityPct}
                      size={34}
                    />
                    <span className="display text-2xl text-[var(--leaf-deep)]">{station.tempC}°</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm font-semibold text-[var(--ink)]">
                  <span>Humidity {station.humidityPct}%</span>
                  <span>Rain today {station.rainfallMmToday} mm</span>
                </div>
                <p className="text-sm text-[var(--muted)]">{station.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="display text-2xl text-[var(--ink)]">Monthly outlook</h2>
          <p className="max-w-2xl text-sm text-[var(--muted)]">
            Seasonal pattern for planning water and crop timing — not a day-by-day guarantee.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {monthlyOutlook.map((month) => (
              <article key={month.month} className="panel p-5 space-y-3">
                <h3 className="display text-xl text-[var(--leaf-deep)]">{month.month}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-[var(--ink)]">
                  <span>Avg high {month.avgHighC}°</span>
                  <span>Avg low {month.avgLowC}°</span>
                  <span>Rain days ~{month.rainDays}</span>
                  <span>Rainfall ~{month.rainfallMm} mm</span>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{month.plainTalk}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="display text-2xl text-[var(--ink)]">Plant disease chances</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {diseaseRisks.map((risk) => (
              <article key={risk.name} className="panel p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <LeafMark />
                    <h3 className="font-bold text-[var(--ink)]">{risk.name}</h3>
                  </div>
                  <span className="rounded-none bg-[rgba(200,62,43,0.14)] px-2.5 py-1 text-xs font-bold text-[var(--warn)]">
                    {risk.probabilityPct}%
                  </span>
                </div>
                <div className="gauge-track" aria-hidden>
                  <div
                    className="gauge-fill"
                    style={{
                      width: `${risk.probabilityPct}%`,
                      background: "linear-gradient(90deg, var(--straw), var(--warn))",
                    }}
                  />
                </div>
                <p className="text-sm text-[var(--muted)]">{risk.plainTalk}</p>
                <p className="text-sm font-semibold text-[var(--leaf-deep)]">{risk.advice}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
