"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SoilGauge({
  label,
  value,
  max = 100,
  suffix = "",
  hint,
}: {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  hint?: string;
}) {
  const reduce = useReducedMotion();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-[var(--ink)]">{label}</span>
        <span className="text-sm font-bold text-[var(--leaf-deep)]">
          {value}
          {suffix}
        </span>
      </div>
      <div className="gauge-track" aria-hidden>
        <motion.div
          className="gauge-fill"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ width: "100%" }}
        />
      </div>
      {hint ? <p className="text-xs text-[var(--muted)]">{hint}</p> : null}
    </div>
  );
}
