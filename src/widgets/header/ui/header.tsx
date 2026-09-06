import { ChangeLanguage } from "@/features/change-language";
import { ChangeRegion } from "@/features/change-region";
import { Container } from "@/shared/ui/container";
import { LinkButton } from "@/shared/ui/link-button";

export function Header() {
  return (
    <header className="py-1 border-b">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LinkButton
              variant="ghost"
              href="/"
              className="text-lg font-semibold"
            >
              biletim.kz
            </LinkButton>

            <ChangeRegion />
          </div>

          <div className="flex items-center gap-2">
            <ChangeLanguage />

            <LinkButton href="/login">Войти</LinkButton>
          </div>
        </div>
      </Container>
    </header>
  );
}
