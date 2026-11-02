"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/i18n/LocaleProvider";
import type { FieldPlot } from "@/mocks/types";

type Parcel = {
  id: string;
  path: string;
  labelX: number;
  labelY: number;
  badgeX: number;
  badgeY: number;
};

const PARCELS: Parcel[] = [
  {
    id: "field-a",
    path: "M48 56 L248 42 L268 188 L62 206 Z",
    labelX: 140,
    labelY: 112,
    badgeX: 150,
    badgeY: 138,
  },
  {
    id: "field-b",
    path: "M278 48 L468 62 L452 210 L286 196 Z",
    labelX: 368,
    labelY: 118,
    badgeX: 372,
    badgeY: 144,
  },
  {
    id: "field-c",
    path: "M70 228 L274 214 L292 348 L86 362 Z",
    labelX: 178,
    labelY: 278,
    badgeX: 186,
    badgeY: 304,
  },
];

const EXTRA_SLOTS = [
  { x: 308, y: 236, w: 62, h: 50 },
  { x: 376, y: 238, w: 62, h: 50 },
  { x: 308, y: 294, w: 62, h: 50 },
  { x: 376, y: 296, w: 62, h: 50 },
];

function moistureFill(pct: number, selected: boolean) {
  if (pct < 35) {
    return selected ? "rgba(200, 62, 43, 0.28)" : "rgba(200, 62, 43, 0.16)";
  }
  if (pct < 45) {
    return selected ? "rgba(184, 137, 46, 0.28)" : "rgba(184, 137, 46, 0.16)";
  }
  return selected ? "rgba(35, 79, 50, 0.30)" : "rgba(35, 79, 50, 0.16)";
}

function moistureStroke(pct: number, selected: boolean) {
  if (selected) return "var(--ink)";
  if (pct < 35) return "var(--vermilion)";
  return "rgba(22, 21, 20, 0.55)";
}

function displayName(
  field: FieldPlot,
  t: (key: string, vars?: Record<string, string | number>) => string,
) {
  const key = `field.${field.id}.name`;
  const value = t(key);
  return value === key ? field.name : value;
}

function displayCrop(
  field: FieldPlot,
  t: (key: string, vars?: Record<string, string | number>) => string,
) {
  const key = `field.${field.id}.crop`;
  const value = t(key);
  return value === key ? field.crop : value;
}

