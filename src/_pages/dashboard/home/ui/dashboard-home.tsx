import { getTranslations } from "next-intl/server";

export async function DashboardHome() {
  const t = await getTranslations("dashboardSidebar");

  return <h1 className="text-2xl font-semibold">{t("home")}</h1>;
}
