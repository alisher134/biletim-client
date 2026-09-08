"use client";

import { useCourse } from "../model/use-course";
import { useFavorites } from "../model/use-favorites";
import { useMyEnrollments } from "../model/use-my-enrollments";

export function useCoursePage(slug: string) {
  const courseQuery = useCourse(slug);
  const enrollmentsQuery = useMyEnrollments();
  const favoritesQuery = useFavorites();

  const enrollment = enrollmentsQuery.data?.find(
    (item) => item.courseId === courseQuery.data?.id,
  );
  const isFavorite =
    favoritesQuery.data?.some(
      (item) => item.courseId === courseQuery.data?.id,
    ) === true;
  const isAccessLoading =
    enrollmentsQuery.isLoading || favoritesQuery.isLoading;

  return {
    course: courseQuery.data,
    enrollment,
    isFavorite,
    canAccess: enrollment != null,
    isLoading: courseQuery.isLoading,
    isAccessLoading,
    isError: courseQuery.isError,
    error: courseQuery.error,
    refetch: courseQuery.refetch,
  };
}
