"use client";

import { motion, useReducedMotion } from "framer-motion";

type Kind = "sunny" | "rain" | "cloudy" | "humid" | "wind";

function pickKind(rainChancePct: number, humidityPct?: number): Kind {
  if (rainChancePct >= 55) return "rain";
  if (rainChancePct >= 30) return "cloudy";
  if ((humidityPct ?? 0) >= 75) return "humid";
  return "sunny";
}

export function WeatherMark({
  rainChancePct,
  humidityPct,
  size = 36,
  className = "",
}: {
  rainChancePct: number;
  humidityPct?: number;
  size?: number;
  className?: string;
}) {
  const kind = pickKind(rainChancePct, humidityPct);
  const reduce = useReducedMotion();

  return (
    <span
      className={`inline-flex items-center justify-center text-[var(--leaf-deep)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {kind === "sunny" ? <SunIcon reduce={!!reduce} /> : null}
      {kind === "rain" ? <RainIcon reduce={!!reduce} /> : null}
      {kind === "cloudy" ? <CloudIcon reduce={!!reduce} /> : null}
      {kind === "humid" ? <HumidIcon reduce={!!reduce} /> : null}
    </span>
  );
}

function SunIcon({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
      <motion.g
        style={{ transformOrigin: "24px 24px" }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={reduce ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="24"
            y1="6"
            x2="24"
            y2="11"
            stroke="var(--straw)"
            strokeWidth="2.4"
            strokeLinecap="round"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </motion.g>
      <motion.circle
        cx="24"
        cy="24"
        r="9"
        fill="var(--straw)"
        animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
        transition={reduce ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function RainIcon({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
      <path
        d="M16 20c0-5 4-9 9-9 4.2 0 7.7 2.8 8.7 6.6A6.5 6.5 0 0 1 40 24.5C40 28 37 31 33.5 31H17c-3.6 0-6.5-2.9-6.5-6.5S14 20 16 20Z"
        fill="rgba(35,79,50,0.18)"
        stroke="var(--leaf)"
        strokeWidth="2"
      />
      {[14, 24, 34].map((x, i) => (
        <motion.line
          key={x}
          x1={x}
          x2={x - 2}
          y1="34"
          y2="42"
          stroke="var(--leaf-soft)"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={reduce ? undefined : { y: [0, 5, 0], opacity: [0.35, 1, 0.35] }}
          transition={
            reduce
              ? undefined
              : { duration: 1.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }
          }
        />
      ))}
    </svg>
  );
}

function CloudIcon({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
      <motion.path
        d="M15 30c0-4.2 3.3-7.5 7.5-7.5 1.2 0 2.4.3 3.4.8A7 7 0 0 1 38 28c0 3.9-3.1 7-7 7H17c-3.3 0-6-2.7-6-6 0-1.4.5-2.7 1.3-3.7"
        fill="rgba(22,21,20,0.1)"
        stroke="var(--soil)"
        strokeWidth="2"
        strokeLinejoin="round"
        animate={reduce ? undefined : { x: [0, 2, 0] }}
        transition={reduce ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="18" cy="18" r="4" fill="var(--straw-soft)" opacity="0.9" />
    </svg>
  );
}

function HumidIcon({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
      <motion.path
        d="M24 8c6 8.5 10 14 10 19a10 10 0 1 1-20 0c0-5 4-10.5 10-19Z"
        fill="rgba(35,79,50,0.16)"
        stroke="var(--leaf)"
        strokeWidth="2"
        animate={reduce ? undefined : { y: [0, -1.5, 0] }}
        transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function DropMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-flex h-8 w-8 text-[var(--leaf)] ${className}`} aria-hidden>
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        <motion.path
          d="M24 8c6 8.5 10 14 10 19a10 10 0 1 1-20 0c0-5 4-10.5 10-19Z"
          fill="rgba(35,79,50,0.18)"
          stroke="currentColor"
          strokeWidth="2"
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}

export function LeafMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-flex h-8 w-8 text-[var(--leaf-deep)] ${className}`} aria-hidden>
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        <motion.path
          d="M12 34c8-2 14-8 18-16 2 10-1 18-8 22-6 3-12 1-10-6Z"
          fill="rgba(35,79,50,0.16)"
          stroke="currentColor"
          strokeWidth="2"
          animate={reduce ? undefined : { rotate: [-2, 2, -2] }}
          transition={reduce ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "24px 36px" }}
        />
        <path d="M18 36c6-4 10-10 12-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function CoinMark({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={`inline-flex h-8 w-8 text-[var(--straw)] ${className}`} aria-hidden>
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none">
        <motion.circle
          cx="24"
          cy="24"
          r="12"
          fill="rgba(184,137,46,0.25)"
          stroke="currentColor"
          strokeWidth="2"
          animate={reduce ? undefined : { rotate: [0, 8, 0] }}
          transition={reduce ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <text
          x="24"
          y="28"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="var(--soil-deep)"
        >
          ৳
        </text>
      </svg>
    </span>
  );
}
