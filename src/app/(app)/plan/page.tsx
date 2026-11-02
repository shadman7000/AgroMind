"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PageEnter } from "@/components/PageEnter";
import { PlanActionCard } from "@/components/PlanActionCard";
import { useLocale } from "@/i18n/LocaleProvider";
import { softSpring } from "@/lib/motion";
import { cloneActions, todayPlan } from "@/mocks";
import type { PlanAction } from "@/mocks/types";

export default function PlanPage() {
  const { t } = useLocale();
  const [actions, setActions] = useState<PlanAction[]>(() => cloneActions(todayPlan.actions));
  const [generated, setGenerated] = useState(true);

  const accepted = actions.filter((a) => a.status === "accepted").length;
  const rejected = actions.filter((a) => a.status === "rejected").length;

  function setStatus(id: string, status: PlanAction["status"]) {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  function regenerate() {
    setActions(cloneActions(todayPlan.actions));
    setGenerated(true);
  }

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
            {t("plan.eyebrow")}
          </p>
          <h1 className="display text-4xl text-[var(--leaf-deep)]">{t("plan.title")}</h1>
          <p className="max-w-2xl text-[var(--muted)]">{t("plan.blurb")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            className="btn btn-primary"
            whileTap={{ scale: 0.98 }}
            onClick={regenerate}
          >
            {t("plan.refresh")}
          </motion.button>
          <Link href="/what-if" className="btn btn-secondary">
            {t("plan.tryWhatIf")}
          </Link>
        </div>

        <motion.div layout className="panel space-y-3 p-5 sm:p-6" transition={softSpring}>
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
            {t("plan.summary")}
          </p>
          <p className="text-base leading-relaxed text-[var(--ink)]">{t("plan.summary.base")}</p>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            <span className="text-[var(--ok)]">{t("plan.accepted", { n: accepted })}</span>
            <span className="text-[var(--danger)]">{t("plan.rejected", { n: rejected })}</span>
            <span className="text-[var(--muted)]">
              {t("plan.pending", {
                n: actions.filter((a) => a.status === "pending").length,
              })}
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {generated ? (
            <motion.div layout className="grid gap-4" transition={softSpring}>
              {actions.map((action) => (
                <PlanActionCard
                  key={action.id}
                  action={action}
                  onAccept={() => setStatus(action.id, "accepted")}
                  onReject={() => setStatus(action.id, "rejected")}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </PageEnter>
  );
}
