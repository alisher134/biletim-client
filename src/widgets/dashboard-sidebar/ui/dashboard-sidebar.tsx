import { getTranslations } from "next-intl/server";

import { dashboardNavItems } from "../model/nav-items";
import { DashboardSidebarNav } from "./dashboard-sidebar-nav";

export async function DashboardSidebar() {
  const t = await getTranslations("dashboardSidebar");

  const items = dashboardNavItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));

  return (
    <aside className="hidden w-[320px] shrink-0 flex-col gap-5 overflow-y-auto border-r border-sidebar-border bg-sidebar py-6 pl-3 md:flex">
      <p className="px-3 text-base font-medium text-muted-foreground">
        {t("menu")}
      </p>
      <DashboardSidebarNav items={items} />
    </aside>
  );
}
