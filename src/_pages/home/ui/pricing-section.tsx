import { getTranslations } from "next-intl/server";

import { PricingPlans } from "@/features/subscription";
import { Card, CardContent } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import { SectionHeader } from "./section-header";

const accessItems = ["access1", "access2", "access3"] as const;

export async function PricingSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto max-w-5xl" id="pricing">
      <div className="space-y-10 rounded-xl border bg-card p-6 md:p-10">
        <SectionHeader
          align="left"
          label={t("pricingLabel")}
          title={t("title")}
          description={t("description")}
        />

        <Card className="border bg-muted/40">
          <CardContent className="flex flex-col items-center gap-3 py-4 sm:flex-row sm:justify-center sm:gap-0">
            {accessItems.map((item, index) => (
              <div key={item} className="flex items-center gap-3 sm:gap-0">
                {index > 0 ? (
                  <Separator
                    orientation="vertical"
                    className="hidden h-4 sm:mx-5 sm:block"
                  />
                ) : null}
                <span className="text-sm">{t(item)}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <PricingPlans />
      </div>
    </section>
  );
}
