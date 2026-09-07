import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/shared/ui/card";
import { LinkButton } from "@/shared/ui/link-button";

export async function CtaSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto max-w-5xl">
      <Card className="border-0 bg-primary text-primary-foreground">
        <CardContent className="flex flex-col items-start gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12">
          <div className="max-w-md space-y-2">
            <h2 className="font-heading text-2xl font-medium tracking-tight md:text-3xl">
              {t("ctaBlock.title")}
            </h2>
            <p className="text-sm text-balance text-primary-foreground/75 md:text-base">
              {t("ctaBlock.description")}
            </p>
          </div>

          <LinkButton
            href="/sign-up"
            size="lg"
            className="shrink-0 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            {t("ctaBlock.button")}
          </LinkButton>
        </CardContent>
      </Card>
    </section>
  );
}
