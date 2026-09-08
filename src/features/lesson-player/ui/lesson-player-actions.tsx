"use client";

import { cn } from "cn";
import { useTranslations } from "next-intl";

import type { StudentCourseLesson } from "@/entities/course";
import { Link } from "@/shared/config/i18n/navigation";
import { buttonVariants } from "@/shared/ui/button";
import { Show } from "@/shared/ui/show";

type LessonPlayerActionsProps = {
  slug: string;
  currentLesson: StudentCourseLesson;
  nextLesson: StudentCourseLesson | undefined;
  isLessonCompleted: boolean;
};

export function LessonPlayerActions({
  slug,
  currentLesson,
  nextLesson,
  isLessonCompleted,
}: LessonPlayerActionsProps) {
  const t = useTranslations("lessonPlayer");

  const hasAvailableTest =
    currentLesson.hasTest === true && currentLesson.testId != null;

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Show when={hasAvailableTest && isLessonCompleted}>
        <Link
          href={`/dashboard/courses/${slug}/lessons/${currentLesson.id}/test`}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          {t("takeTest")}
        </Link>
      </Show>
      <Show when={nextLesson != null}>
        <Link
          href={`/dashboard/courses/${slug}/lessons/${nextLesson?.id}`}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          {t("nextLesson")}
        </Link>
      </Show>
    </div>
  );
}
