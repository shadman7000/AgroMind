"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JobCard } from "@/components/JobCard";
import { PageEnter } from "@/components/PageEnter";
import { SoilGauge } from "@/components/SoilGauge";
import { Sparkline } from "@/components/Sparkline";
import {
  CoinMark,
  DropMark,
  LeafMark,
  WeatherMark,
} from "@/components/icons/WeatherMark";
import { useLocale } from "@/i18n/LocaleProvider";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  diseaseRisks,
  farm,
  fields,
  marketPrices,
  recentTempHistory,
  todayJobs,
  todayPlan,
  weatherForecast,
  weatherStations,
} from "@/mocks";

const weatherDayKey = ["wx.today", "wx.tomorrow", "wx.dayAfter", "wx.wed"] as const;
const weatherSummaryKey = [
  "wx.today.summary",
  "wx.tomorrow.summary",
  "wx.dayAfter.summary",
  "wx.wed.summary",
] as const;
const diseaseKey = ["blight", "powdery", "root"] as const;
const cropKey: Record<string, string> = {
  "Boro rice": "crop.boro",
  "Leafy greens": "crop.greens",
  "Urea fertilizer": "crop.urea",
};
const unitKey: Record<string, string> = {
  "per maund": "unit.maund",
  "per kg": "unit.kg",
};

function GlanceCard({
  href,
  eyebrow,
  title,
  value,
  note,
  tone = "default",
  icon,
  series,
  seriesLabel,
  sparkTone = "leaf",
}: {
  href: string;
  eyebrow: string;
  title: string;
  value: string;
  note: string;
  tone?: "default" | "warn" | "ok";
  icon: ReactNode;
  series?: number[];
  seriesLabel?: string;
  sparkTone?: "leaf" | "warn" | "straw" | "soil";
}) {
  const valueColor =
    tone === "warn"
      ? "text-[var(--warn)]"
      : tone === "ok"
        ? "text-[var(--ok)]"
        : "text-[var(--ink)]";

  return (
    <motion.div variants={staggerItem}>
      <Link
        href={href}
        className="panel block h-full p-3.5 transition hover:-translate-y-0.5 hover:border-[rgba(35,79,50,0.28)] sm:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">{eyebrow}</p>
          {icon}
        </div>
        <p className="mt-2 text-sm font-semibold text-[var(--muted)]">{title}</p>
        <p className={`display mt-2 text-3xl ${valueColor}`}>{value}</p>
        {series && series.length > 1 ? (
          <div className="mt-3">
            <Sparkline values={series} tone={sparkTone} label={seriesLabel ?? title} />
          </div>
        ) : null}
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{note}</p>
      </Link>
    </motion.div>
  );
}

