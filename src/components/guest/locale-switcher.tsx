"use client";

import { locales } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";

export function LocaleSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="flex items-center gap-1">
      <span className="sr-only">{t.locale.label}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as typeof locale)}
        className="h-9 max-w-[7.5rem] truncate rounded-lg border border-border/70 bg-background px-2 text-xs"
        aria-label={t.locale.label}
      >
        {locales.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
