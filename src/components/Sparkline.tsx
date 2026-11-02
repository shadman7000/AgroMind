"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useMemo } from "react";

type Tone = "leaf" | "warn" | "straw" | "soil";

const strokeFor: Record<Tone, string> = {
  leaf: "var(--leaf)",
  warn: "var(--warn)",
  straw: "var(--straw)",
  soil: "var(--soil)",
};

const fillFor: Record<Tone, string> = {
  leaf: "rgba(35, 79, 50, 0.16)",
  warn: "rgba(200, 62, 43, 0.14)",
  straw: "rgba(184, 137, 46, 0.18)",
  soil: "rgba(22, 21, 20, 0.1)",
}

export function Sparkline({
  values,
  tone = "leaf",
  label = "Trend",
  className = "",
}: {
  values: number[];
  tone?: Tone;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const gradId = useId();

  const { line, area, lastX, lastY, up } = useMemo(() => {
    if (values.length < 2) {
      return { line: "", area: "", lastX: 0, lastY: 0, up: true };
    }
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const w = 120;
    const h = 36;
    const pad = 2;
    const pts = values.map((v, i) => {
      const x = pad + (i / (values.length - 1)) * (w - pad * 2);
      const y = pad + (1 - (v - min) / span) * (h - pad * 2);
      return [x, y] as const;
    });
    const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
    const areaPath = `${linePath} L${pts[pts.length - 1][0].toFixed(1)} ${h} L${pts[0][0].toFixed(1)} ${h} Z`;
    const last = pts[pts.length - 1];
    return {
      line: linePath,
      area: areaPath,
      lastX: last[0],
      lastY: last[1],
      up: values[values.length - 1] >= values[0],
    };
  }, [values]);

  if (values.length < 2) return null;

  return (
    <svg
      viewBox="0 0 120 36"
      className={`h-9 w-full overflow-visible ${className}`}
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillFor[tone]} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${gradId})`}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={strokeFor[tone]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx={lastX}
        cy={lastY}
        r="2.6"
        fill={strokeFor[tone]}
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 280, damping: 18 }}
      />
      <title>{`${label}: ${up ? "up" : "down"} over recent readings`}</title>
    </svg>
  );
}
