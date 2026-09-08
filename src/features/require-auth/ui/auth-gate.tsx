"use client";

import { useEffect, type ReactNode } from "react";

import { useTranslations } from "next-intl";

import { useRouter } from "@/shared/config/i18n/navigation";
import { Button } from "@/shared/ui/button";
import { ErrorAlert } from "@/shared/ui/error-alert";

import { useAuthGate } from "../model/use-auth-gate";
import { AuthGateLoader } from "./auth-gate-loader";

type AuthGateMode = "require-auth" | "guest-only" | "require-admin";

type AuthGateProps = {
  children: ReactNode;
  mode: AuthGateMode;
};

export function AuthGate({ children, mode }: AuthGateProps) {
  const t = useTranslations("requireAuth");
  const router = useRouter();
  const { isLoading, isAuthenticated, isAdmin, isSessionError, refetch } =
    useAuthGate();

  const needsAuth = mode === "require-auth" || mode === "require-admin";
  const redirectTo = getRedirectTo({
    mode,
    isLoading,
    isSessionError,
    isAuthenticated,
    isAdmin,
  });

  useEffect(() => {
    if (redirectTo == null) return;

    router.replace(redirectTo);
  }, [redirectTo, router]);

  if (isSessionError && needsAuth) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4">
        <ErrorAlert errorMessage={t("sessionError")} />
        <Button type="button" onClick={() => refetch()}>
          {t("retry")}
        </Button>
      </div>
    );
  }

  if (isLoading || redirectTo != null) {
    return <AuthGateLoader />;
  }

  return children;
}

function getRedirectTo({
  mode,
  isLoading,
  isSessionError,
  isAuthenticated,
  isAdmin,
}: {
  mode: AuthGateMode;
  isLoading: boolean;
  isSessionError: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}) {
  if (isLoading || isSessionError) return null;
  if (mode === "guest-only" && isAuthenticated) return "/dashboard";
  if (mode === "require-auth" && !isAuthenticated) return "/sign-in";
  if (mode === "require-admin" && !isAuthenticated) return "/sign-in";
  if (mode === "require-admin" && !isAdmin) return "/dashboard";

  return null;
}
