"use client";

import { useRef } from "react";

import { useTranslations } from "next-intl";

import type { UploadPurpose } from "@/entities/course";
import { getErrorMessage } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { showErrorToast, showSuccessToast } from "@/shared/utils";

import { useUploadFile } from "../model/use-upload-file";

type FileUploadButtonProps = {
  purpose: UploadPurpose;
  accept: string;
  courseId?: string;
  lessonId?: string;
  label: string;
  onUploaded: (result: {
    objectKey: string;
    fileName: string;
    fileSize: number;
    duration?: number;
  }) => void;
};

export function FileUploadButton({
  purpose,
  accept,
  courseId,
  lessonId,
  label,
  onUploaded,
}: FileUploadButtonProps) {
  const t = useTranslations("adminCourses");
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadFile();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (file == null) return;

    mutate(
      { file, purpose, courseId, lessonId },
      {
        onSuccess: async (result) => {
          const duration =
            purpose === "video" ? await readVideoDuration(file) : undefined;

          showSuccessToast(t("successUpload"));
          onUploaded({ ...result, duration });
        },
        onError: (error) => {
          showErrorToast(getErrorMessage(error, t("errors.uploadFailed")));
        },
      },
    );
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleChange}
      />
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => inputRef.current?.click()}
      >
        {isPending ? t("uploading") : label}
      </Button>
    </>
  );
}

function readVideoDuration(file: File): Promise<number | undefined> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);

    video.preload = "metadata";
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(
        Number.isFinite(video.duration)
          ? Math.round(video.duration)
          : undefined,
      );
    };
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(undefined);
    };
    video.src = objectUrl;
  });
}
