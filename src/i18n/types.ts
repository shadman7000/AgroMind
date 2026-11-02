export type Locale = "en" | "bn";

export type Messages = Record<string, string>;

export type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;
