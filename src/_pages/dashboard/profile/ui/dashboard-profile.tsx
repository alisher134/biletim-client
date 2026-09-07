import { getTranslations } from "next-intl/server";

export async function DashboardProfile() {
  const t = await getTranslations("header");

  return <h1 className="text-2xl font-semibold">{t("profile")}</h1>;
}
