import type { Locale } from "./routing";

import changeLanguageEn from "./messages/en/change-language.json";
import changePasswordEn from "./messages/en/change-password.json";
import changeRegionEn from "./messages/en/change-region.json";
import dashboardSidebarEn from "./messages/en/dashboard-sidebar.json";
import headerEn from "./messages/en/header.json";
import profileEn from "./messages/en/profile.json";
import signInEn from "./messages/en/sign-in.json";
import signUpEn from "./messages/en/sign-up.json";
import updateProfileEn from "./messages/en/update-profile.json";
import changeLanguageKz from "./messages/kz/change-language.json";
import changePasswordKz from "./messages/kz/change-password.json";
import changeRegionKz from "./messages/kz/change-region.json";
import dashboardSidebarKz from "./messages/kz/dashboard-sidebar.json";
import headerKz from "./messages/kz/header.json";
import profileKz from "./messages/kz/profile.json";
import signInKz from "./messages/kz/sign-in.json";
import signUpKz from "./messages/kz/sign-up.json";
import updateProfileKz from "./messages/kz/update-profile.json";
import changeLanguageRu from "./messages/ru/change-language.json";
import changePasswordRu from "./messages/ru/change-password.json";
import changeRegionRu from "./messages/ru/change-region.json";
import dashboardSidebarRu from "./messages/ru/dashboard-sidebar.json";
import headerRu from "./messages/ru/header.json";
import profileRu from "./messages/ru/profile.json";
import signInRu from "./messages/ru/sign-in.json";
import signUpRu from "./messages/ru/sign-up.json";
import updateProfileRu from "./messages/ru/update-profile.json";

const messages = {
  kz: {
    changeLanguage: changeLanguageKz,
    changePassword: changePasswordKz,
    changeRegion: changeRegionKz,
    dashboardSidebar: dashboardSidebarKz,
    header: headerKz,
    profile: profileKz,
    signIn: signInKz,
    signUp: signUpKz,
    updateProfile: updateProfileKz,
  },
  ru: {
    changeLanguage: changeLanguageRu,
    changePassword: changePasswordRu,
    changeRegion: changeRegionRu,
    dashboardSidebar: dashboardSidebarRu,
    header: headerRu,
    profile: profileRu,
    signIn: signInRu,
    signUp: signUpRu,
    updateProfile: updateProfileRu,
  },
  en: {
    changeLanguage: changeLanguageEn,
    changePassword: changePasswordEn,
    changeRegion: changeRegionEn,
    dashboardSidebar: dashboardSidebarEn,
    header: headerEn,
    profile: profileEn,
    signIn: signInEn,
    signUp: signUpEn,
    updateProfile: updateProfileEn,
  },
} satisfies Record<
  Locale,
  {
    changeLanguage: typeof changeLanguageKz;
    changePassword: typeof changePasswordKz;
    changeRegion: typeof changeRegionKz;
    dashboardSidebar: typeof dashboardSidebarKz;
    header: typeof headerKz;
    profile: typeof profileKz;
    signIn: typeof signInKz;
    signUp: typeof signUpKz;
    updateProfile: typeof updateProfileKz;
  }
>;

export function loadMessages(locale: Locale) {
  return messages[locale];
}
