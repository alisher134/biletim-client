import type { ContinueLearning, LearningNextAction } from "@/entities/learning";

export function getContinueLearningHref(
  courseSlug: string,
  nextAction: LearningNextAction,
) {
  if (nextAction.type === "TEST") {
    return `/dashboard/courses/${courseSlug}/lessons/${nextAction.lessonId}/test`;
  }

  return `/dashboard/courses/${courseSlug}/lessons/${nextAction.lessonId}`;
}

export function getContinueActionLabelKey(
  nextAction: LearningNextAction,
): "continueLesson" | "continueTest" {
  return nextAction.type === "TEST" ? "continueTest" : "continueLesson";
}

export type ContinueLearningCardData = ContinueLearning;
