"use client";

import { useTranslations } from "next-intl";

import { SubscriptionRequiredNotice } from "@/features/subscription";
import { getErrorMessage } from "@/shared/api";
import { SUBSCRIPTION_PLANS_HREF } from "@/shared/config/routes";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorPageElement } from "@/shared/ui/error-page-element";
import { LoaderGate } from "@/shared/ui/loader-gate";
import { LinkButton } from "@/shared/ui/link-button";
import { PageBreadcrumbs } from "@/shared/ui/page-breadcrumbs";
import { PageTitle } from "@/shared/ui/page-title";
import { Show } from "@/shared/ui/show";

import { useCoursePage } from "../model/use-course-page";
import { CourseLessons } from "./course-lessons";
import { CourseProgress } from "./course-progress";
import { FavoriteCourseButton } from "./favorite-course-button";

type CourseDetailsProps = {
  slug: string;
};

export function CourseDetails({ slug }: CourseDetailsProps) {
  const t = useTranslations("courses");
  const tSidebar = useTranslations("dashboardSidebar");
  const coursePage = useCoursePage(slug);

  return (
    <AsyncWrapper
      isLoading={coursePage.isLoading}
      isError={coursePage.isError}
      data={coursePage.course}
      errorSlot={
        <ErrorPageElement
          layout="inline"
          title={t("errors.courseLoadFailed")}
          description={getErrorMessage(
            coursePage.error,
            t("errors.courseLoadFailed"),
          )}
          retryLabel={t("retry")}
          onRetry={() => {
            void coursePage.refetch();
          }}
        />
      }
    >
      {(course) => {
        const testsCount = course.lessons.filter(
          (lesson) => lesson.hasTest === true,
        ).length;

        return (
          <div className="flex flex-col gap-6">
            <PageBreadcrumbs
              items={[
                {
                  label: tSidebar("allCourses"),
                  href: "/dashboard/courses",
                },
                { label: course.title },
              ]}
            />

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex flex-col gap-2">
                <PageTitle>{course.title}</PageTitle>
                <p className="text-sm text-muted-foreground">
                  {t("lessonsCount", { count: course.lessons.length })}
                  {" · "}
                  {t("testsCount", { count: testsCount })}
                </p>
                <Show when={course.description != null}>
                  <p className="max-w-2xl text-sm text-muted-foreground">
                    {course.description}
                  </p>
                </Show>
                <Show when={coursePage.myCourse != null} data={coursePage.myCourse}>
                  {(myCourse) => (
                    <div className="mt-1 flex w-full max-w-sm flex-col gap-2">
                      <Show when={myCourse.status === "COMPLETED"}>
                        <p className="text-sm font-medium">{t("completedBadge")}</p>
                      </Show>
                      <Show when={!myCourse.isStarted}>
                        <p className="text-sm text-muted-foreground">
                          {t("notStarted")}
                        </p>
                      </Show>
                      <CourseProgress
                        value={myCourse.isStarted ? myCourse.progress : 0}
                      />
                    </div>
                  )}
                </Show>
              </div>

              <LoaderGate isLoading={coursePage.isAccessLoading}>
                <div className="flex flex-col gap-2 md:items-end">
                  <FavoriteCourseButton
                    courseId={course.id}
                    isFavorite={coursePage.isFavorite}
                  />
                  <Show when={!coursePage.canAccess}>
                    <LinkButton href={SUBSCRIPTION_PLANS_HREF} size="sm">
                      {t("viewPlans")}
                    </LinkButton>
                  </Show>
                </div>
              </LoaderGate>
            </div>

            <Show when={!coursePage.canAccess}>
              <SubscriptionRequiredNotice layout="inline" />
            </Show>

            <CourseLessons
              slug={course.slug}
              lessons={course.lessons}
              canAccess={coursePage.canAccess}
            />
          </div>
        );
      }}
    </AsyncWrapper>
  );
}
