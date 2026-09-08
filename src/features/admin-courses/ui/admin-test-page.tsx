"use client";

import { useMemo } from "react";

import { useAdminCourse } from "../model/use-admin-course";
import { AdminTestBreadcrumbs } from "./admin-test-breadcrumbs";
import { AdminTestDetailsContent } from "./admin-test-details-content";

type AdminTestPageProps = {
  courseId: string;
  testId: string;
};

export function AdminTestPage({ courseId, testId }: AdminTestPageProps) {
  const { data, isLoading, isError, error } = useAdminCourse(courseId);
  const test = useMemo(
    () =>
      data?.lessons
        .map((lesson) => lesson.test)
        .find((item) => item?.id === testId) ?? undefined,
    [data?.lessons, testId],
  );

  return (
    <div className="flex flex-col gap-4">
      <AdminTestBreadcrumbs
        courseId={courseId}
        testId={testId}
        course={data}
        test={test}
      />
      <AdminTestDetailsContent
        courseId={courseId}
        test={test}
        isLoading={isLoading}
        isError={isError || (!isLoading && test == null)}
        error={error}
      />
    </div>
  );
}
