"use client";

import { useEffect, type ReactNode } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { resetSession } from "@/entities/session";
import { useRouter } from "@/shared/config/i18n/navigation";

import { useAuthGate } from "../model/use-auth-gate";
import { AuthGateLoader } from "./auth-gate-loader";

type AuthGateMode = "require-auth" | "guest-only" | "require-admin";

type AuthGateProps = {
  children: ReactNode;
  mode: AuthGateMode;
};

export function AuthGate({ children, mode }: AuthGateProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isLoading, isAuthenticated, isAdmin, isSessionError } = useAuthGate();

  const needsAuth = mode === "require-auth" || mode === "require-admin";
  const redirectTo = getRedirectTo({
    mode,
    isLoading,
    isAuthenticated,
    isAdmin,
  });

  useEffect(() => {
    if (isSessionError) {
      resetSession(queryClient);

      if (needsAuth) {
        router.replace("/sign-in");
      }

      return;
    }

    if (redirectTo == null) return;

    router.replace(redirectTo);
  }, [isSessionError, needsAuth, redirectTo, queryClient, router]);

  if (isLoading || redirectTo != null || (isSessionError && needsAuth)) {
    return <AuthGateLoader />;
  }

  return children;
}

function getRedirectTo({
  mode,
  isLoading,
  isAuthenticated,
  isAdmin,
}: {
  mode: AuthGateMode;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}) {
  if (isLoading) return null;
  if (mode === "guest-only" && isAuthenticated) return "/dashboard";
  if (mode === "require-auth" && !isAuthenticated) return "/sign-in";
  if (mode === "require-admin" && !isAuthenticated) return "/sign-in";
  if (mode === "require-admin" && !isAdmin) return "/dashboard";

  return null;
}
