"use client";

import { useEffect, type ReactNode } from "react";

import { useRouter } from "@/shared/config/i18n/navigation";
import { LoaderGate } from "@/shared/ui/loader-gate";

import { useAuthGate } from "../model/use-auth-gate";
import { AuthGateLoader } from "./auth-gate-loader";

type GuestOnlyProps = {
  children: ReactNode;
};

export function GuestOnly({ children }: GuestOnlyProps) {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthGate();

  useEffect(() => {
    if (isLoading || !isAuthenticated) return;

    router.replace("/dashboard");
  }, [isAuthenticated, isLoading, router]);

  return (
    <LoaderGate
      isLoading={isLoading || isAuthenticated}
      loaderSlot={<AuthGateLoader />}
    >
      {children}
    </LoaderGate>
  );
}
