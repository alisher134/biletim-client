"use client";

import { useTranslations } from "next-intl";

import type { LessonTest } from "@/entities/course";
import { getErrorMessage } from "@/shared/api";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorPageElement } from "@/shared/ui/error-page-element";

import { AdminQuestionsTable } from "./admin-questions-table";
import { UpdateAdminTestForm } from "./update-admin-test-form";

type AdminTestDetailsContentProps = {
  courseId: string;
  test: LessonTest | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
};

export function AdminTestDetailsContent({
  courseId,
  test,
  isLoading,
  isError,
  error,
}: AdminTestDetailsContentProps) {
  const t = useTranslations("adminCourses");

  return (
    <AsyncWrapper
      isLoading={isLoading}
      isError={isError}
      data={test}
      errorSlot={
        <ErrorPageElement
          title={t("errors.courseLoadFailed")}
          description={getErrorMessage(error, t("errors.courseLoadFailed"))}
        />
      }
    >
      {(currentTest) => (
        <div className="flex flex-col gap-10">
          <UpdateAdminTestForm courseId={courseId} test={currentTest} />
          <AdminQuestionsTable
            courseId={courseId}
            testId={currentTest.id}
            questions={currentTest.questions}
          />
        </div>
      )}
    </AsyncWrapper>
  );
}
