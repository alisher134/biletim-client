import { getTranslations } from "next-intl/server";

import { MyCoursesList } from "@/features/courses";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export async function MyCourses() {
  const t = await getTranslations("courses");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{t("myCourses")}</CardTitle>
      </CardHeader>

      <CardContent>
        <MyCoursesList />
      </CardContent>
    </Card>
  );
}
