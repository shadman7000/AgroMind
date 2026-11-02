import type {
  DiseaseRisk,
  Farm,
  FieldPlot,
  MarketPrice,
  MonthlyOutlook,
  PlanAction,
  SoilReading,
  TodayJob,
  WeatherDay,
  WeatherStation,
  WhatIfControls,
  WhatIfScenario,
} from "./types";

export const farm: Farm = {
  id: "farm-demo-1",
  name: "Shondha Fields",
  location: "Savar, Dhaka",
  crop: "Boro rice + leafy greens",
  greeting: "Good morning — the field looks thirsty in plot B.",
};

export const fields: FieldPlot[] = [
  {
    id: "field-a",
    name: "Plot A · North",
    crop: "Boro rice",
    areaAcres: 1.2,
    statusNote: "Soil holding well",
    moisturePct: 48,
    moistureHistory: [44, 46, 49, 47, 45, 48, 48],
    nitrogen: 32,
    phosphorus: 18,
    potassium: 26,
    ph: 6.4,
    row: 1,
    col: 1,
  },
  {
    id: "field-b",
    name: "Plot B · East",
    crop: "Leafy greens",
    areaAcres: 0.8,
    statusNote: "Soil looks thirsty",
    moisturePct: 28,
    moistureHistory: [42, 39, 36, 34, 32, 30, 28],
    nitrogen: 22,
    phosphorus: 14,
    potassium: 19,
    ph: 6.1,
    row: 1,
    col: 2,
  },
  {
    id: "field-c",
    name: "Plot C · South",
    crop: "Boro rice",
    areaAcres: 1.5,
    statusNote: "Steady and healthy",
    moisturePct: 52,
    moistureHistory: [50, 51, 53, 52, 51, 52, 52],
    nitrogen: 35,
    phosphorus: 20,
    potassium: 28,
    ph: 6.5,
    row: 2,
    col: 1,
  },
];

/** Recent midday temps for sparkline (last 7 days → today) */
export const recentTempHistory = [29, 30, 31, 32, 30, 31, 31];

export const soilHistory: SoilReading[] = [
  {
    id: "s1",
    fieldId: "field-b",
    fieldName: "Plot B · East",
    date: "2026-10-30",
    nitrogen: 22,
    phosphorus: 14,
    potassium: 19,
    moisturePct: 28,
    ph: 6.1,
    note: "Moisture dropped after two dry days.",
  },
  {
    id: "s2",
    fieldId: "field-a",
    fieldName: "Plot A · North",
    date: "2026-10-29",
    nitrogen: 32,
    phosphorus: 18,
    potassium: 26,
    moisturePct: 48,
    ph: 6.4,
    note: "Nitrogen still comfortable for rice stage.",
  },
  {
    id: "s3",
    fieldId: "field-c",
    fieldName: "Plot C · South",
    date: "2026-10-28",
    nitrogen: 35,
    phosphorus: 20,
    potassium: 28,
    moisturePct: 52,
    ph: 6.5,
    note: "Balanced nutrition — keep monitoring.",
  },
  {
    id: "s4",
    fieldId: "field-b",
    fieldName: "Plot B · East",
    date: "2026-10-26",
    nitrogen: 24,
    phosphorus: 15,
    potassium: 20,
    moisturePct: 36,
    ph: 6.2,
    note: "Slight N dip — light feed may help later this week.",
  },
  {
    id: "s5",
    fieldId: "field-a",
    fieldName: "Plot A · North",
    date: "2026-10-24",
    nitrogen: 30,
    phosphorus: 17,
    potassium: 25,
    moisturePct: 44,
    ph: 6.3,
    note: "After light irrigation, readings stabilized.",
  },
];

export const weatherForecast: WeatherDay[] = [
  {
    day: "Today",
    tempC: 31,
    humidityPct: 62,
    rainChancePct: 15,
    highC: 33,
    lowC: 24,
    windKmh: 12,
    summary: "Bright and dry — good window for light watering.",
  },
  {
    day: "Tomorrow",
    tempC: 29,
    humidityPct: 78,
    rainChancePct: 72,
    highC: 30,
    lowC: 23,
    windKmh: 18,
    summary: "Clouds building; rain likely in the afternoon.",
  },
  {
    day: "Day after",
    tempC: 28,
    humidityPct: 80,
    rainChancePct: 55,
    highC: 29,
    lowC: 23,
    windKmh: 14,
    summary: "Lingering showers — watch leaf wetness.",
  },
  {
    day: "Wed",
    tempC: 30,
    humidityPct: 68,
    rainChancePct: 25,
    highC: 32,
    lowC: 24,
    windKmh: 10,
    summary: "Clearing up again.",
  },
];

