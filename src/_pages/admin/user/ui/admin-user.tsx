import { getTranslations } from "next-intl/server";

import { AdminUserDetails } from "@/features/admin-users";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { LinkButton } from "@/shared/ui/link-button";

type AdminUserProps = {
  userId: string;
};

export async function AdminUser({ userId }: AdminUserProps) {
  const t = await getTranslations("adminUsers");

  return (
    <section className="flex flex-col gap-4">
      <LinkButton href="/admin/users" variant="ghost" className="self-start">
        {t("back")}
      </LinkButton>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("userTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AdminUserDetails userId={userId} />
        </CardContent>
      </Card>
    </section>
  );
}
