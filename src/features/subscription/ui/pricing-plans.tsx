"use client";

import { useTranslations } from "next-intl";

import {
  formatPriceKzt,
  formatPricePerMonthKzt,
  type SubscriptionPlan,
} from "@/entities/subscription";
import { getErrorMessage } from "@/shared/api";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { Show } from "@/shared/ui/show";

import { useSubscriptionPlans } from "../model/use-subscription-plans";
import { PricingCard } from "./pricing-card";

function getFeaturedPlanId(plans: SubscriptionPlan[]) {
  if (plans.length === 0) return null;

  const featuredPlan = plans.reduce((longest, plan) =>
    plan.durationMonths > longest.durationMonths ? plan : longest,
  );

  return featuredPlan.id;
}

export function PricingPlans() {
  const t = useTranslations("home");
  const { data, isLoading, isError, error } = useSubscriptionPlans();
  const featuredPlanId = data == null ? null : getFeaturedPlanId(data);

  return (
    <AsyncWrapper
      isLoading={isLoading}
      isError={isError}
      data={data}
      errorSlot={
        <ErrorAlert
          errorMessage={getErrorMessage(error, t("errors.plansLoadFailed"))}
        />
      }
    >
      {(plans) => (
        <Show
          when={plans.length > 0}
          fallback={
            <EmptyState title={t("plansEmpty")} />
          }
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <li key={plan.id}>
                <PricingCard
                  months={plan.durationMonths}
                  period={plan.title}
                  price={formatPriceKzt(plan.priceKzt)}
                  pricePerMonth={formatPricePerMonthKzt(
                    plan.priceKzt,
                    plan.durationMonths,
                  )}
                  perMonthLabel={t("perMonth")}
                  priceNote={t("priceNote")}
                  cta={t("cta")}
                  href="https://t.me/tarih_pay_bot"
                  featured={plan.id === featuredPlanId}
                />
              </li>
            ))}
          </ul>
        </Show>
      )}
    </AsyncWrapper>
  );
}
