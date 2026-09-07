import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import {
  formatPlanPrice,
  formatPlanPricePerMonth,
  planPricing,
} from "../lib/plan-pricing";

import { PricingCard } from "./pricing-card";
import { SectionHeader } from "./section-header";

const accessItems = ["access1", "access2", "access3"] as const;

export async function PricingSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto max-w-5xl">
      <div className="space-y-10 rounded-2xl border bg-card p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] md:p-10">
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

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {planPricing.map((plan) => (
            <li key={plan.id}>
              <PricingCard
                months={plan.months}
                period={t(`${plan.id}.period`)}
                price={formatPlanPrice(plan.price)}
                pricePerMonth={formatPlanPricePerMonth(
                  plan.price,
                  plan.months,
                )}
                perMonthLabel={t("perMonth")}
                priceNote={t("priceNote")}
                cta={t("cta")}
                href={plan.href}
                featured={"featured" in plan && plan.featured}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
