import type { TodayJob } from "@/mocks/types";

export function JobIcon({ kind }: { kind: TodayJob["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "water") {
    return (
      <svg {...common}>
        <path d="M12 3c3.5 5 6 8.2 6 11a6 6 0 1 1-12 0c0-2.8 2.5-6 6-11Z" />
      </svg>
    );
  }

  if (kind === "fertilizer") {
    return (
      <svg {...common}>
        <path d="M12 21V11" />
        <path d="M12 11c-2.5-1.5-4-4-4-7 2.8.4 4 2.2 4 2.2S15.2 4.4 18 4c0 3-1.5 5.5-4 7Z" />
      </svg>
    );
  }

  if (kind === "pest") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 5v2.2M12 16.8V19M5 12h2.2M16.8 12H19M7.2 7.2l1.5 1.5M15.3 15.3l1.5 1.5M16.8 7.2l-1.5 1.5M8.7 15.3l-1.5 1.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 12.5 9.5 17 19 7.5" />
    </svg>
  );
}
