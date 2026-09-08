"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  lessonProgressQueryKey,
  MY_ENROLLMENTS_QUERY_KEY,
  updateLessonProgress,
  type UpdateLessonProgressInput,
} from "@/entities/course";

export function useUpdateLessonProgress(lessonId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["lessons", lessonId, "progress", "update"],
    mutationFn: (input: UpdateLessonProgressInput) =>
      updateLessonProgress(lessonId, input),
    onSuccess: (progress) => {
      queryClient.setQueryData(lessonProgressQueryKey(lessonId), progress);

      if (progress.completed) {
        queryClient.invalidateQueries({ queryKey: MY_ENROLLMENTS_QUERY_KEY });
      }
    },
  });
}