/** Mock nearby stations — later swap for BMD / Open-Meteo style feeds */
export const weatherStations: WeatherStation[] = [
  {
    id: "st-savar",
    name: "Savar Agro Station (demo)",
    distanceKm: 3.2,
    tempC: 30.8,
    humidityPct: 64,
    rainfallMmToday: 0.0,
    updatedLabel: "12 min ago",
    note: "Closest station to Shondha Fields.",
  },
  {
    id: "st-dhaka",
    name: "Dhaka Met Demo Node",
    distanceKm: 18.5,
    tempC: 31.4,
    humidityPct: 58,
    rainfallMmToday: 0.2,
    updatedLabel: "24 min ago",
    note: "City reading — usually a bit warmer/drier than the farm.",
  },
  {
    id: "st-manik",
    name: "Manikganj Field Buoy (demo)",
    distanceKm: 27.0,
    tempC: 29.6,
    humidityPct: 71,
    rainfallMmToday: 1.4,
    updatedLabel: "41 min ago",
    note: "Shows upstream moisture trend for the corridor.",
  },
];

export const monthlyOutlook: MonthlyOutlook[] = [
  {
    month: "November",
    avgHighC: 30,
    avgLowC: 20,
    rainDays: 4,
    rainfallMm: 38,
    plainTalk: "Drying season — irrigation matters more than rain luck.",
  },
  {
    month: "December",
    avgHighC: 27,
    avgLowC: 16,
    rainDays: 2,
    rainfallMm: 12,
    plainTalk: "Cooler nights; watch greens for slow growth, not flood risk.",
  },
  {
    month: "January",
    avgHighC: 26,
    avgLowC: 13,
    rainDays: 1,
    rainfallMm: 8,
    plainTalk: "Dry and mild — plan water budget early in the month.",
  },
  {
    month: "February",
    avgHighC: 29,
    avgLowC: 16,
    rainDays: 3,
    rainfallMm: 22,
    plainTalk: "Warming again; light showers possible late month.",
  },
];

export const defaultWhatIf: WhatIfControls = {
  rainProbability: 25,
  waterPrice: 18,
  laborHours: 4,
  greensPriceChange: 2,
};

export const diseaseRisks: DiseaseRisk[] = [
  {
    name: "Leaf blight (rice)",
    probabilityPct: 34,
    plainTalk: "Medium chance if nights stay humid.",
    advice: "Check Plot A edges tomorrow morning.",
    probabilityHistory: [18, 20, 24, 28, 30, 32, 34],
  },
  {
    name: "Powdery spots (greens)",
    probabilityPct: 22,
    plainTalk: "Still low — Plot B is mostly fine.",
    advice: "Avoid heavy evening watering on greens.",
    probabilityHistory: [16, 18, 19, 21, 20, 22, 22],
  },
  {
    name: "Root stress (dry soil)",
    probabilityPct: 48,
    plainTalk: "Plot B soil is dry — plants may slow down.",
    advice: "A short morning soak helps more than a late flood.",
    probabilityHistory: [22, 26, 30, 36, 40, 44, 48],
  },
];

export const marketPrices: MarketPrice[] = [
  {
    crop: "Boro rice",
    unit: "per maund",
    priceBdt: 1480,
    changePct: 2.4,
    market: "Savar local",
    priceHistory: [1410, 1425, 1440, 1455, 1460, 1472, 1480],
  },
  {
    crop: "Leafy greens",
    unit: "per kg",
    priceBdt: 42,
    changePct: -1.1,
    market: "Savar local",
    priceHistory: [46, 45, 44, 44, 43, 42.5, 42],
  },
  {
    crop: "Urea fertilizer",
    unit: "per kg",
    priceBdt: 28,
    changePct: 0.5,
    market: "Input shop",
    priceHistory: [27, 27.2, 27.5, 27.6, 27.8, 27.9, 28],
  },
];

export const todayJobs: TodayJob[] = [
  {
    id: "j1",
    title: "Morning soak for Plot B",
    detail: "Soil looks thirsty — about 180L before the heat rises.",
    priority: "high",
    fieldName: "Plot B · East",
    icon: "water",
  },
  {
    id: "j2",
    title: "Light nitrogen for greens",
    detail: "Small feed only — don’t overdo it before possible rain.",
    priority: "medium",
    fieldName: "Plot B · East",
    icon: "fertilizer",
  },
  {
    id: "j3",
    title: "Walk the rice edges",
    detail: "Quick pest/disease glance on Plot A borders.",
    priority: "medium",
    fieldName: "Plot A · North",
    icon: "pest",
  },
  {
    id: "j4",
    title: "Log afternoon moisture",
    detail: "Tap the simulated sensor reading after lunch.",
    priority: "low",
    fieldName: "All plots",
    icon: "check",
  },
];

