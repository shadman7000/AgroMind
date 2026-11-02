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
        className="panel block h-full p-5 transition hover:-translate-y-0.5 hover:border-[rgba(35,79,50,0.28)]"
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
  const reduce = useReducedMotion();
  const todayWeather = weatherForecast[0];
  const driest = [...fields].sort((a, b) => a.moisturePct - b.moisturePct)[0];
  const topRisk = [...diseaseRisks].sort((a, b) => b.probabilityPct - a.probabilityPct)[0];
  const greens = marketPrices.find((m) => m.crop === "Leafy greens") ?? marketPrices[0];
  const nearestStation = weatherStations[0];
  const highJobs = todayJobs.filter((j) => j.priority === "high").length;
  const planCost = todayPlan.actions.reduce((sum, a) => sum + a.costBdt, 0);

  return (
    <PageEnter>
      <section className="space-y-8">
        {/* Hero briefing */}
        <div className="panel overflow-hidden">
          <div className="field-plot h-24 w-full sm:h-28" aria-hidden />
          <div className="space-y-5 p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
                  Morning briefing · {farm.name}
                </p>
                <h1 className="display text-3xl text-[var(--ink)] sm:text-5xl">
                  You have {todayJobs.length} jobs today.
                  <span className="text-[var(--muted)]">
                    {" "}
                    Start with {todayJobs[0]?.title.toLowerCase() ?? "the field"}.
                  </span>
                </h1>
                <p className="text-base leading-relaxed text-[var(--muted)]">{farm.greeting}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/plan" className="btn btn-primary">
                  Review today’s plan
                </Link>
                <Link href="/what-if" className="btn btn-secondary">
                  What if it rains?
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-none bg-[rgba(35,79,50,0.08)] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink)]">
                  High priority
                </p>
                <p className="display mt-1 text-2xl text-[var(--ink)]">{highJobs}</p>
              </div>
              <div className="rounded-none bg-[rgba(35,79,50,0.08)] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink)]">
                  Plan cost today
                </p>
                <p className="display mt-1 text-2xl text-[var(--ink)]">৳{planCost}</p>
              </div>
              <div className="rounded-none bg-[rgba(35,79,50,0.08)] px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-[var(--ink)]">
                  Nearest station
                </p>
                <p className="display mt-1 text-2xl text-[var(--ink)]">{nearestStation.tempC}°</p>
                <p className="text-xs text-[var(--muted)]">{nearestStation.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* At-a-glance strips */}
        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <h2 className="display text-2xl text-[var(--ink)]">At a glance</h2>
            <p className="text-sm text-[var(--muted)]">Tap any card for details</p>
          </div>
          <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            variants={staggerContainer}
            initial={reduce ? false : "initial"}
            animate="animate"
          >
            <GlanceCard
              href="/weather"
              eyebrow="Weather"
              title={todayWeather.day}
              value={`${todayWeather.tempC}°`}
              note={`Rain ${todayWeather.rainChancePct}% · ${todayWeather.summary}`}
              icon={
                <WeatherMark
                  rainChancePct={todayWeather.rainChancePct}
                  humidityPct={todayWeather.humidityPct}
                  size={40}
                />
              }
              series={recentTempHistory}
              seriesLabel="Temperature last 7 days"
              sparkTone="straw"
            />
            <GlanceCard
              href="/field"
              eyebrow="Driest plot"
              title={driest.name}
              value={`${driest.moisturePct}%`}
              note={`${driest.statusNote} · 7-day moisture trend`}
              tone={driest.moisturePct < 35 ? "warn" : "ok"}
              icon={<DropMark />}
              series={driest.moistureHistory}
              seriesLabel={`${driest.name} moisture history`}
              sparkTone={driest.moisturePct < 35 ? "warn" : "leaf"}
            />
            <GlanceCard
              href="/weather"
              eyebrow="Plant risk"
              title={topRisk.name}
              value={`${topRisk.probabilityPct}%`}
              note={topRisk.plainTalk}
              tone="warn"
              icon={<LeafMark />}
              series={topRisk.probabilityHistory}
              seriesLabel={`${topRisk.name} risk trend`}
              sparkTone="warn"
            />
            <GlanceCard
              href="/costing"
              eyebrow="Market"
              title={greens.crop}
              value={`৳${greens.priceBdt}`}
              note={`${greens.changePct >= 0 ? "+" : ""}${greens.changePct}% this week · ${greens.unit}`}
              tone={greens.changePct >= 0 ? "ok" : "warn"}
              icon={<CoinMark />}
              series={greens.priceHistory}
              seriesLabel={`${greens.crop} price history`}
              sparkTone={greens.changePct >= 0 ? "leaf" : "warn"}
            />
          </motion.div>
        </div>

        {/* Fields + plan peek */}
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="panel p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="display text-2xl text-[var(--ink)]">Plots right now</h2>
              <Link href="/field" className="text-sm font-semibold text-[var(--ink)]">
                Open field map →
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="rounded-none border border-[rgba(22,21,20,0.12)] bg-[rgba(243,239,230,0.7)] p-4"
                >
                  <p className="font-bold text-[var(--ink)]">{field.name}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{field.crop}</p>
                  <p className="mt-3 text-sm font-semibold text-[var(--soil-deep)]">
                    {field.statusNote}
                  </p>
                  <div className="mt-3">
                    <SoilGauge label="Moisture" value={field.moisturePct} suffix="%" />
                  </div>
                  <div className="mt-3">
                    <Sparkline
                      values={field.moistureHistory}
                      tone={field.moisturePct < 35 ? "warn" : "leaf"}
                      label={`${field.name} moisture`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="display text-2xl text-[var(--ink)]">Plan peek</h2>
              <Link href="/plan" className="text-sm font-semibold text-[var(--ink)]">
                Full plan →
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-[var(--muted)]">{todayPlan.planSummary}</p>
            <ul className="space-y-3">
              {todayPlan.actions.slice(0, 3).map((action) => (
                <li
                  key={action.id}
                  className="rounded-none bg-[rgba(35,79,50,0.07)] px-4 py-3"
                >
                  <p className="font-bold text-[var(--ink)]">{action.title}</p>
                  <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">{action.why}</p>
                </li>
              ))}
            </ul>
            <Link href="/soil" className="btn btn-secondary w-full sm:w-auto">
              Check soil nutrition
            </Link>
          </div>
        </div>

        {/* Job list */}
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-3">
            <h2 className="display text-2xl text-[var(--ink)]">Today’s job list</h2>
            <p className="text-sm text-[var(--muted)]">{todayJobs.length} tasks queued</p>
          </div>
          <motion.div
            className="grid gap-4"
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
