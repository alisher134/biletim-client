"use client";

import {
  BookOpenIcon,
  FlameIcon,
  GraduationCapIcon,
  TimerIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import type { UserAnalyticsOverview } from "@/entities/analytics";
import { formatPriceKzt } from "@/entities/subscription";
import { getErrorMessage } from "@/shared/api";
import { formatDuration } from "@/shared/lib/format-duration";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { SectionHeading } from "@/shared/ui/section-heading";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { LinkButton } from "@/shared/ui/link-button";

import { useAnalyticsOverview } from "../model/use-analytics-overview";
import { AnalyticsStatCard } from "./analytics-stat-card";

function formatPercent(value: number | null) {
  if (value == null) return "—";
  return `${value}%`;
}

export function AnalyticsOverview() {
  const t = useTranslations("dashboardAnalytics");
  const { data, isLoading, isError, error } = useAnalyticsOverview();

  return (
    <section className="flex flex-col gap-4">
      <SectionHeading description={t("overview.description")}>
        {t("overview.title")}
      </SectionHeading>

      <AsyncWrapper
        isLoading={isLoading}
        isError={isError}
        data={data}
        errorSlot={
          <ErrorAlert
            errorMessage={getErrorMessage(error, t("errors.loadFailed"))}
          />
        }
      >
        {(overview) => <AnalyticsOverviewContent overview={overview} />}
      </AsyncWrapper>
    </section>
  );
}

type AnalyticsOverviewContentProps = {
  overview: UserAnalyticsOverview;
};

function AnalyticsOverviewContent({ overview }: AnalyticsOverviewContentProps) {
  const t = useTranslations("dashboardAnalytics");

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AnalyticsStatCard
          icon={BookOpenIcon}
          label={t("overview.courses")}
          value={String(overview.courses.active)}
          detail={t("overview.coursesTotal", { total: overview.courses.total })}
        />
        <AnalyticsStatCard
          icon={GraduationCapIcon}
          label={t("overview.lessonsCompleted")}
          value={String(overview.lessons.completed)}
        />
        <AnalyticsStatCard
          icon={TimerIcon}
          label={t("overview.watchTime")}
          value={formatDuration(overview.lessons.watchedSecondsTotal)}
        />
        <AnalyticsStatCard
          icon={FlameIcon}
          label={t("overview.streak")}
          value={String(overview.streakDays)}
          detail={t("overview.streakDays")}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">{t("overview.tests")}</p>
          <p className="mt-1 text-2xl font-semibold">
            {overview.tests.attempts}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("overview.testsDetails", {
              passed: overview.tests.passed,
              passRate: formatPercent(overview.tests.passRate),
              averageScore: formatPercent(overview.tests.averageScore),
            })}
          </p>
        </div>

        <SubscriptionOverviewCard subscription={overview.subscription} />
      </div>
    </div>
  );
}

type SubscriptionOverviewCardProps = {
  subscription: UserAnalyticsOverview["subscription"];
};

function SubscriptionOverviewCard({
  subscription,
}: SubscriptionOverviewCardProps) {
  const t = useTranslations("dashboardAnalytics");
  const activeSubscription = subscription.isActive
    ? subscription.subscription
    : null;

  if (activeSubscription == null) {
    return (
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">
          {t("overview.subscription")}
        </p>
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            {t("overview.subscriptionInactive")}
          </p>
          <LinkButton href="/" variant="outline" size="sm" className="w-fit">
            {t("overview.viewPlans")}
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">{t("overview.subscription")}</p>
      <div className="mt-2 flex flex-col gap-1">
        <p className="font-medium">{activeSubscription.plan.title}</p>
        <p className="text-sm text-muted-foreground">
          {t("overview.subscriptionDetails", {
            days: activeSubscription.remainingDays,
            price: formatPriceKzt(activeSubscription.monthlyPriceKzt),
          })}
        </p>
      </div>
    </div>
  );
}
