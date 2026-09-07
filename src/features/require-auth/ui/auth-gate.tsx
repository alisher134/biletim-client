"use client";

import { useEffect, type ReactNode } from "react";

import { useTranslations } from "next-intl";

import { useRouter } from "@/shared/config/i18n/navigation";
import { Button } from "@/shared/ui/button";
import { ErrorAlert } from "@/shared/ui/error-alert";

import { useAuthGate } from "../model/use-auth-gate";
import { AuthGateLoader } from "./auth-gate-loader";

type AuthGateMode = "require-auth" | "guest-only";

type AuthGateProps = {
  children: ReactNode;
  mode: AuthGateMode;
};

export function AuthGate({ children, mode }: AuthGateProps) {
  const t = useTranslations("requireAuth");
  const router = useRouter();
  const { isLoading, isAuthenticated, isSessionError, refetch } = useAuthGate();

  const isRequireAuth = mode === "require-auth";
  const shouldRedirect =
    !isLoading &&
    !isSessionError &&
    (isRequireAuth ? !isAuthenticated : isAuthenticated);
  const redirectTo = isRequireAuth ? "/sign-in" : "/dashboard";

  useEffect(() => {
    if (!shouldRedirect) return;

    router.replace(redirectTo);
  }, [redirectTo, router, shouldRedirect]);

  if (isSessionError && isRequireAuth) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4">
        <ErrorAlert errorMessage={t("sessionError")} />
        <Button type="button" onClick={() => refetch()}>
          {t("retry")}
        </Button>
      </div>
    );
  }

  const showLoader = isLoading || shouldRedirect;

  if (showLoader) {
    return <AuthGateLoader />;
  }

  return children;
}
