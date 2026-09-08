"use client";

import { useIsAdmin } from "@/entities/session";
import { useMySubscription } from "@/entities/subscription";

export function useLearningAccess() {
  const subscriptionQuery = useMySubscription();
  const { isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  const hasAccess =
    subscriptionQuery.data?.isActive === true || isAdmin;

  return {
    hasAccess,
    isLoading: subscriptionQuery.isLoading || isAdminLoading,
    isError: subscriptionQuery.isError,
    error: subscriptionQuery.error,
    refetchSubscription: subscriptionQuery.refetch,
  };
}
