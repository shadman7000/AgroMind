"use client";

import { PageEnter } from "@/components/PageEnter";
import { LeafMark, WeatherMark } from "@/components/icons/WeatherMark";
import { useLocale } from "@/i18n/LocaleProvider";
import { diseaseRisks, monthlyOutlook, weatherForecast, weatherStations } from "@/mocks";

const weatherDayKey = ["wx.today", "wx.tomorrow", "wx.dayAfter", "wx.wed"] as const;
const weatherSummaryKey = [
  "wx.today.summary",
  "wx.tomorrow.summary",
  "wx.dayAfter.summary",
  "wx.wed.summary",
] as const;
const monthKeys = ["november", "december", "january", "february"] as const;
const diseaseKeys = ["blight", "powdery", "root"] as const;

export default function WeatherPage() {
  const { t } = useLocale();

  return (
    <PageEnter>
      <section className="space-y-10">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            {t("weather.eyebrow")}
          </p>
          <h1 className="display text-3xl text-[var(--leaf-deep)] sm:text-4xl">{t("weather.title")}</h1>
          <p className="max-w-2xl text-[var(--muted)]">{t("weather.blurb")}</p>
        </div>

        <div className="space-y-4">
          <h2 className="display text-2xl text-[var(--ink)]">{t("weather.nextDays")}</h2>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {weatherForecast.map((day, index) => (
              <article key={day.day} className="panel space-y-2.5 p-3.5 sm:space-y-3 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                    {t(weatherDayKey[index])}
                  </p>
                  <WeatherMark
                    rainChancePct={day.rainChancePct}
                    humidityPct={day.humidityPct}
                    size={42}
                  />
                </div>
                <p className="display text-3xl text-[var(--leaf-deep)]">{day.tempC}°</p>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {t(weatherSummaryKey[index])}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[var(--ink)]">
                  <span>{t("weather.high", { v: day.highC })}</span>
                  <span>{t("weather.low", { v: day.lowC })}</span>
                  <span>{t("weather.rain", { v: day.rainChancePct })}</span>
                  <span>{t("weather.wind", { v: day.windKmh })}</span>
                  <span className="col-span-2">
                    {t("weather.humidity", { v: day.humidityPct })}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="display text-2xl text-[var(--ink)]">{t("weather.stations")}</h2>
            <p className="text-xs font-semibold text-[var(--soil)]">{t("weather.stationsNote")}</p>
          </div>
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
            {weatherStations.map((station) => (
              <article key={station.id} className="panel space-y-2.5 p-3.5 sm:space-y-3 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-[var(--ink)]">
                      {t(`station.${station.id}.name`)}
                    </h3>
                    <p className="text-xs text-[var(--muted)]">
                      {t("weather.stationMeta", {
                        km: station.distanceKm,
                        when: t(`station.${station.id}.updated`),
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <WeatherMark
                      rainChancePct={station.rainfallMmToday > 0.5 ? 70 : 15}
                      humidityPct={station.humidityPct}
                      size={34}
                    />
                    <span className="display text-2xl text-[var(--leaf-deep)]">
                      {station.tempC}°
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-sm font-semibold text-[var(--ink)]">
                  <span>{t("weather.humidity", { v: station.humidityPct })}</span>
                  <span>{t("weather.rainToday", { v: station.rainfallMmToday })}</span>
                </div>
                <p className="text-sm text-[var(--muted)]">
                  {t(`station.${station.id}.note`)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="display text-2xl text-[var(--ink)]">{t("weather.monthly")}</h2>
          <p className="max-w-2xl text-sm text-[var(--muted)]">{t("weather.monthlyBlurb")}</p>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {monthlyOutlook.map((month, index) => (
              <article key={month.month} className="panel space-y-2.5 p-3.5 sm:space-y-3 sm:p-5">
                <h3 className="display text-xl text-[var(--leaf-deep)]">
                  {t(`month.${monthKeys[index]}`)}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-[var(--ink)]">
                  <span>{t("weather.avgHigh", { v: month.avgHighC })}</span>
                  <span>{t("weather.avgLow", { v: month.avgLowC })}</span>
                  <span>{t("weather.rainDays", { v: month.rainDays })}</span>
                  <span>{t("weather.rainfall", { v: month.rainfallMm })}</span>
                </div>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {t(`month.${monthKeys[index]}.talk`)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="display text-2xl text-[var(--ink)]">{t("weather.disease")}</h2>
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
            {diseaseRisks.map((risk, index) => (
              <article key={risk.name} className="panel space-y-2.5 p-3.5 sm:space-y-3 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <LeafMark />
                    <h3 className="font-bold text-[var(--ink)]">
                      {t(`disease.${diseaseKeys[index]}.name`)}
                    </h3>
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
                <p className="text-sm text-[var(--muted)]">
                  {t(`disease.${diseaseKeys[index]}.talk`)}
                </p>
                <p className="text-sm font-semibold text-[var(--leaf-deep)]">
                  {t(`disease.${diseaseKeys[index]}.advice`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
