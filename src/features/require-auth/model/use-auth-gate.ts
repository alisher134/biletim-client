"use client";

import { getAccessToken, useSession } from "@/entities/session";

export function useAuthGate() {
  const { data: user, isLoading } = useSession();
  const isAuthenticated = user != null && getAccessToken() != null;

  return { isLoading, isAuthenticated };
}
