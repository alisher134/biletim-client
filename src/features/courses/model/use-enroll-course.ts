"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  enrollCourse,
  invalidateCourseQueries,
} from "@/entities/course";

export function useEnrollCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["courses", "enroll"],
    mutationFn: enrollCourse,
    onSuccess: () => {
      invalidateCourseQueries(queryClient);
    },
  });
}
