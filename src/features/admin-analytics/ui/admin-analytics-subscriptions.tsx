"use client";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { SectionHeading } from "@/shared/ui/section-heading";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { Show } from "@/shared/ui/show";

import { useAdminAnalyticsSubscriptions } from "../model/use-admin-analytics-subscriptions";

export function AdminAnalyticsSubscriptionsSection() {
  const t = useTranslations("adminAnalytics");
  const { data, isLoading, isError, error } = useAdminAnalyticsSubscriptions();

  return (
    <section className="flex flex-col gap-4">
      <SectionHeading description={t("subscriptions.description")}>
        {t("subscriptions.title")}
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
        {(subscriptionsAnalytics) => (
          <div className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <SubscriptionStat
                label={t("subscriptions.active")}
                value={subscriptionsAnalytics.totals.active}
              />
              <SubscriptionStat
                label={t("subscriptions.expiring7Days")}
                value={subscriptionsAnalytics.totals.expiringIn7Days}
              />
              <SubscriptionStat
                label={t("subscriptions.expiring30Days")}
                value={subscriptionsAnalytics.totals.expiringIn30Days}
              />
              <SubscriptionStat
                label={t("subscriptions.grantedInPeriod")}
                value={subscriptionsAnalytics.totals.grantedInPeriod}
              />
              <SubscriptionStat
                label={t("subscriptions.cancelled")}
                value={subscriptionsAnalytics.totals.cancelled}
              />
              <SubscriptionStat
                label={t("subscriptions.expired")}
                value={subscriptionsAnalytics.totals.expired}
              />
            </div>

            <Show when={subscriptionsAnalytics.byPlan.length > 0}>
              <div className="rounded-xl border p-4">
                <p className="mb-3 font-medium">{t("subscriptions.byPlan")}</p>
                <ul className="flex flex-col gap-2">
                  {subscriptionsAnalytics.byPlan.map((item) => (
                    <li
                      key={item.plan.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{item.plan.title ?? item.plan.slug ?? item.plan.id}</span>
                      <span className="font-medium">{item.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Show>
          </div>
        )}
      </AsyncWrapper>
    </section>
  );
}

type SubscriptionStatProps = {
  label: string;
  value: number;
};

function SubscriptionStat({ label, value }: SubscriptionStatProps) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
