"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { Show } from "@/shared/ui/show";
import { showSuccessToast } from "@/shared/utils";

import { useEnrollCourse } from "../model/use-enroll-course";

type EnrollCourseButtonProps = {
  courseId: string;
};

export function EnrollCourseButton({ courseId }: EnrollCourseButtonProps) {
  const t = useTranslations("courses");
  const { mutate, isPending } = useEnrollCourse();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleEnroll = () => {
    setSubmitError(null);

    mutate(courseId, {
      onSuccess: () => {
        showSuccessToast(t("successEnroll"));
      },
      onError: (error) => {
        setSubmitError(getErrorMessage(error, t("errors.enrollFailed")));
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <Show when={submitError != null}>
        <ErrorAlert errorMessage={submitError!} />
      </Show>
      <Button type="button" disabled={isPending} onClick={handleEnroll}>
        {t("enroll")}
      </Button>
    </div>
  );
}
