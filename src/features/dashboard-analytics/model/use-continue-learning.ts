"use client";

import { useQuery } from "@tanstack/react-query";

import {
  CONTINUE_LEARNING_QUERY_KEY,
  getContinueLearning,
} from "@/entities/learning";
import { getAccessToken } from "@/entities/session";

export function useContinueLearning() {
  return useQuery({
    queryKey: CONTINUE_LEARNING_QUERY_KEY,
    queryFn: getContinueLearning,
    enabled: getAccessToken() != null,
    staleTime: 60 * 1000,
  });
}
