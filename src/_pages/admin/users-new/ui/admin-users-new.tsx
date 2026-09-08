import { getTranslations } from "next-intl/server";

import { CreateAdminUserForm } from "@/features/admin-users";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { LinkButton } from "@/shared/ui/link-button";

export async function AdminUsersNew() {
  const t = await getTranslations("adminUsers");

  return (
    <section className="flex flex-col gap-4">
      <LinkButton href="/admin/users" variant="ghost" className="self-start">
        {t("back")}
      </LinkButton>

      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {t("createTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreateAdminUserForm />
        </CardContent>
      </Card>
    </section>
  );
}
