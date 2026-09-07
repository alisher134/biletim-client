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
    <aside className="flex w-[15rem] shrink-0 flex-col gap-5 overflow-y-auto border-r border-sidebar-border bg-sidebar pl-3 py-6">
      <p className="px-3 text-base font-medium text-muted-foreground">
        {t("menu")}
      </p>
      <DashboardSidebarNav items={items} />
    </aside>
  );
}
