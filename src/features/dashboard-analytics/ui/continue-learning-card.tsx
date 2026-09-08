"use client";

import { PlayCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { formatDuration } from "@/shared/lib/format-duration";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { LinkButton } from "@/shared/ui/link-button";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/shared/ui/progress";
import { Show } from "@/shared/ui/show";

import {
  getContinueActionLabelKey,
  getContinueLearningHref,
} from "../lib/continue-learning";
import { useContinueLearning } from "../model/use-continue-learning";

export function ContinueLearningCard() {
  const t = useTranslations("dashboardAnalytics");
  const { data, isLoading, isError, isSuccess, error } = useContinueLearning();

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">{t("continue.title")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("continue.description")}
        </p>
      </div>

      <AsyncWrapper
        isLoading={isLoading}
        isError={isError}
        data={isSuccess ? { continueLearning: data } : undefined}
        errorSlot={
          <ErrorAlert
            errorMessage={getErrorMessage(error, t("errors.loadFailed"))}
          />
        }
      >
        {({ continueLearning }) => (
          <Show
            when={continueLearning != null}
            data={continueLearning}
            fallback={
              <EmptyState
                title={t("continue.emptyTitle")}
                description={t("continue.empty")}
                action={
                  <LinkButton
                    href="/dashboard/courses"
                    variant="outline"
                    size="sm"
                  >
                    {t("continue.browseCourses")}
                  </LinkButton>
                }
              />
            }
          >
            {(item) => (
              <div className="flex flex-col gap-4 rounded-xl border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <PlayCircleIcon
                      className="size-5 text-primary"
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">
                      {item.course.title}
                    </p>
                    <p className="font-medium">{item.lesson.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("continue.watched", {
                        watched: formatDuration(item.lesson.watchedSeconds),
                        total: formatDuration(item.lesson.videoDuration),
                      })}
                    </p>
                  </div>
                </div>

                <Progress value={item.course.progress} className="w-full">
                  <ProgressLabel>{t("continue.progress")}</ProgressLabel>
                  <ProgressValue />
                </Progress>

                <LinkButton
                  href={getContinueLearningHref(
                    item.course.slug,
                    item.nextAction,
                  )}
                  className="w-full sm:w-fit"
                >
                  {t(getContinueActionLabelKey(item.nextAction))}
                </LinkButton>
              </div>
            )}
          </Show>
        )}
      </AsyncWrapper>
    </section>
  );
}
