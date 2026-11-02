import { fields as seedFields } from "@/mocks";
import type { FieldPlot } from "@/mocks/types";

export const FIELD_STORAGE_KEY = "agromind-fields-v1";

export function loadFields(): FieldPlot[] {
  if (typeof window === "undefined") return seedFields.map((f) => ({ ...f }));
  try {
    const raw = window.localStorage.getItem(FIELD_STORAGE_KEY);
    if (!raw) return seedFields.map((f) => ({ ...f }));
    const parsed = JSON.parse(raw) as FieldPlot[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return seedFields.map((f) => ({ ...f }));
    }
    return parsed;
  } catch {
    return seedFields.map((f) => ({ ...f }));
  }
}

export function saveFields(next: FieldPlot[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FIELD_STORAGE_KEY, JSON.stringify(next));
}

export function createEmptyField(index: number): FieldPlot {
  const id = `field-${Date.now()}`;
  return {
    id,
    name: `Plot ${String.fromCharCode(65 + (index % 26))}`,
    crop: "Leafy greens",
    areaAcres: 1,
    statusNote: "New plot — update readings",
    moisturePct: 40,
    moistureHistory: [40, 40, 40, 40, 40, 40, 40],
    nitrogen: 25,
    phosphorus: 15,
    potassium: 20,
    ph: 6.3,
    row: 2,
    col: 2,
  };
}
