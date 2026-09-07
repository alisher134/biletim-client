import type { Locale } from "./routing";

import changeLanguageEn from "./messages/en/change-language.json";
import changeRegionEn from "./messages/en/change-region.json";
import dashboardSidebarEn from "./messages/en/dashboard-sidebar.json";
import headerEn from "./messages/en/header.json";
import signInEn from "./messages/en/sign-in.json";
import signUpEn from "./messages/en/sign-up.json";
import changeLanguageKz from "./messages/kz/change-language.json";
import changeRegionKz from "./messages/kz/change-region.json";
import dashboardSidebarKz from "./messages/kz/dashboard-sidebar.json";
import headerKz from "./messages/kz/header.json";
import signInKz from "./messages/kz/sign-in.json";
import signUpKz from "./messages/kz/sign-up.json";
import changeLanguageRu from "./messages/ru/change-language.json";
import changeRegionRu from "./messages/ru/change-region.json";
import dashboardSidebarRu from "./messages/ru/dashboard-sidebar.json";
import headerRu from "./messages/ru/header.json";
import signInRu from "./messages/ru/sign-in.json";
import signUpRu from "./messages/ru/sign-up.json";

const messages = {
  kz: {
    changeLanguage: changeLanguageKz,
    changeRegion: changeRegionKz,
    dashboardSidebar: dashboardSidebarKz,
    header: headerKz,
    signIn: signInKz,
    signUp: signUpKz,
  },
  ru: {
    changeLanguage: changeLanguageRu,
    changeRegion: changeRegionRu,
    dashboardSidebar: dashboardSidebarRu,
    header: headerRu,
    signIn: signInRu,
    signUp: signUpRu,
  },
  en: {
    changeLanguage: changeLanguageEn,
    changeRegion: changeRegionEn,
    dashboardSidebar: dashboardSidebarEn,
    header: headerEn,
    signIn: signInEn,
    signUp: signUpEn,
  },
} satisfies Record<
  Locale,
  {
    changeLanguage: typeof changeLanguageKz;
    changeRegion: typeof changeRegionKz;
    dashboardSidebar: typeof dashboardSidebarKz;
    header: typeof headerKz;
    signIn: typeof signInKz;
    signUp: typeof signUpKz;
  }
>;

export function loadMessages(locale: Locale) {
  return messages[locale];
}
