"use client";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorPageElement } from "@/shared/ui/error-page-element";
import { PageBreadcrumbs } from "@/shared/ui/page-breadcrumbs";
import { Show } from "@/shared/ui/show";

import { useLessonPage } from "../model/use-lesson-page";
import { useLessonProgress } from "../model/use-lesson-progress";
import { LessonMaterials } from "./lesson-materials";
import { LessonPlayback } from "./lesson-playback";
import { LessonPlayerActions } from "./lesson-player-actions";

type LessonPlayerProps = {
  slug: string;
  lessonId: string;
};

export function LessonPlayer({ slug, lessonId }: LessonPlayerProps) {
  const t = useTranslations("lessonPlayer");
  const tCourses = useTranslations("courses");
  const tSidebar = useTranslations("dashboardSidebar");
  const lessonPage = useLessonPage(slug, lessonId);
  const progressQuery = useLessonProgress(lessonId, lessonPage.lesson != null);

  return (
    <AsyncWrapper
      isLoading={lessonPage.isLoading}
      isError={lessonPage.isError}
      data={lessonPage.lesson}
      errorSlot={
        <ErrorPageElement
          title={t("errors.loadFailed")}
          description={getErrorMessage(
            lessonPage.error,
            t("errors.loadFailed"),
          )}
          retryLabel={tCourses("retry")}
          onRetry={() => {
            lessonPage.refetchCourse();
            lessonPage.refetchEnrollments();
          }}
        />
      }
    >
      {(currentLesson) => (
        <Show
          when={lessonPage.canAccess}
          fallback={
            <ErrorPageElement
              title={tCourses("accessDeniedTitle")}
              description={tCourses("accessDeniedDescription")}
              homeLabel={tCourses("backToCourses")}
              homeHref="/dashboard/courses"
            />
          }
        >
          <div className="flex flex-col gap-6">
            <PageBreadcrumbs
              items={[
                {
                  label: tSidebar("allCourses"),
                  href: "/dashboard/courses",
                },
                {
                  label: lessonPage.course?.title ?? t("courseFallback"),
                  href: `/dashboard/courses/${slug}`,
                },
                { label: currentLesson.title },
              ]}
            />

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">{currentLesson.title}</h1>
              <Show when={progressQuery.data?.completed === true}>
                <p className="text-sm text-muted-foreground">
                  {t("completed")}
                </p>
              </Show>
            </div>

            <LessonPlayback
              lessonId={lessonId}
              progress={progressQuery.data ?? null}
            />

            <Show
              when={
                currentLesson.description != null &&
                currentLesson.description.length > 0
              }
            >
              <p className="max-w-3xl text-sm text-muted-foreground">
                {currentLesson.description}
              </p>
            </Show>

            <LessonMaterials materials={currentLesson.materials} />

            <LessonPlayerActions
              slug={slug}
              currentLesson={currentLesson}
              nextLesson={lessonPage.nextLesson}
            />
          </div>
        </Show>
      )}
    </AsyncWrapper>
  );
}
