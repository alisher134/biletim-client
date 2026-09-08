"use client";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { useCourseAccess } from "@/entities/course";
import type { StudentLessonTest, TestAttempt } from "@/entities/course";
import { getErrorMessage } from "@/shared/api";
import { AsyncWrapper } from "@/shared/ui/async-wrapper";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { ErrorPageElement } from "@/shared/ui/error-page-element";
import {
  PageBreadcrumbs,
  type PageBreadcrumbItem,
} from "@/shared/ui/page-breadcrumbs";
import { Show } from "@/shared/ui/show";

import { useStartAttempt } from "../model/use-start-attempt";
import { useTest } from "../model/use-test";
import { TestAttemptForm } from "./test-attempt-form";
import { TestResult } from "./test-result";

type TakeTestProps = {
  slug: string;
  testId: string;
};

function getTestViewState(attempt: TestAttempt | null) {
  if (attempt == null) return "loading";
  if (attempt.completedAt != null) return "result";

  return "form";
}

export function TakeTest({ slug, testId }: TakeTestProps) {
  const t = useTranslations("takeTest");
  const tSidebar = useTranslations("dashboardSidebar");
  const tCourses = useTranslations("courses");
  const access = useCourseAccess(slug);
  const testQuery = useTest(testId);
  const startAttempt = useStartAttempt(testId);
  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [result, setResult] = useState<TestAttempt | null>(null);
  const hasStartedRef = useRef(false);
  const activeAttempt = result ?? attempt;
  const viewState = getTestViewState(activeAttempt);
  const lesson = access.course?.lessons.find(
    (item) => item.test?.id === testId,
  );
  const breadcrumbItems: PageBreadcrumbItem[] = [
    { label: tSidebar("allCourses"), href: "/dashboard/courses" },
    {
      label: access.course?.title ?? t("courseFallback"),
      href: `/dashboard/courses/${slug}`,
    },
  ];

  if (lesson != null) {
    breadcrumbItems.push({
      label: lesson.title,
      href: `/dashboard/courses/${slug}/lessons/${lesson.id}`,
    });
  }

  breadcrumbItems.push({
    label: testQuery.data?.title ?? t("testFallback"),
  });

  useEffect(() => {
    if (testQuery.data == null || !access.canAccess || hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    startAttempt.mutate(undefined, {
      onSuccess: setAttempt,
    });
  }, [access.canAccess, startAttempt, testQuery.data]);

  return (
    <div className="flex flex-col gap-6">
      <PageBreadcrumbs items={breadcrumbItems} />

      <AsyncWrapper
        isLoading={access.isLoading}
        isError={access.isError}
        data={access.course}
        errorSlot={
          <ErrorPageElement
            title={tCourses("errors.courseLoadFailed")}
            description={getErrorMessage(
              access.error,
              tCourses("errors.courseLoadFailed"),
            )}
            retryLabel={tCourses("retry")}
            onRetry={() => {
              void access.refetchCourse();
              void access.refetchEnrollments();
            }}
          />
        }
      >
        {() => (
          <Show
            when={access.canAccess}
            fallback={
              <ErrorPageElement
                title={tCourses("accessDeniedTitle")}
                description={tCourses("accessDeniedDescription")}
                homeLabel={tCourses("backToCourses")}
                homeHref="/dashboard/courses"
              />
            }
          >
            <AsyncWrapper
              isLoading={testQuery.isLoading}
              isError={testQuery.isError}
              data={testQuery.data}
              errorSlot={
                <ErrorPageElement
                  title={t("errors.loadFailed")}
                  description={getErrorMessage(
                    testQuery.error,
                    t("errors.loadFailed"),
                  )}
                  retryLabel={tCourses("retry")}
                  onRetry={() => {
                    void testQuery.refetch();
                  }}
                />
              }
            >
              {(test: StudentLessonTest) => (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold">{test.title}</h1>
                    <Show
                      when={
                        test.description != null && test.description.length > 0
                      }
                    >
                      <p className="text-sm text-muted-foreground">
                        {test.description}
                      </p>
                    </Show>
                  </div>

                  <Show when={startAttempt.isPending || viewState === "loading"}>
                    <p className="text-sm text-muted-foreground">
                      {t("startingAttempt")}
                    </p>
                  </Show>

                  <Show when={startAttempt.isError}>
                    <ErrorAlert
                      errorMessage={getErrorMessage(
                        startAttempt.error,
                        t("errors.startFailed"),
                      )}
                    />
                  </Show>

                  <Show when={viewState === "form" && activeAttempt != null}>
                    <TestAttemptForm
                      test={test}
                      attempt={activeAttempt!}
                      onSubmitted={setResult}
                    />
                  </Show>

                  <Show when={viewState === "result" && activeAttempt != null}>
                    <TestResult
                      attempt={activeAttempt!}
                      courseHref={`/dashboard/courses/${slug}`}
                    />
                  </Show>
                </div>
              )}
            </AsyncWrapper>
          </Show>
        )}
      </AsyncWrapper>
    </div>
  );
}
