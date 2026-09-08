"use client";

import { useCallback, useRef } from "react";

import type { UpdateLessonProgressInput } from "@/entities/course";

import { useUpdateLessonProgress } from "./use-update-lesson-progress";

export function useSerializedLessonProgress(lessonId: string) {
  const { mutateAsync } = useUpdateLessonProgress(lessonId);
  const queueRef = useRef(Promise.resolve());
  const latestInputRef = useRef<UpdateLessonProgressInput | null>(null);

  const saveProgress = useCallback(
    (input: UpdateLessonProgressInput) => {
      latestInputRef.current = input;
      queueRef.current = queueRef.current
        .then(async () => {
          const payload = latestInputRef.current;

          if (payload == null) return;

          await mutateAsync(payload);
        })
        .catch(() => undefined);
    },
    [mutateAsync],
  );

  const flushProgress = useCallback(
    (input: UpdateLessonProgressInput) => {
      latestInputRef.current = input;
      queueRef.current = queueRef.current.then(async () => {
        await mutateAsync(input);
      });

      return queueRef.current;
    },
    [mutateAsync],
  );

  return { saveProgress, flushProgress };
}