export function FieldMap({
  fields,
  selectedId,
  onSelect,
}: {
  fields: FieldPlot[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { t } = useLocale();
  const byId = Object.fromEntries(fields.map((f) => [f.id, f]));
  const fixedIds = new Set(PARCELS.map((p) => p.id));
  const extras = fields.filter((f) => !fixedIds.has(f.id)).slice(0, EXTRA_SLOTS.length);

  return (
    <div className="space-y-3">
      <div className="border border-[var(--ink)] bg-[var(--parchment)]">
        <svg
          viewBox="0 0 520 400"
          className="h-auto w-full"
          role="img"
          aria-label={t("field.mapLabel")}
        >
          <defs>
            <pattern id="mapDots" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(22,21,20,0.08)" />
            </pattern>
            <pattern id="cropRows" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 9 H10" stroke="rgba(35,79,50,0.18)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="520" height="400" fill="var(--newsprint)" />
          <rect x="0" y="0" width="520" height="400" fill="url(#mapDots)" />

          <path
            d="M20 390 L300 372 L500 382"
            fill="none"
            stroke="rgba(22,21,20,0.35)"
            strokeWidth="10"
            strokeLinecap="square"
          />
          <path
            d="M20 390 L300 372 L500 382"
            fill="none"
            stroke="rgba(243,239,230,0.7)"
            strokeWidth="2"
            strokeDasharray="6 8"
          />

          <path
            d="M300 40 L312 370"
            fill="none"
            stroke="rgba(56, 120, 160, 0.45)"
            strokeWidth="7"
          />
          <path
            d="M300 40 L312 370"
            fill="none"
            stroke="rgba(56, 120, 160, 0.75)"
            strokeWidth="2"
            strokeDasharray="4 6"
          />

          <path
            d="M300 228 L448 236 L438 348 L308 340 Z"
            fill="rgba(22,21,20,0.04)"
            stroke="rgba(22,21,20,0.35)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          {extras.length === 0 ? (
            <text
              x="372"
              y="292"
              textAnchor="middle"
              className="fill-[var(--muted)]"
              style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
            >
              {t("field.rest")}
            </text>
          ) : null}

          {PARCELS.map((parcel) => {
            const field = byId[parcel.id];
            if (!field) return null;
            const selected = selectedId === parcel.id;
            return (
              <g key={parcel.id}>
                <motion.path
                  d={parcel.path}
                  fill={moistureFill(field.moisturePct, selected)}
                  stroke={moistureStroke(field.moisturePct, selected)}
                  strokeWidth={selected ? 3 : 1.75}
                  initial={false}
                  animate={{ scale: selected ? 1.01 : 1 }}
                  style={{
                    transformOrigin: `${parcel.labelX}px ${parcel.labelY}px`,
                    cursor: "pointer",
                  }}
                  onClick={() => onSelect(parcel.id)}
                />
                <path d={parcel.path} fill="url(#cropRows)" opacity={0.55} pointerEvents="none" />
                <text
                  x={parcel.labelX}
                  y={parcel.labelY}
                  textAnchor="middle"
                  className="fill-[var(--ink)]"
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    pointerEvents: "none",
                  }}
                >
                  {displayName(field, t)}
                </text>
                <text
                  x={parcel.labelX}
                  y={parcel.labelY + 16}
                  textAnchor="middle"
                  className="fill-[var(--muted)]"
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--font-mono)",
                    pointerEvents: "none",
                  }}
                >
                  {displayCrop(field, t)}
                </text>
                <rect
                  x={parcel.badgeX - 28}
                  y={parcel.badgeY - 11}
                  width="56"
                  height="18"
                  fill={selected ? "var(--ink)" : "var(--newsprint)"}
                  stroke="var(--ink)"
                  strokeWidth="1.25"
                  pointerEvents="none"
                />
                <text
                  x={parcel.badgeX}
                  y={parcel.badgeY + 2}
                  textAnchor="middle"
                  fill={selected ? "var(--newsprint)" : "var(--ink)"}
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    pointerEvents: "none",
                  }}
                >
                  {field.moisturePct}%
                </text>
              </g>
            );
          })}

          {extras.map((field, index) => {
            const slot = EXTRA_SLOTS[index];
            const selected = selectedId === field.id;
            const cx = slot.x + slot.w / 2;
            const cy = slot.y + slot.h / 2;
            return (
              <g key={field.id} style={{ cursor: "pointer" }} onClick={() => onSelect(field.id)}>
                <rect
                  x={slot.x}
                  y={slot.y}
                  width={slot.w}
                  height={slot.h}
                  fill={moistureFill(field.moisturePct, selected)}
                  stroke={moistureStroke(field.moisturePct, selected)}
                  strokeWidth={selected ? 2.5 : 1.5}
                />
                <text
                  x={cx}
                  y={cy - 2}
                  textAnchor="middle"
                  className="fill-[var(--ink)]"
                  style={{ fontSize: 9, fontWeight: 700, pointerEvents: "none" }}
                >
                  {field.name.length > 10 ? `${field.name.slice(0, 9)}…` : field.name}
                </text>
                <text
                  x={cx}
                  y={cy + 12}
                  textAnchor="middle"
                  className="fill-[var(--ink)]"
                  style={{ fontSize: 9, fontFamily: "var(--font-mono)", pointerEvents: "none" }}
                >
                  {field.moisturePct}%
                </text>
              </g>
            );
          })}

          <g transform="translate(458, 28)">
            <rect x="0" y="0" width="44" height="44" fill="var(--newsprint)" stroke="var(--ink)" />
            <polygon points="22,8 26,22 22,20 18,22" fill="var(--vermilion)" />
            <polygon points="22,36 26,22 22,24 18,22" fill="rgba(22,21,20,0.35)" />
            <text
              x="22"
              y="14"
              textAnchor="middle"
              fill="var(--ink)"
              style={{ fontSize: 8, fontWeight: 700, fontFamily: "var(--font-mono)" }}
            >
              N
            </text>
          </g>

          <text
            x="24"
            y="28"
            className="fill-[var(--ink)]"
            style={{ fontSize: 10, letterSpacing: "0.12em", fontFamily: "var(--font-mono)" }}
          >
            {t("field.mapLegendTitle")}
          </text>
        </svg>
      </div>

      <div className="flex flex-wrap gap-3 text-xs font-semibold text-[var(--ink)]">
        <span className="inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--newsprint)] px-2 py-1">
          <span className="inline-block h-3 w-3 border border-[var(--ink)] bg-[rgba(35,79,50,0.25)]" />
          {t("field.legendOk")}
        </span>
        <span className="inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--newsprint)] px-2 py-1">
          <span className="inline-block h-3 w-3 border border-[var(--ink)] bg-[rgba(184,137,46,0.28)]" />
          {t("field.legendWatch")}
        </span>
        <span className="inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--newsprint)] px-2 py-1">
          <span className="inline-block h-3 w-3 border border-[var(--ink)] bg-[rgba(200,62,43,0.25)]" />
          {t("field.legendDry")}
        </span>
        <span className="inline-flex items-center gap-2 border border-[var(--ink)] bg-[var(--newsprint)] px-2 py-1">
          <span className="inline-block h-1.5 w-5 bg-[rgba(56,120,160,0.7)]" />
          {t("field.legendCanal")}
        </span>
      </div>
      <p className="text-xs text-[var(--muted)]">{t("field.mapHint")}</p>
    </div>
  );
}
