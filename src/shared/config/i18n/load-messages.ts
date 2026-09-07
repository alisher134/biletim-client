import type { Locale } from "./routing";

import changeLanguageKz from "./messages/kz/change-language.json";
import changePasswordKz from "./messages/kz/change-password.json";
import changeRegionKz from "./messages/kz/change-region.json";
import dashboardSidebarKz from "./messages/kz/dashboard-sidebar.json";
import headerKz from "./messages/kz/header.json";
import profileKz from "./messages/kz/profile.json";
import requireAuthKz from "./messages/kz/require-auth.json";
import signInKz from "./messages/kz/sign-in.json";
import signUpKz from "./messages/kz/sign-up.json";
import updateProfileKz from "./messages/kz/update-profile.json";
import changeLanguageRu from "./messages/ru/change-language.json";
import changePasswordRu from "./messages/ru/change-password.json";
import changeRegionRu from "./messages/ru/change-region.json";
import dashboardSidebarRu from "./messages/ru/dashboard-sidebar.json";
import headerRu from "./messages/ru/header.json";
import profileRu from "./messages/ru/profile.json";
import requireAuthRu from "./messages/ru/require-auth.json";
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
    requireAuth: requireAuthKz,
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
    requireAuth: requireAuthRu,
    signIn: signInRu,
    signUp: signUpRu,
    updateProfile: updateProfileRu,
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
    requireAuth: typeof requireAuthKz;
    signIn: typeof signInKz;
    signUp: typeof signUpKz;
    updateProfile: typeof updateProfileKz;
  }
>;

export function loadMessages(locale: Locale) {
  return messages[locale];
}
