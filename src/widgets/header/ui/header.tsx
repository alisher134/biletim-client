import { getTranslations } from "next-intl/server";

import { ChangeLanguage } from "@/features/change-language";
import { Container } from "@/shared/ui/container";
import { LinkButton } from "@/shared/ui/link-button";
import { AppLogo } from "@/shared/ui/app-logo";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="py-4 border-b">
      <Container>
        <div className="flex items-center justify-between">
          <AppLogo />

          <div className="flex items-center gap-2">
            <ChangeLanguage />

            <LinkButton href="/sign-in">{t("login")}</LinkButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
