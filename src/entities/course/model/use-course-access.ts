"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyEnrollments } from "../api/get-my-enrollments";
import { MY_ENROLLMENTS_QUERY_KEY } from "./course-query";
import { useCourseBySlug } from "./use-course-by-slug";

export function useCourseAccess(slug: string) {
  const courseQuery = useCourseBySlug(slug);
  const enrollmentsQuery = useQuery({
    queryKey: MY_ENROLLMENTS_QUERY_KEY,
    queryFn: getMyEnrollments,
  });

  const enrollment = enrollmentsQuery.data?.find(
    (item) => item.courseId === courseQuery.data?.id,
  );

  return {
    course: courseQuery.data,
    enrollment,
    canAccess: enrollment != null,
    isLoading: courseQuery.isLoading || enrollmentsQuery.isLoading,
    isError: courseQuery.isError || enrollmentsQuery.isError,
    error: courseQuery.error ?? enrollmentsQuery.error,
    refetchCourse: courseQuery.refetch,
    refetchEnrollments: enrollmentsQuery.refetch,
  };
}
