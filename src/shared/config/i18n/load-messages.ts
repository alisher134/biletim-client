import type { Locale } from "./routing";

import changeLanguageKz from "./messages/kz/change-language.json";
import changePasswordKz from "./messages/kz/change-password.json";
import changeRegionKz from "./messages/kz/change-region.json";
import dashboardMenuKz from "./messages/kz/dashboard-menu.json";
import dashboardSidebarKz from "./messages/kz/dashboard-sidebar.json";
import errorsKz from "./messages/kz/errors.json";
import headerKz from "./messages/kz/header.json";
import profileKz from "./messages/kz/profile.json";
import requireAuthKz from "./messages/kz/require-auth.json";
import signInKz from "./messages/kz/sign-in.json";
import signUpKz from "./messages/kz/sign-up.json";
import updateProfileKz from "./messages/kz/update-profile.json";
import changeLanguageRu from "./messages/ru/change-language.json";
import changePasswordRu from "./messages/ru/change-password.json";
import changeRegionRu from "./messages/ru/change-region.json";
import dashboardMenuRu from "./messages/ru/dashboard-menu.json";
import dashboardSidebarRu from "./messages/ru/dashboard-sidebar.json";
import errorsRu from "./messages/ru/errors.json";
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
    dashboardMenu: dashboardMenuKz,
    dashboardSidebar: dashboardSidebarKz,
    errors: errorsKz,
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
    dashboardMenu: dashboardMenuRu,
    dashboardSidebar: dashboardSidebarRu,
    errors: errorsRu,
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
    dashboardMenu: typeof dashboardMenuKz;
    dashboardSidebar: typeof dashboardSidebarKz;
    errors: typeof errorsKz;
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
