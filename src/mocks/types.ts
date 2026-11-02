export type JobPriority = "high" | "medium" | "low";

export type JobStatus = "pending" | "accepted" | "rejected";

export interface Farm {
  id: string;
  name: string;
  location: string;
  crop: string;
  greeting: string;
}

export interface FieldPlot {
  id: string;
  name: string;
  crop: string;
  areaAcres: number;
  statusNote: string;
  moisturePct: number;
  moistureHistory: number[];
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  row: number;
  col: number;
}

export interface SoilReading {
  id: string;
  fieldId: string;
  fieldName: string;
  date: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisturePct: number;
  ph: number;
  note: string;
}

export interface WeatherDay {
  day: string;
  tempC: number;
  humidityPct: number;
  rainChancePct: number;
  summary: string;
  highC: number;
  lowC: number;
  windKmh: number;
}

export interface WeatherStation {
  id: string;
  name: string;
  distanceKm: number;
  tempC: number;
  humidityPct: number;
  rainfallMmToday: number;
  updatedLabel: string;
  note: string;
}

export interface MonthlyOutlook {
  month: string;
  avgHighC: number;
  avgLowC: number;
  rainDays: number;
  rainfallMm: number;
  plainTalk: string;
}

export interface DiseaseRisk {
  name: string;
  probabilityPct: number;
  plainTalk: string;
  advice: string;
  probabilityHistory: number[];
}

export interface WhatIfControls {
  rainProbability: number;
  waterPrice: number;
  laborHours: number;
  greensPriceChange: number;
}

export interface MarketPrice {
  crop: string;
  unit: string;
  priceBdt: number;
  changePct: number;
  market: string;
  priceHistory: number[];
}

export interface PlanAction {
  id: string;
  title: string;
  detail: string;
  why: string;
  costBdt: number;
  expectedBenefit: string;
  category: "water" | "fertilizer" | "pest" | "harvest" | "monitor";
  status: JobStatus;
}

export interface TodayJob {
  id: string;
  title: string;
  detail: string;
  priority: JobPriority;
  fieldName: string;
  icon: "water" | "fertilizer" | "pest" | "check";
}

export interface WhatIfScenario {
  id: "base" | "rain_tomorrow";
  label: string;
  blurb: string;
  riskNote: string;
  wateringLiters: number;
  fertilizerKg: number;
  expectedProfitBdt: number;
  diseaseRiskPct: number;
  planSummary: string;
  actions: PlanAction[];
}
