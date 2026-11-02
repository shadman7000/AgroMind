"use client";

import { AnimatePresence, motion } from "framer-motion";
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
  const statusStyles: Record<JobStatus, string> = {
    pending: "",
    accepted: "!border-[var(--leaf)] bg-[rgba(35,79,50,0.06)]",
    rejected: "!border-[var(--vermilion)] bg-[rgba(200,62,43,0.05)]",
  };

  return (
    <motion.article
      layout
      className={`panel space-y-4 p-5 ${statusStyles[action.status]}`}
      transition={softSpring}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="display text-xl text-[var(--ink)]">{action.title}</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">{action.detail}</p>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={action.status}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="border border-[var(--ink)] bg-[var(--parchment)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs font-bold uppercase tracking-wide"
          >
            {action.status}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="border border-[var(--ink)] bg-[var(--parchment)] px-4 py-3">
        <p className="mono-label mb-1 text-[var(--leaf-deep)]">Why we suggest this</p>
        <p className="text-sm leading-relaxed text-[var(--ink)]">{action.why}</p>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          <p className="text-xs text-[var(--muted)]">Est. cost</p>
          <p className="font-bold text-[var(--soil-deep)]">৳{action.costBdt}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)]">Expected benefit</p>
          <p className="font-bold text-[var(--leaf-deep)]">{action.expectedBenefit}</p>
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
            Accept
          </motion.button>
          <motion.button
            type="button"
            className="btn btn-reject"
            whileTap={{ scale: 0.98 }}
            onClick={onReject}
          >
            Reject
          </motion.button>
        </div>
      ) : null}
    </motion.article>
  );
}
