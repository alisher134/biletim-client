"use client";

import { useQuery } from "@tanstack/react-query";

import { getTest, testDetailQueryKey } from "@/entities/course";

export function useTest(testId: string) {
  return useQuery({
    queryKey: testDetailQueryKey(testId),
    queryFn: () => getTest(testId),
    enabled: testId.length > 0,
  });
}
