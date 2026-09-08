"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  MY_ENROLLMENTS_QUERY_KEY,
  submitTestAttempt,
  type TestAnswerInput,
} from "@/entities/course";
import {
  CONTINUE_LEARNING_QUERY_KEY,
  COURSE_LEARNING_SUMMARY_QUERY_KEY,
} from "@/entities/learning";

export function useSubmitAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["tests", "attempt", "submit"],
    mutationFn: ({
      attemptId,
      answers,
    }: {
      attemptId: string;
      answers: TestAnswerInput[];
    }) => submitTestAttempt(attemptId, answers),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: MY_ENROLLMENTS_QUERY_KEY,
      });
      void queryClient.invalidateQueries({
        queryKey: CONTINUE_LEARNING_QUERY_KEY,
      });
      void queryClient.invalidateQueries({
        queryKey: COURSE_LEARNING_SUMMARY_QUERY_KEY,
      });
    },
  });
}
