import { getTranslations } from "next-intl/server";

import { DashboardAnalytics } from "@/features/dashboard-analytics";

export async function DashboardHome() {
  const t = await getTranslations("dashboardAnalytics");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-center md:text-2xl md:text-left">
        {t("title")}
      </h1>
      <DashboardAnalytics />
    </div>
  );
}
