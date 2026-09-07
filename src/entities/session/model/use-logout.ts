"use client";

import { useQueryClient } from "@tanstack/react-query";

import { resetSession } from "../lib/apply-session";

export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    resetSession(queryClient);
  };
}
