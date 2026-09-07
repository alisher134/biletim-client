import { getTranslations } from "next-intl/server";

import { ChangePasswordForm } from "@/features/change-password";
import { UpdateProfileForm } from "@/features/update-profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export async function DashboardProfile() {
  const t = await getTranslations("profile");

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center md:text-2xl md:text-left">
          {t("title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-10">
        <UpdateProfileForm />
        <ChangePasswordForm />
      </CardContent>
    </Card>
  );
}
