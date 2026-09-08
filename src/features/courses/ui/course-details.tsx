"use client";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorPageElement } from "@/shared/ui/error-page-element";
import { LoaderGate } from "@/shared/ui/loader-gate";
import { PageBreadcrumbs } from "@/shared/ui/page-breadcrumbs";
import { Show } from "@/shared/ui/show";

import { useCoursePage } from "../model/use-course-page";
import { CourseLessons } from "./course-lessons";
import { CourseProgress } from "./course-progress";
import { EnrollCourseButton } from "./enroll-course-button";
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
          (lesson) => lesson.test != null,
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
                <h1 className="text-2xl font-semibold">{course.title}</h1>
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
                <Show when={coursePage.enrollment != null} data={coursePage.enrollment}>
                  {(enrollment) => (
                    <div className="mt-1 flex w-full max-w-sm flex-col gap-2">
                      <p className="text-sm font-medium">
                        {enrollment.status === "COMPLETED"
                          ? t("completedBadge")
                          : t("enrolledBadge")}
                      </p>
                      <CourseProgress value={enrollment.progress} />
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
                  <Show when={coursePage.enrollment == null}>
                    <EnrollCourseButton courseId={course.id} />
                  </Show>
                </div>
              </LoaderGate>
            </div>

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
