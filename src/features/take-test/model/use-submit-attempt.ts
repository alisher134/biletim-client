"use client";

import { useMutation } from "@tanstack/react-query";

import { submitTestAttempt, type TestAnswerInput } from "@/entities/course";

export function useSubmitAttempt() {
  return useMutation({
    mutationKey: ["tests", "attempt", "submit"],
    mutationFn: ({
      attemptId,
      answers,
    }: {
      attemptId: string;
      answers: TestAnswerInput[];
    }) => submitTestAttempt(attemptId, answers),
  });
}