export default function TodayPage() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const todayWeather = weatherForecast[0];
  const driest = [...fields].sort((a, b) => a.moisturePct - b.moisturePct)[0];
  const topRiskIndex = diseaseRisks
    .map((risk, index) => ({ risk, index }))
    .sort((a, b) => b.risk.probabilityPct - a.risk.probabilityPct)[0];
  const greens = marketPrices.find((m) => m.crop === "Leafy greens") ?? marketPrices[0];
  const nearestStation = weatherStations[0];
  const highJobs = todayJobs.filter((j) => j.priority === "high").length;
  const planCost = todayPlan.actions.reduce((sum, a) => sum + a.costBdt, 0);
  const firstJobTitle = t(`job.${todayJobs[0]?.id ?? "j1"}.title`);

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="panel overflow-hidden">
          <div className="field-plot h-24 w-full sm:h-28" aria-hidden />
          <div className="space-y-4 p-4 sm:space-y-5 sm:p-8">
            <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-2 sm:space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
                  {t("today.briefing", { farm: farm.name })}
                </p>
                <h1 className="display text-2xl text-[var(--ink)] sm:text-5xl">
                  {t("today.jobsHeadline", { count: todayJobs.length })}
                  <span className="text-[var(--muted)]">
                    {" "}
                    {t("today.startWith", { task: firstJobTitle })}
                  </span>
                </h1>
                <p className="text-base leading-relaxed text-[var(--muted)]">{t("farm.greeting")}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/plan" className="btn btn-primary">
                  {t("today.reviewPlan")}
                </Link>
                <Link href="/what-if" className="btn btn-secondary">
                  {t("today.whatIfRain")}
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-none bg-[rgba(35,79,50,0.08)] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink)]">
                  {t("today.highPriority")}
                </p>
                <p className="display mt-1 text-2xl text-[var(--ink)]">{highJobs}</p>
              </div>
              <div className="rounded-none bg-[rgba(35,79,50,0.08)] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink)]">
                  {t("today.planCost")}
                </p>
                <p className="display mt-1 text-2xl text-[var(--ink)]">৳{planCost}</p>
              </div>
              <div className="rounded-none bg-[rgba(35,79,50,0.08)] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink)]">
                  {t("today.nearestStation")}
                </p>
                <p className="display mt-1 text-2xl text-[var(--ink)]">{nearestStation.tempC}°</p>
                <p className="text-xs text-[var(--muted)]">
                  {t(`station.${nearestStation.id}.name`)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="display text-2xl text-[var(--ink)]">{t("today.atAGlance")}</h2>
            <p className="text-sm text-[var(--muted)]">{t("today.tapCards")}</p>
          </div>
          <motion.div
            className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4"
            variants={staggerContainer}
            initial={reduce ? false : "initial"}
            animate="animate"
          >
            <GlanceCard
              href="/weather"
              eyebrow={t("today.weather")}
              title={t(weatherDayKey[0])}
              value={`${todayWeather.tempC}°`}
              note={t("today.rainNote", {
                pct: todayWeather.rainChancePct,
                summary: t(weatherSummaryKey[0]),
              })}
              icon={
                <WeatherMark
                  rainChancePct={todayWeather.rainChancePct}
                  humidityPct={todayWeather.humidityPct}
                  size={40}
                />
              }
              series={recentTempHistory}
              seriesLabel={t("today.tempHistory")}
              sparkTone="straw"
            />
            <GlanceCard
              href="/field"
              eyebrow={t("today.driest")}
              title={t(`field.${driest.id}.name`)}
              value={`${driest.moisturePct}%`}
              note={`${t(`field.${driest.id}.status`)} · ${t("today.moistureTrend")}`}
              tone={driest.moisturePct < 35 ? "warn" : "ok"}
              icon={<DropMark />}
              series={driest.moistureHistory}
              seriesLabel={`${t(`field.${driest.id}.name`)}`}
              sparkTone={driest.moisturePct < 35 ? "warn" : "leaf"}
            />
            <GlanceCard
              href="/weather"
              eyebrow={t("today.plantRisk")}
              title={t(`disease.${diseaseKey[topRiskIndex.index]}.name`)}
              value={`${topRiskIndex.risk.probabilityPct}%`}
              note={t(`disease.${diseaseKey[topRiskIndex.index]}.talk`)}
              tone="warn"
              icon={<LeafMark />}
              series={topRiskIndex.risk.probabilityHistory}
              seriesLabel={t(`disease.${diseaseKey[topRiskIndex.index]}.name`)}
              sparkTone="warn"
            />
            <GlanceCard
              href="/costing"
              eyebrow={t("today.market")}
              title={t(cropKey[greens.crop] ?? "crop.greens")}
              value={`৳${greens.priceBdt}`}
              note={`${greens.changePct >= 0 ? "+" : ""}${greens.changePct}% ${t("today.weekChange")} · ${t(unitKey[greens.unit] ?? "unit.kg")}`}
              tone={greens.changePct >= 0 ? "ok" : "warn"}
              icon={<CoinMark />}
              series={greens.priceHistory}
              seriesLabel={t(cropKey[greens.crop] ?? "crop.greens")}
              sparkTone={greens.changePct >= 0 ? "leaf" : "warn"}
            />
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="panel space-y-3 p-3.5 sm:space-y-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="display text-xl text-[var(--ink)] sm:text-2xl">{t("today.plotsNow")}</h2>
              <Link href="/field" className="text-sm font-semibold text-[var(--ink)]">
                {t("today.openField")}
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="rounded-none border border-[rgba(22,21,20,0.12)] bg-[rgba(243,239,230,0.7)] p-4"
                >
                  <p className="font-bold text-[var(--ink)]">{t(`field.${field.id}.name`)}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {t(`field.${field.id}.crop`)}
                  </p>
                  <p className="mt-3 text-sm font-semibold text-[var(--soil-deep)]">
                    {t(`field.${field.id}.status`)}
                  </p>
                  <div className="mt-3">
                    <SoilGauge
                      label={t("common.moisture")}
                      value={field.moisturePct}
                      suffix="%"
                    />
                  </div>
                  <div className="mt-3">
                    <Sparkline
                      values={field.moistureHistory}
                      tone={field.moisturePct < 35 ? "warn" : "leaf"}
                      label={t(`field.${field.id}.name`)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel space-y-3 p-3.5 sm:space-y-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="display text-xl text-[var(--ink)] sm:text-2xl">{t("today.planPeek")}</h2>
              <Link href="/plan" className="text-sm font-semibold text-[var(--ink)]">
                {t("today.fullPlan")}
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              {t("plan.summary.base")}
            </p>
            <ul className="space-y-3">
              {todayPlan.actions.slice(0, 3).map((action) => (
                <li
                  key={action.id}
                  className="rounded-none bg-[rgba(35,79,50,0.07)] px-4 py-3"
                >
                  <p className="font-bold text-[var(--ink)]">{t(`plan.${action.id}.title`)}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
                    {t(`plan.${action.id}.why`)}
                  </p>
                </li>
              ))}
            </ul>
            <Link href="/soil" className="btn btn-secondary w-full sm:w-auto">
              {t("today.checkSoil")}
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <h2 className="display text-2xl text-[var(--ink)]">{t("today.jobList")}</h2>
            <p className="text-sm text-[var(--muted)]">
              {t("today.tasksQueued", { count: todayJobs.length })}
            </p>
          </div>
          <motion.div
            className="grid gap-3 sm:gap-4"
            variants={staggerContainer}
            initial={reduce ? false : "initial"}
            animate="animate"
          >
            {todayJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </motion.div>
        </div>
      </section>
    </PageEnter>
  );
}
