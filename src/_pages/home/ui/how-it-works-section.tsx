import { getTranslations } from "next-intl/server";

import { Card, CardContent } from "@/shared/ui/card";

import { SectionHeader } from "./section-header";

const steps = ["step1", "step2", "step3"] as const;

export async function HowItWorksSection() {
  const t = await getTranslations("home");

  return (
    <section className="mx-auto max-w-5xl space-y-10">
      <SectionHeader
        align="left"
        title={t("howItWorks.title")}
        description={t("howItWorks.description")}
      />

      <Card className="overflow-hidden border">
        <CardContent className="p-0">
          <ol className="divide-y md:flex md:divide-x md:divide-y-0">
            {steps.map((step, index) => (
              <li key={step} className="flex-1 p-6 md:p-8">
                <div className="space-y-3">
                  <span className="font-heading text-5xl font-medium leading-none text-primary/20">
                    {index + 1}
                  </span>
                  <h3 className="font-medium">{t(`howItWorks.${step}.title`)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`howItWorks.${step}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </section>
  );
}
