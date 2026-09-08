"use client";

import { useTranslations } from "next-intl";

import { SubscriptionRequiredNotice } from "@/features/subscription";
import { getErrorMessage } from "@/shared/api";
import { isSubscriptionRequiredError } from "@/shared/lib/is-subscription-required-error";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { ErrorPageElement } from "@/shared/ui/error-page-element";
import { PageBreadcrumbs } from "@/shared/ui/page-breadcrumbs";
import { PageTitle } from "@/shared/ui/page-title";
import { Show } from "@/shared/ui/show";

import { useLessonMaterials } from "../model/use-lesson-materials";
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
  const progressQuery = useLessonProgress(lessonId, lessonPage.canAccess);
  const materialsQuery = useLessonMaterials(lessonId, {
    enabled: lessonPage.canAccess,
  });

  return (
    <AsyncWrapper
      isLoading={lessonPage.isLoading}
      isError={lessonPage.isError}
      data={lessonPage.lesson}
      errorSlot={
        <ErrorPageElement
          layout="inline"
          title={t("errors.loadFailed")}
          description={getErrorMessage(
            lessonPage.error,
            t("errors.loadFailed"),
          )}
          retryLabel={tCourses("retry")}
          onRetry={() => {
            lessonPage.refetchCourse();
            lessonPage.refetchSubscription();
          }}
        />
      }
    >
      {(currentLesson) => (
        <Show
          when={lessonPage.canAccess}
          fallback={<SubscriptionRequiredNotice />}
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
              <PageTitle>{currentLesson.title}</PageTitle>
              <Show when={progressQuery.data?.completed === true}>
                <p className="text-sm text-muted-foreground">
                  {t("completed")}
                </p>
              </Show>
            </div>

            <LessonPlayback
              lessonId={lessonId}
              canAccess={lessonPage.canAccess}
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

            <AsyncWrapper
              isLoading={materialsQuery.isLoading}
              isError={materialsQuery.isError}
              data={materialsQuery.data}
              errorSlot={
                isSubscriptionRequiredError(materialsQuery.error) ? (
                  <SubscriptionRequiredNotice />
                ) : (
                  <ErrorAlert
                    errorMessage={getErrorMessage(
                      materialsQuery.error,
                      t("errors.materialsLoadFailed"),
                    )}
                  />
                )
              }
            >
              {(materials) => <LessonMaterials materials={materials} />}
            </AsyncWrapper>

            <LessonPlayerActions
              slug={slug}
              currentLesson={currentLesson}
              nextLesson={lessonPage.nextLesson}
              isLessonCompleted={progressQuery.data?.completed === true}
            />
          </div>
        </Show>
      )}
    </AsyncWrapper>
  );
}
