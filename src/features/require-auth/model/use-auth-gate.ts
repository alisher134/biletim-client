"use client";

import { getAccessToken, useSession } from "@/entities/session";

export function useAuthGate() {
  const { data: user, isLoading, isError, refetch } = useSession();
  const hasToken = getAccessToken() != null;
  const isAuthenticated = user != null && hasToken;
  const isSessionError = isError && hasToken;

  return {
    isLoading,
    isAuthenticated,
    isSessionError,
    refetch,
  };
}
