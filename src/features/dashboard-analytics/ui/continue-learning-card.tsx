"use client";

import { PlayCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { formatDuration } from "@/shared/lib/format-duration";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { LinkButton } from "@/shared/ui/link-button";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/shared/ui/progress";

import {
  getContinueActionLabelKey,
  getContinueLearningHref,
} from "../lib/continue-learning";
import { useContinueLearning } from "../model/use-continue-learning";

export function ContinueLearningCard() {
  const t = useTranslations("dashboardAnalytics");
  const { data, isLoading, isError, error } = useContinueLearning();

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
        data={data}
        errorSlot={
          <ErrorAlert
            errorMessage={getErrorMessage(error, t("errors.loadFailed"))}
          />
        }
      >
        {(continueLearning) => {
          if (continueLearning == null) {
            return (
              <div className="rounded-xl border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  {t("continue.empty")}
                </p>
                <LinkButton
                  href="/dashboard/courses"
                  variant="outline"
                  size="sm"
                  className="mt-3 w-fit"
                >
                  {t("continue.browseCourses")}
                </LinkButton>
              </div>
            );
          }

          return (
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
                    {continueLearning.course.title}
                  </p>
                  <p className="font-medium">{continueLearning.lesson.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("continue.watched", {
                      watched: formatDuration(
                        continueLearning.lesson.watchedSeconds,
                      ),
                      total: formatDuration(
                        continueLearning.lesson.videoDuration,
                      ),
                    })}
                  </p>
                </div>
              </div>

              <Progress value={continueLearning.course.progress} className="w-full">
                <ProgressLabel>{t("continue.progress")}</ProgressLabel>
                <ProgressValue />
              </Progress>

              <LinkButton
                href={getContinueLearningHref(
                  continueLearning.course.slug,
                  continueLearning.nextAction,
                )}
                className="w-full sm:w-fit"
              >
                {t(getContinueActionLabelKey(continueLearning.nextAction))}
              </LinkButton>
            </div>
          );
        }}
      </AsyncWrapper>
    </section>
  );
}
