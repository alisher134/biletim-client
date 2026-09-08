"use client";

import { useTranslations } from "next-intl";

import type { LessonTest } from "@/entities/course";
import { Show } from "@/shared/ui/show";

import { AdminExistingTest } from "./admin-existing-test";
import { CreateTestDialog } from "./create-test-dialog";

type AdminLessonTestProps = {
  courseId: string;
  lessonId: string;
  test: LessonTest | null;
};

export function AdminLessonTest({
  courseId,
  lessonId,
  test,
}: AdminLessonTestProps) {
  const t = useTranslations("adminCourses");

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{t("test")}</h2>

      <Show
        when={test != null}
        fallback={
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-muted-foreground">{t("noTest")}</p>
            <CreateTestDialog courseId={courseId} lessonId={lessonId} />
          </div>
        }
      >
        <AdminExistingTest courseId={courseId} test={test!} />
      </Show>
    </section>
  );
}
