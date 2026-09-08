"use client";

import { cn } from "cn";
import { useTranslations } from "next-intl";

import type { TestAttempt } from "@/entities/course";
import { Link } from "@/shared/config/i18n/navigation";
import { buttonVariants } from "@/shared/ui/button";

type TestResultProps = {
  attempt: TestAttempt;
  courseHref: string;
};

export function TestResult({ attempt, courseHref }: TestResultProps) {
  const t = useTranslations("takeTest");

  return (
    <section className="flex flex-col items-start gap-4 rounded-xl border border-border p-6">
      <h2 className="text-xl font-semibold">{t("resultTitle")}</h2>
      <p className="text-lg font-medium">
        {t("score", { score: attempt.score ?? 0 })}
      </p>
      <p className="text-sm text-muted-foreground">
        {attempt.passed ? t("passed") : t("failed")}
      </p>
      <Link
        href={courseHref}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        {t("backToCourse")}
      </Link>
    </section>
  );
}
