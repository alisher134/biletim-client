import { getTranslations } from "next-intl/server";

import { ChangeLanguage } from "@/features/change-language";
import { AppLogo } from "@/shared/ui/app-logo";
import { Container } from "@/shared/ui/container";

import { HeaderAuth } from "./header-auth";

export async function Header() {
  const t = await getTranslations("header");

  return (
    <header className="shrink-0 border-b bg-card py-4">
      <Container>
        <div className="flex items-center justify-between">
          <AppLogo />

          <div className="flex items-center gap-2">
            <ChangeLanguage />
            <HeaderAuth loginLabel={t("login")} logoutLabel={t("logout")} />
          </div>
        </div>
      </Container>
    </header>
  );
}
