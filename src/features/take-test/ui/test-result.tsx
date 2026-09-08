"use client";

import { useTranslations } from "next-intl";

import type { TestAttempt } from "@/entities/course";
import { LinkButton } from "@/shared/ui/link-button";
import { SectionHeading } from "@/shared/ui/section-heading";

type TestResultProps = {
  attempt: TestAttempt;
  courseHref: string;
  passingScore: number;
};

export function TestResult({
  attempt,
  courseHref,
  passingScore,
}: TestResultProps) {
  const t = useTranslations("takeTest");

  return (
    <section className="flex flex-col items-start gap-4 rounded-xl border border-border p-6">
      <SectionHeading>{t("resultTitle")}</SectionHeading>
      <p className="text-2xl font-semibold">
        {t("score", { score: attempt.score ?? 0 })}
      </p>
      <p className="text-sm text-muted-foreground">
        {t("passingScoreResult", { score: passingScore })}
      </p>
      <p className="text-sm text-muted-foreground">
        {attempt.passed ? t("passed") : t("failed")}
      </p>
      <LinkButton href={courseHref}>{t("backToCourse")}</LinkButton>
    </section>
  );
}
