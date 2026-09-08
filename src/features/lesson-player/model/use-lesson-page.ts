"use client";

import { useMemo } from "react";

import type { CourseDetail, CourseLesson } from "@/entities/course";
import { useCourseAccess } from "@/entities/course";

type UseLessonPageResult = {
  course: CourseDetail | undefined;
  lesson: CourseLesson | undefined;
  nextLesson: CourseLesson | undefined;
  canAccess: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetchCourse: () => void;
  refetchEnrollments: () => void;
};

export function useLessonPage(slug: string, lessonId: string): UseLessonPageResult {
  const access = useCourseAccess(slug);

  const { lesson, nextLesson } = useMemo(() => {
    const lessons = access.course?.lessons ?? [];
    const sortedLessons = [...lessons].sort(
      (left, right) => left.order - right.order,
    );
    const currentLesson = sortedLessons.find((item) => item.id === lessonId);
    const currentIndex = sortedLessons.findIndex((item) => item.id === lessonId);

    return {
      lesson: currentLesson,
      nextLesson: sortedLessons[currentIndex + 1],
    };
  }, [access.course?.lessons, lessonId]);

  return {
    course: access.course,
    lesson,
    nextLesson,
    canAccess: access.canAccess,
    isLoading: access.isLoading,
    isError: access.isError || (!access.isLoading && lesson == null),
    error: access.error,
    refetchCourse: () => {
      void access.refetchCourse();
    },
    refetchEnrollments: () => {
      void access.refetchEnrollments();
    },
  };
}
