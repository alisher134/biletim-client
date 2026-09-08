"use client";

import { useCourseLearningSummary } from "@/entities/learning";

import { useCourse } from "../model/use-course";
import { useFavorites } from "../model/use-favorites";
import { useLearningAccess } from "../model/use-learning-access";
import { useMyEnrollments } from "../model/use-my-enrollments";

export function useCoursePage(slug: string) {
  const courseQuery = useCourse(slug);
  const enrollmentsQuery = useMyEnrollments();
  const favoritesQuery = useFavorites();
  const access = useLearningAccess();
  const learningSummaryQuery = useCourseLearningSummary(
    courseQuery.data?.id,
    access.hasAccess,
  );

  const myCourse = enrollmentsQuery.data?.find(
    (item) =>
      item.course.slug === slug || item.course.id === courseQuery.data?.id,
  );
  const isFavorite =
    favoritesQuery.data?.some(
      (item) => item.courseId === courseQuery.data?.id,
    ) === true;
  const isAccessLoading = access.isLoading;

  return {
    course: courseQuery.data,
    myCourse,
    isFavorite,
    canAccess: access.hasAccess,
    nextAction: learningSummaryQuery.data?.nextAction,
    isLearningSummaryLoading: learningSummaryQuery.isLoading,
    isLoading: courseQuery.isLoading,
    isAccessLoading,
    isError: courseQuery.isError,
    error: courseQuery.error,
    refetch: courseQuery.refetch,
  };
}