const baseActions: PlanAction[] = [
  {
    id: "p1",
    title: "Water Plot B · 180 liters",
    detail: "Morning irrigation before 9am.",
    why: "Moisture is 28% (thirsty), rain today is only 15%, and greens wilt fast in dry clay soil.",
    costBdt: 90,
    expectedBenefit: "Protect yield; avoid afternoon stress",
    category: "water",
    status: "pending",
  },
  {
    id: "p2",
    title: "Apply 4 kg urea on Plot B",
    detail: "Light nitrogen pass after watering soaks in.",
    why: "N reading is low for leafy greens; market price for greens is still okay, so a small feed pays back.",
    costBdt: 112,
    expectedBenefit: "+ leaf growth over 5–7 days",
    category: "fertilizer",
    status: "pending",
  },
  {
    id: "p3",
    title: "Scout Plot A for leaf blight",
    detail: "10-minute border walk; photo any spots.",
    why: "Disease probability is 34% with rising humidity tomorrow — early catch is cheaper than spray.",
    costBdt: 0,
    expectedBenefit: "Lower outbreak risk",
    category: "pest",
    status: "pending",
  },
  {
    id: "p4",
    title: "Hold heavy watering on Plot C",
    detail: "Skip extra irrigation today.",
    why: "Plot C moisture is already 52% and rain chance rises tomorrow — extra water wastes pump cost.",
    costBdt: 0,
    expectedBenefit: "Save ~120L water + pump time",
    category: "monitor",
    status: "pending",
  },
];

const rainActions: PlanAction[] = [
  {
    id: "r1",
    title: "Skip Plot B morning soak",
    detail: "Wait for afternoon rain instead.",
    why: "If tomorrow’s rain hits (~72%), soil moisture should rebound without pumping — saves cost and avoids waterlogging greens.",
    costBdt: 0,
    expectedBenefit: "Save ~180L water + ৳90 pump cost",
    category: "water",
    status: "pending",
  },
  {
    id: "r2",
    title: "Delay fertilizer until after rain",
    detail: "Hold the 4 kg urea pass.",
    why: "Rain can wash fresh urea; better to feed once soil settles the day after showers.",
    costBdt: 0,
    expectedBenefit: "Avoid wasted fertilizer ৳112",
    category: "fertilizer",
    status: "pending",
  },
  {
    id: "r3",
    title: "Scout Plot A after showers",
    detail: "Check leaf wetness and blight spots.",
    why: "Humid rain window lifts blight probability — a post-rain walk catches issues early.",
    costBdt: 0,
    expectedBenefit: "Earlier disease response",
    category: "pest",
    status: "pending",
  },
  {
    id: "r4",
    title: "Clear Plot B drainage paths",
    detail: "Quick channel check before rain.",
    why: "Greens hate standing water; a 15-minute tidy reduces rot risk if rain is heavy.",
    costBdt: 40,
    expectedBenefit: "Lower waterlogging risk",
    category: "monitor",
    status: "pending",
  },
];

export const whatIfScenarios: Record<"base" | "rain_tomorrow", WhatIfScenario> = {
  base: {
    id: "base",
    label: "As forecast now",
    blurb: "Dry today, rain more likely tomorrow.",
    riskNote: "Plot B stress if we skip watering today.",
    wateringLiters: 180,
    fertilizerKg: 4,
    expectedProfitBdt: 4200,
    diseaseRiskPct: 34,
    planSummary: "Water and lightly feed Plot B; scout rice edges; hold extra water on Plot C.",
    actions: baseActions,
  },
  rain_tomorrow: {
    id: "rain_tomorrow",
    label: "If heavy rain tomorrow",
    blurb: "Assume afternoon rain actually arrives.",
    riskNote: "Waterlogging risk rises; blight watch after showers.",
    wateringLiters: 0,
    fertilizerKg: 0,
    expectedProfitBdt: 4550,
    diseaseRiskPct: 46,
    planSummary: "Skip soak and urea today; clear drainage; scout after rain instead.",
    actions: rainActions,
  },
};

export const todayPlan = whatIfScenarios.base;

export function cloneActions(actions: PlanAction[]): PlanAction[] {
  return actions.map((a) => ({ ...a }));
}

/** Client-side mock planner — later replaced by the plan API */
export function evaluateWhatIf(controls: WhatIfControls) {
  const rainy = controls.rainProbability >= 55;
  const actions = cloneActions(rainy ? rainActions : baseActions);
  const wateringLiters = rainy ? 0 : Math.round(220 - controls.rainProbability * 1.2);
  const fertilizerKg = rainy ? 0 : 4;
  const waterCost = Math.round((wateringLiters / 100) * controls.waterPrice);
  const laborCost = Math.round(controls.laborHours * 80);
  const baseProfit = 4100 + controls.greensPriceChange * 40;
  const expectedProfitBdt = baseProfit - waterCost - (rainy ? 0 : 112) + (rainy ? 180 : 0);
  const diseaseRiskPct = Math.min(
    85,
    Math.round(28 + controls.rainProbability * 0.28 + (rainy ? 8 : 0)),
  );

  return {
    rainy,
    wateringLiters: Math.max(0, wateringLiters),
    fertilizerKg,
    waterCost,
    laborCost,
    expectedProfitBdt,
    diseaseRiskPct,
    planSummary: rainy
      ? "Rain looks likely — skip the soak, hold fertilizer, clear drainage, and scout after showers."
      : "Dry window ahead — water Plot B, light nitrogen feed, scout rice edges, save water on Plot C.",
    riskNote: rainy
      ? "Higher leaf-wetness risk after rain; blight watch recommended."
      : "Plot B may stress if watering is delayed while rain odds stay low.",
    actions,
  };
}
