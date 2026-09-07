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
    <aside className="flex w-64 shrink-0 flex-col gap-4 overflow-y-auto bg-sidebar px-4 py-6">
      <p className="px-4 text-sm font-medium text-sidebar-foreground">
        {t("menu")}
      </p>
      <DashboardSidebarNav items={items} />
    </aside>
  );
}
