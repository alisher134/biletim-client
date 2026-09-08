"use client";

import { useTranslations } from "next-intl";

import { SubscriptionRequiredNotice } from "@/features/subscription";
import { getErrorMessage } from "@/shared/api";
import { isSubscriptionRequiredError } from "@/shared/lib/is-subscription-required-error";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorAlert } from "@/shared/ui/error-alert";

import { usePlaybackUrl } from "../model/use-playback-url";
import { LessonVideo } from "./lesson-video";

type LessonPlaybackProps = {
  lessonId: string;
  canAccess: boolean;
  progress: import("@/entities/course").UserLessonProgress | null;
};

export function LessonPlayback({
  lessonId,
  canAccess,
  progress,
}: LessonPlaybackProps) {
  const t = useTranslations("lessonPlayer");
  const playbackQuery = usePlaybackUrl(lessonId, canAccess);

  if (
    !playbackQuery.isLoading &&
    !playbackQuery.isError &&
    playbackQuery.data == null
  ) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-xl bg-black text-sm text-white">
        {t("noVideo")}
      </div>
    );
  }

  return (
    <AsyncWrapper
      isLoading={playbackQuery.isLoading}
      isError={playbackQuery.isError}
      data={playbackQuery.data}
      errorSlot={
        isSubscriptionRequiredError(playbackQuery.error) ? (
          <SubscriptionRequiredNotice />
        ) : (
          <ErrorAlert
            errorMessage={getErrorMessage(
              playbackQuery.error,
              t("errors.playbackFailed"),
            )}
          />
        )
      }
    >
      {(playback) => (
        <LessonVideo
          lessonId={lessonId}
          src={playback.downloadUrl}
          progress={progress}
        />
      )}
    </AsyncWrapper>
  );
}
