"use client";

import { useCallback, useState } from "react";

import { useTranslations } from "next-intl";

import type { StudentLessonTest, TestAttempt } from "@/entities/course";
import { getErrorMessage } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { Show } from "@/shared/ui/show";

import {
  createEmptyAnswers,
  hasUnansweredQuestions,
  toggleAnswer,
  toTestAnswers,
  type AnswerMap,
} from "../lib/answers";
import { useSubmitAttempt } from "../model/use-submit-attempt";
import { TestQuestion } from "./test-question";
import { TestTimer } from "./test-timer";

type TestAttemptFormProps = {
  test: StudentLessonTest;
  attempt: TestAttempt;
  onSubmitted: (attempt: TestAttempt) => void;
};

export function TestAttemptForm({
  test,
  attempt,
  onSubmitted,
}: TestAttemptFormProps) {
  const t = useTranslations("takeTest");
  const { mutate, isPending } = useSubmitAttempt();
  const [answers, setAnswers] = useState<AnswerMap>(() =>
    createEmptyAnswers(test),
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const sortedQuestions = [...test.questions].sort(
    (left, right) => left.order - right.order,
  );

  const handleSubmit = useCallback(() => {
    setSubmitError(null);

    if (hasUnansweredQuestions(test, answers)) {
      setSubmitError(t("errors.unanswered"));
      return;
    }

    mutate(
      { attemptId: attempt.id, answers: toTestAnswers(answers) },
      {
        onSuccess: onSubmitted,
        onError: (error) => {
          setSubmitError(getErrorMessage(error, t("errors.submitFailed")));
        },
      },
    );
  }, [answers, attempt.id, mutate, onSubmitted, t, test]);

  return (
    <div className="flex flex-col gap-6">
      <Show when={test.timeLimit != null}>
        <TestTimer
          startedAt={attempt.startedAt}
          timeLimit={test.timeLimit ?? 0}
          onExpire={handleSubmit}
        />
      </Show>

      <Show when={submitError != null}>
        <ErrorAlert errorMessage={submitError!} />
      </Show>

      <Show
        when={sortedQuestions.length > 0}
        fallback={<p className="text-sm text-muted-foreground">{t("empty")}</p>}
      >
        <div className="flex flex-col gap-4">
          {sortedQuestions.map((question) => (
            <TestQuestion
              key={question.id}
              question={question}
              selectedIds={answers[question.id] ?? []}
              onToggle={(optionId) => {
                setAnswers((current) => ({
                  ...current,
                  [question.id]: toggleAnswer(
                    question,
                    optionId,
                    current[question.id] ?? [],
                  ),
                }));
              }}
            />
          ))}
        </div>
      </Show>

      <Button
        type="button"
        className="self-end"
        disabled={isPending || sortedQuestions.length === 0}
        onClick={handleSubmit}
      >
        {t("submit")}
      </Button>
    </div>
  );
}
