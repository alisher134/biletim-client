"use client";

import { useQuery } from "@tanstack/react-query";

import { getAccessToken } from "@/entities/session";
import {
  getMySubscription,
  MY_SUBSCRIPTION_QUERY_KEY,
} from "@/entities/subscription";

export function useMySubscription() {
  return useQuery({
    queryKey: MY_SUBSCRIPTION_QUERY_KEY,
    queryFn: getMySubscription,
    enabled: getAccessToken() != null,
    staleTime: 60 * 1000,
  });
}
