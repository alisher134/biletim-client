"use client";

import { useLocale, useTranslations } from "next-intl";

import { formatPriceKzt } from "@/entities/subscription";
import { getErrorMessage } from "@/shared/api";
import { formatDateTime } from "@/shared/lib/dayjs";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { LinkButton } from "@/shared/ui/link-button";

import { useMySubscription } from "../model/use-my-subscription";

export function MySubscriptionCard() {
  const t = useTranslations("subscription");
  const locale = useLocale();
  const { data, isLoading, isError, error } = useMySubscription();

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>

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
        {(subscriptionState) => {
          const activeSubscription = subscriptionState.isActive
            ? subscriptionState.subscription
            : null;

          if (activeSubscription == null) {
            return (
              <div className="flex flex-col gap-3 rounded-xl border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">{t("inactive")}</p>
                <LinkButton href="/" variant="outline" size="sm" className="w-fit">
                  {t("viewPlans")}
                </LinkButton>
              </div>
            );
          }

          return (
            <div className="flex flex-col gap-3 rounded-xl border p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{activeSubscription.plan.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("statusActive")}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  {formatPriceKzt(activeSubscription.monthlyPriceKzt)} /{" "}
                  {t("month")}
                </p>
              </div>

              <dl className="grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">{t("expiresAt")}</dt>
                  <dd>{formatDateTime(activeSubscription.expiresAt, locale)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("remainingDays")}</dt>
                  <dd>{activeSubscription.remainingDays}</dd>
                </div>
              </dl>
            </div>
          );
        }}
      </AsyncWrapper>
    </section>
  );
}
