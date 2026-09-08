"use client";

import { useTranslations } from "next-intl";

import { TelegramPurchaseButton } from "@/features/subscription";
import { useLearningAccess } from "@/features/courses";
import { getLocalizedApiErrorMessage } from "@/shared/api";
import { SUBSCRIPTION_PLANS_HREF } from "@/shared/config/routes";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { LinkButton } from "@/shared/ui/link-button";
import { Show } from "@/shared/ui/show";

import { useMyEnrollments } from "../model/use-my-enrollments";
import { CourseCard } from "./course-card";

export function MyCoursesList() {
  const t = useTranslations("courses");
  const tErrors = useTranslations("errors");
  const enrollmentsQuery = useMyEnrollments();
  const { hasAccess } = useLearningAccess();

  return (
    <AsyncWrapper
      isLoading={enrollmentsQuery.isLoading}
      isError={enrollmentsQuery.isError}
      data={enrollmentsQuery.data}
      errorSlot={
        <ErrorAlert
          errorMessage={getLocalizedApiErrorMessage(
            enrollmentsQuery.error,
            (code) => tErrors(`apiCodes.${code}`),
            t("errors.loadFailed"),
          )}
        />
      }
    >
      {(items) => (
        <Show
          when={items.length > 0}
          fallback={
            <EmptyState
              title={
                hasAccess ? t("emptyEnrolledTitle") : t("emptyNoSubscriptionTitle")
              }
              description={
                hasAccess ? t("emptyEnrolled") : t("emptyNoSubscription")
              }
              action={
                hasAccess ? (
                  <LinkButton
                    href="/dashboard/courses"
                    variant="outline"
                    size="sm"
                  >
                    {t("browseCourses")}
                  </LinkButton>
                ) : (
                  <TelegramPurchaseButton size="sm" variant="outline">
                    {t("subscribe")}
                  </TelegramPurchaseButton>
                )
              }
            />
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const course = item.course;
              const progress = item.isStarted ? item.progress : 0;
              const meta = item.isStarted
                ? item.status === "COMPLETED"
                  ? t("completedBadge")
                  : undefined
                : t("notStarted");

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  actionHref={
                    hasAccess
                      ? `/dashboard/courses/${course.slug}`
                      : SUBSCRIPTION_PLANS_HREF
                  }
                  actionLabel={hasAccess ? t("continue") : t("viewPlans")}
                  meta={meta}
                  progress={progress}
                />
              );
            })}
          </div>
        </Show>
      )}
    </AsyncWrapper>
  );
}
