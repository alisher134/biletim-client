import { getTranslations } from "next-intl/server";

import { AdminAnalytics } from "@/features/admin-analytics";

export async function AdminHome() {
  const t = await getTranslations("adminSidebar");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">{t("home")}</h1>
      <AdminAnalytics />
    </div>
  );
}
