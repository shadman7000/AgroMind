"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import type { FieldPlot } from "@/mocks/types";

type Props = {
  field: FieldPlot;
  onChange: (next: FieldPlot) => void;
  onDelete: () => void;
  canDelete: boolean;
};

function NumberField({
  label,
  value,
  onChange,
  step = 1,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block space-y-1 text-xs font-semibold text-[var(--ink)]">
      <span>{label}</span>
      <input
        type="number"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border border-[var(--ink)] bg-[var(--newsprint)] px-2.5 py-2 font-bold outline-none focus:border-[var(--leaf)]"
      />
    </label>
  );
}

export function FieldEditor({ field, onChange, onDelete, canDelete }: Props) {
  const { t } = useLocale();

  function patch(partial: Partial<FieldPlot>) {
    const next = { ...field, ...partial };
    if (partial.moisturePct !== undefined) {
      const history = [...field.moistureHistory.slice(1), partial.moisturePct];
      next.moistureHistory = history;
    }
    onChange(next);
  }

  return (
    <div className="space-y-3 border border-[var(--ink)] bg-[var(--parchment)] p-3">
      <p className="mono-label text-[var(--soil)]">{t("field.editTitle")}</p>

      <label className="block space-y-1 text-xs font-semibold text-[var(--ink)]">
        <span>{t("field.form.name")}</span>
        <input
          type="text"
          value={field.name}
          onChange={(e) => patch({ name: e.target.value })}
          className="w-full border border-[var(--ink)] bg-[var(--newsprint)] px-2.5 py-2 font-bold outline-none focus:border-[var(--leaf)]"
        />
      </label>

      <label className="block space-y-1 text-xs font-semibold text-[var(--ink)]">
        <span>{t("field.form.crop")}</span>
        <input
          type="text"
          value={field.crop}
          onChange={(e) => patch({ crop: e.target.value })}
          className="w-full border border-[var(--ink)] bg-[var(--newsprint)] px-2.5 py-2 font-bold outline-none focus:border-[var(--leaf)]"
        />
      </label>

      <label className="block space-y-1 text-xs font-semibold text-[var(--ink)]">
        <span>{t("field.form.status")}</span>
        <input
          type="text"
          value={field.statusNote}
          onChange={(e) => patch({ statusNote: e.target.value })}
          className="w-full border border-[var(--ink)] bg-[var(--newsprint)] px-2.5 py-2 font-bold outline-none focus:border-[var(--leaf)]"
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <NumberField
          label={t("field.form.acres")}
          value={field.areaAcres}
          step={0.1}
          min={0.1}
          onChange={(areaAcres) => patch({ areaAcres })}
        />
        <NumberField
          label={t("common.moisture")}
          value={field.moisturePct}
          min={0}
          max={100}
          onChange={(moisturePct) => patch({ moisturePct })}
        />
        <NumberField
          label={t("common.nitrogen")}
          value={field.nitrogen}
          min={0}
          onChange={(nitrogen) => patch({ nitrogen })}
        />
        <NumberField
          label={t("common.phosphorus")}
          value={field.phosphorus}
          min={0}
          onChange={(phosphorus) => patch({ phosphorus })}
        />
        <NumberField
          label={t("common.potassium")}
          value={field.potassium}
          min={0}
          onChange={(potassium) => patch({ potassium })}
        />
        <NumberField
          label={t("common.ph")}
          value={field.ph}
          step={0.1}
          min={0}
          max={14}
          onChange={(ph) => patch({ ph })}
        />
      </div>

      <button
        type="button"
        className="btn btn-reject w-full"
        disabled={!canDelete}
        onClick={onDelete}
        title={!canDelete ? t("field.deleteBlocked") : undefined}
      >
        {t("field.delete")}
      </button>
    </div>
  );
}
