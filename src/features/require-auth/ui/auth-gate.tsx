"use client";

import { useEffect, type ReactNode } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { resetSession } from "@/entities/session";
import { usePathname, useRouter, useSearchParams } from "@/shared/config/i18n/navigation";
import { buildSignInHref } from "@/shared/lib/auth-return-url";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, isAuthenticated, isAdmin, isSessionError } = useAuthGate();
  const query = searchParams.toString();
  const currentPath = query.length === 0 ? pathname : `${pathname}?${query}`;

  const needsAuth = mode === "require-auth" || mode === "require-admin";
  const redirectTo = getRedirectTo({
    mode,
    isLoading,
    isAuthenticated,
    isAdmin,
    currentPath,
  });

  useEffect(() => {
    if (isSessionError) {
      resetSession(queryClient);

      if (needsAuth) {
        router.replace(buildSignInHref(currentPath));
      }

      return;
    }

    if (redirectTo == null) return;

    router.replace(redirectTo);
  }, [currentPath, isSessionError, needsAuth, redirectTo, queryClient, router]);

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
  currentPath,
}: {
  mode: AuthGateMode;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentPath: string;
}) {
  if (isLoading) return null;
  if (mode === "guest-only" && isAuthenticated) return "/dashboard";
  if (mode === "require-auth" && !isAuthenticated) {
    return buildSignInHref(currentPath);
  }
  if (mode === "require-admin" && !isAuthenticated) {
    return buildSignInHref(currentPath);
  }
  if (mode === "require-admin" && !isAdmin) return "/dashboard";

  return null;
}
