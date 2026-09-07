import { getTranslations } from "next-intl/server";

import { ChangeLanguage } from "@/features/change-language";

import { dashboardMenuNavItems } from "../model/menu-nav-items";
import { DashboardMenuAccount } from "./dashboard-menu-account";
import { DashboardMenuNav } from "./dashboard-menu-nav";
import { DashboardMenuProfile } from "./dashboard-menu-profile";

export async function DashboardMenu() {
  const t = await getTranslations("dashboardMenu");

  const items = dashboardMenuNavItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-5">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <div className="md:hidden">
          <ChangeLanguage />
        </div>
      </header>

      <DashboardMenuProfile />
      <DashboardMenuNav items={items} />
      <DashboardMenuAccount logoutLabel={t("logout")} />
    </div>
  );
}
