import type { Locale } from "./routing";

import changeLanguageEn from "./messages/en/change-language.json";
import changeRegionEn from "./messages/en/change-region.json";
import headerEn from "./messages/en/header.json";
import changeLanguageKz from "./messages/kz/change-language.json";
import changeRegionKz from "./messages/kz/change-region.json";
import headerKz from "./messages/kz/header.json";
import changeLanguageRu from "./messages/ru/change-language.json";
import changeRegionRu from "./messages/ru/change-region.json";
import headerRu from "./messages/ru/header.json";

const messages = {
  kz: {
    changeLanguage: changeLanguageKz,
    changeRegion: changeRegionKz,
    header: headerKz,
  },
  ru: {
    changeLanguage: changeLanguageRu,
    changeRegion: changeRegionRu,
    header: headerRu,
  },
  en: {
    changeLanguage: changeLanguageEn,
    changeRegion: changeRegionEn,
    header: headerEn,
  },
} satisfies Record<
  Locale,
  {
    changeLanguage: typeof changeLanguageKz;
    changeRegion: typeof changeRegionKz;
    header: typeof headerKz;
  }
>;

export function loadMessages(locale: Locale) {
  return messages[locale];
}
