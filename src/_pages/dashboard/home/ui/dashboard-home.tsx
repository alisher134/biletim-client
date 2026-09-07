import { getTranslations } from "next-intl/server";

export async function DashboardHome() {
  const t = await getTranslations("dashboardSidebar");

  return (
    <h1 className="text-xl font-semibold text-center md:text-2xl md:text-left">
      {t("home")}
    </h1>
  );
}
