"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PageEnter } from "@/components/PageEnter";
import { FieldEditor } from "@/components/FieldEditor";
import { FieldMap } from "@/components/FieldMap";
import { SoilGauge } from "@/components/SoilGauge";
import { DropMark } from "@/components/icons/WeatherMark";
import { useLocale } from "@/i18n/LocaleProvider";
import { createEmptyField, loadFields, saveFields } from "@/lib/fieldStore";
import { farm } from "@/mocks";
import type { FieldPlot } from "@/mocks/types";

export default function FieldPage() {
  const { t } = useLocale();
  const [plots, setPlots] = useState<FieldPlot[]>([]);
  const [selectedId, setSelectedId] = useState("field-b");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadFields();
    setPlots(loaded);
    setSelectedId(loaded.find((f) => f.id === "field-b")?.id ?? loaded[0]?.id ?? "");
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveFields(plots);
  }, [plots, ready]);

  const focus = plots.find((f) => f.id === selectedId) ?? plots[0];
  const thirsty = focus ? focus.moisturePct < 35 : false;
  const canAdd = plots.length < 7;
  const canDelete = plots.length > 1;

  function updateFocus(next: FieldPlot) {
    setPlots((prev) => prev.map((f) => (f.id === next.id ? next : f)));
  }

  function addField() {
    if (!canAdd) return;
    const created = createEmptyField(plots.length);
    setPlots((prev) => [...prev, created]);
    setSelectedId(created.id);
  }

  function deleteField() {
    if (!focus || !canDelete) return;
    if (!window.confirm(t("field.deleteConfirm", { name: focus.name }))) return;
    const remaining = plots.filter((f) => f.id !== focus.id);
    setPlots(remaining);
    setSelectedId(remaining[0]?.id ?? "");
  }

  function resetDemo() {
    if (!window.confirm(t("field.resetConfirm"))) return;
    localStorage.removeItem("agromind-fields-v1");
    const fresh = loadFields();
    setPlots(fresh);
    setSelectedId(fresh.find((f) => f.id === "field-b")?.id ?? fresh[0]?.id ?? "");
  }

  if (!ready || !focus) {
    return (
      <PageEnter>
        <p className="text-sm text-[var(--muted)]">{t("field.loading")}</p>
      </PageEnter>
    );
  }

  return (
    <PageEnter>
      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--soil)]">
              {t("field.eyebrow")}
            </p>
            <h1 className="display text-3xl text-[var(--leaf-deep)] sm:text-4xl">
              {t("field.title")}
            </h1>
            <p className="max-w-2xl text-[var(--muted)]">{t("field.blurb")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={addField} disabled={!canAdd}>
              {t("field.add")}
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetDemo}>
              {t("field.reset")}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="panel p-3.5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="display text-2xl text-[var(--ink)]">{farm.name}</h2>
              <Link href="/soil" className="text-sm font-semibold text-[var(--leaf-deep)]">
                {t("field.openSoil")}
              </Link>
            </div>
            <FieldMap fields={plots} selectedId={focus.id} onSelect={setSelectedId} />
            {!canAdd ? (
              <p className="mt-3 text-xs text-[var(--muted)]">{t("field.addLimit")}</p>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="panel space-y-4 p-3.5 sm:space-y-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--soil)]">
                    {t("field.focus")}
                  </p>
                  <h2 className="display mt-1 text-2xl text-[var(--ink)]">{focus.name}</h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">{focus.statusNote}</p>
                  <p className="mt-2 text-xs font-semibold text-[var(--soil-deep)]">
                    {focus.crop} · {focus.areaAcres} {t("common.acres")}
                  </p>
                </div>
                <DropMark />
              </div>
              <SoilGauge
                label={t("common.moisture")}
                value={focus.moisturePct}
                suffix="%"
                hint={thirsty ? t("field.hintThirsty") : t("field.hintMoistureOk")}
              />
              <SoilGauge
                label={t("common.nitrogen")}
                value={focus.nitrogen}
                max={50}
                suffix=" ppm"
                hint={t("field.hintN")}
              />
              <SoilGauge
                label={t("common.phosphorus")}
                value={focus.phosphorus}
                max={40}
                suffix=" ppm"
                hint={t("field.hintP")}
              />
              <SoilGauge
                label={t("common.potassium")}
                value={focus.potassium}
                max={40}
                suffix=" ppm"
                hint={t("field.hintK")}
              />
              <SoilGauge
                label={t("common.ph")}
                value={focus.ph}
                max={14}
                hint={t("field.hintPh")}
              />
            </div>

            <FieldEditor
              field={focus}
              onChange={updateFocus}
              onDelete={deleteField}
              canDelete={canDelete}
            />
          </div>
        </div>
      </section>
    </PageEnter>
  );
}
