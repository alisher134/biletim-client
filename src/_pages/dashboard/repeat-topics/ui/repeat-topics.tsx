import { getTranslations } from "next-intl/server";

export async function RepeatTopics() {
  const t = await getTranslations("dashboardMenu");

  return (
    <h1 className="text-xl font-semibold text-center md:text-2xl md:text-left">
      {t("repeatTopics")}
    </h1>
  );
}
