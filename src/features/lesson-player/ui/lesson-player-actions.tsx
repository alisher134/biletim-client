"use client";

import { cn } from "cn";
import { useTranslations } from "next-intl";

import type { CourseLesson } from "@/entities/course";
import { Link } from "@/shared/config/i18n/navigation";
import { buttonVariants } from "@/shared/ui/button";
import { Show } from "@/shared/ui/show";

type LessonPlayerActionsProps = {
  slug: string;
  currentLesson: CourseLesson;
  nextLesson: CourseLesson | undefined;
};

export function LessonPlayerActions({
  slug,
  currentLesson,
  nextLesson,
}: LessonPlayerActionsProps) {
  const t = useTranslations("lessonPlayer");

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <Show when={currentLesson.test != null}>
        <Link
          href={`/dashboard/courses/${slug}/tests/${currentLesson.test?.id}`}
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
