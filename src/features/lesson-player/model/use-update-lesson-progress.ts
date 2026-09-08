"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  lessonProgressQueryKey,
  MY_ENROLLMENTS_QUERY_KEY,
  updateLessonProgress,
  type UpdateLessonProgressInput,
} from "@/entities/course";
import {
  CONTINUE_LEARNING_QUERY_KEY,
  COURSE_LEARNING_SUMMARY_QUERY_KEY,
} from "@/entities/learning";

export function useUpdateLessonProgress(lessonId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["lessons", lessonId, "progress", "update"],
    mutationFn: (input: UpdateLessonProgressInput) =>
      updateLessonProgress(lessonId, input),
    onSuccess: (progress) => {
      queryClient.setQueryData(lessonProgressQueryKey(lessonId), progress);

      if (progress.completed) {
        void queryClient.invalidateQueries({
          queryKey: MY_ENROLLMENTS_QUERY_KEY,
        });
        void queryClient.invalidateQueries({
          queryKey: CONTINUE_LEARNING_QUERY_KEY,
        });
        void queryClient.invalidateQueries({
          queryKey: COURSE_LEARNING_SUMMARY_QUERY_KEY,
        });
      }
    },
  });
}
