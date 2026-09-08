"use client";

import { useCourseBySlug } from "@/entities/course";

import { useLearningAccess } from "./use-learning-access";

export function useCourseAccess(slug: string) {
  const courseQuery = useCourseBySlug(slug);
  const access = useLearningAccess();

  return {
    course: courseQuery.data,
    canAccess: access.hasAccess,
    isLoading: courseQuery.isLoading || access.isLoading,
    isError: courseQuery.isError || access.isError,
    error: courseQuery.error ?? access.error,
    refetchCourse: courseQuery.refetch,
    refetchSubscription: access.refetchSubscription,
  };
}
