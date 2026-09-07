"use client";

import { type PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "../utils/get-query-client";
import { setupAuthHeader } from "../utils/setup-auth-header";

setupAuthHeader();

export function QueryProvider({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
