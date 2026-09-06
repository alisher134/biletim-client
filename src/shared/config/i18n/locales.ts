import type { Locale } from "./routing";

export const localeOptions = [
  { code: "kz", label: "Қазақша", shortLabel: "Қаз" },
  { code: "ru", label: "Русский", shortLabel: "Рус" },
  { code: "en", label: "English", shortLabel: "Eng" },
] as const satisfies readonly {
  code: Locale;
  label: string;
  shortLabel: string;
}[];

export function getLocaleOption(locale: string) {
  return localeOptions.find((item) => item.code === locale) ?? localeOptions[0];
}
