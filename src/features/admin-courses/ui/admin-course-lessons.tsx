"use client";

import { GripVerticalIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { CourseLesson } from "@/entities/course";
import { getErrorMessage } from "@/shared/api";
import type { GenerateCopyParent } from "@/shared/lib/generate-copy";
import { Button } from "@/shared/ui/button";
import { ConfirmDeleteDialog } from "@/shared/ui/confirm-delete-dialog";
import { EmptyState } from "@/shared/ui/empty-state";
import { LinkButton } from "@/shared/ui/link-button";
import { Show } from "@/shared/ui/show";
import { showSuccessToast } from "@/shared/utils";

import { useDeleteLesson } from "../model/use-delete-lesson";
import { CreateLessonDialog } from "./create-lesson-dialog";

type AdminCourseLessonsProps = {
  courseId: string;
  lessons: CourseLesson[];
  copyParent?: GenerateCopyParent;
};

export function AdminCourseLessons({
  courseId,
  lessons,
  copyParent,
}: AdminCourseLessonsProps) {
  const t = useTranslations("adminCourses");
  const { mutate, isPending } = useDeleteLesson(courseId);
  const sortedLessons = [...lessons].sort(
    (left, right) => left.order - right.order,
  );

  const handleDelete = (lessonId: string) =>
    new Promise<void>((resolve, reject) => {
      mutate(lessonId, {
        onSuccess: () => {
          showSuccessToast(t("successDelete"));
          resolve();
        },
        onError: (error) => {
          reject(new Error(getErrorMessage(error, t("errors.deleteFailed"))));
        },
      });
    });

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{t("lessons")}</h2>

      <Show
        when={sortedLessons.length > 0}
        fallback={
          <EmptyState title={t("emptyLessons")} />
        }
      >
        <ul className="divide-y divide-border rounded-xl border border-border">
          {sortedLessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center gap-3 px-3 py-2.5">
              <GripVerticalIcon
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate font-medium">
                {lesson.title}
              </span>
              <LinkButton
                href={`/admin/courses/${courseId}/lessons/${lesson.id}`}
                variant="outline"
              >
                {t("open")}
              </LinkButton>
              <ConfirmDeleteDialog
                title={t("deleteLessonTitle")}
                description={t("deleteLessonDescription", {
                  title: lesson.title,
                })}
                confirmLabel={t("deleteConfirm")}
                cancelLabel={t("deleteCancel")}
                isPending={isPending}
                onConfirm={() => handleDelete(lesson.id)}
                trigger={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={t("deleteLessonTitle")}
                  >
                    <TrashIcon aria-hidden />
                  </Button>
                }
              />
            </li>
          ))}
        </ul>
      </Show>

      <CreateLessonDialog
        courseId={courseId}
        nextOrder={sortedLessons.length}
        copyParent={copyParent}
      />
    </section>
  );
}
