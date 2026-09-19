export const locales = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "zh-TW", label: "繁體中文", flag: "🇹🇼" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
] as const;

export type Locale = (typeof locales)[number]["code"];

export const defaultLocale: Locale = "es";
export const LOCALE_COOKIE = "alfred-locale";

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale.code === value);
}

export const weekdayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
