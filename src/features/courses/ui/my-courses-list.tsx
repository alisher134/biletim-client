"use client";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { Show } from "@/shared/ui/show";

import { useMyEnrollments } from "../model/use-my-enrollments";
import { CourseCard } from "./course-card";

export function MyCoursesList() {
  const t = useTranslations("courses");
  const enrollmentsQuery = useMyEnrollments();

  return (
    <AsyncWrapper
      isLoading={enrollmentsQuery.isLoading}
      isError={enrollmentsQuery.isError}
      data={enrollmentsQuery.data}
      errorSlot={
        <ErrorAlert
          errorMessage={getErrorMessage(
            enrollmentsQuery.error,
            t("errors.loadFailed"),
          )}
        />
      }
    >
      {(items) => (
        <Show
          when={items.length > 0}
          fallback={
            <p className="text-sm text-muted-foreground">
              {t("emptyEnrolled")}
            </p>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const course = item.course;

              if (course == null) return null;

              return (
                <CourseCard
                  key={item.id}
                  course={course}
                  actionHref={`/dashboard/courses/${course.slug}`}
                  actionLabel={t("continue")}
                  progress={item.progress}
                />
              );
            })}
          </div>
        </Show>
      )}
    </AsyncWrapper>
  );
}
