"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleProvider";
import { softSpring } from "@/lib/motion";
import type { JobStatus, PlanAction } from "@/mocks/types";

export function PlanActionCard({
  action,
  onAccept,
  onReject,
}: {
  action: PlanAction;
  onAccept: () => void;
  onReject: () => void;
}) {
  const { t } = useLocale();

  const statusStyles: Record<JobStatus, string> = {
    pending: "",
    accepted: "!border-[var(--leaf)] bg-[rgba(35,79,50,0.06)]",
    rejected: "!border-[var(--vermilion)] bg-[rgba(200,62,43,0.05)]",
  };

  return (
    <motion.article
      layout
      className={`panel space-y-3 p-3.5 sm:space-y-4 sm:p-5 ${statusStyles[action.status]}`}
      transition={softSpring}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="display text-xl text-[var(--ink)]">{t(`plan.${action.id}.title`)}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{t(`plan.${action.id}.detail`)}</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={action.status}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="border border-[var(--ink)] bg-[var(--parchment)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wide"
          >
            {t(`common.${action.status}`)}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="border border-[var(--ink)] bg-[var(--parchment)] px-4 py-3">
        <p className="mono-label mb-1 text-[var(--leaf-deep)]">{t("common.why")}</p>
        <p className="text-sm leading-relaxed text-[var(--ink)]">{t(`plan.${action.id}.why`)}</p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          <p className="text-xs text-[var(--muted)]">{t("common.estCost")}</p>
          <p className="font-bold text-[var(--soil-deep)]">৳{action.costBdt}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">{t("common.expectedBenefit")}</p>
          <p className="font-bold text-[var(--leaf-deep)]">{t(`plan.${action.id}.benefit`)}</p>
        </div>
      </div>

      {action.status === "pending" ? (
        <div className="flex flex-wrap gap-3 pt-1">
          <motion.button
            type="button"
            className="btn btn-accept"
            whileTap={{ scale: 0.98 }}
            onClick={onAccept}
          >
            {t("common.accept")}
          </motion.button>
          <motion.button
            type="button"
            className="btn btn-reject"
            whileTap={{ scale: 0.98 }}
            onClick={onReject}
          >
            {t("common.reject")}
          </motion.button>
        </div>
      ) : null}
    </motion.article>
  );
}
