import { getTranslations } from "next-intl/server";

export async function AdminHome() {
  const t = await getTranslations("adminSidebar");

  return <h1 className="text-2xl font-semibold">{t("home")}</h1>;
}
