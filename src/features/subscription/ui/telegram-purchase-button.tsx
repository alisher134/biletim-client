"use client";

import { useEffect, type ComponentProps } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import {
  getPurchaseLink,
  MY_SUBSCRIPTION_QUERY_KEY,
} from "@/entities/subscription";
import { useIsAuth } from "@/entities/session";
import { getLocalizedApiErrorMessage } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { LinkButton } from "@/shared/ui/link-button";
import { Show } from "@/shared/ui/show";

type TelegramPurchaseButtonProps = Omit<
  ComponentProps<typeof Button>,
  "onClick"
> & {
  showInstructions?: boolean;
  signInHref?: string;
};

export function TelegramPurchaseButton({
  children,
  showInstructions = false,
  signInHref = "/sign-in",
  ...buttonProps
}: TelegramPurchaseButtonProps) {
  const t = useTranslations("subscription");
  const tErrors = useTranslations("errors");
  const isAuth = useIsAuth();
  const queryClient = useQueryClient();

  const purchaseLinkQuery = useQuery({
    queryKey: ["subscriptions", "purchase-link"],
    queryFn: getPurchaseLink,
    enabled: isAuth,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!isAuth) return;

    const handleFocus = () => {
      queryClient.invalidateQueries({ queryKey: MY_SUBSCRIPTION_QUERY_KEY });
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [isAuth, queryClient]);

  const handlePurchase = () => {
    const url = purchaseLinkQuery.data?.url;
    if (url == null) return;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isAuth) {
    return (
      <LinkButton href={signInHref} variant={buttonProps.variant} size={buttonProps.size}>
        {children ?? t("purchaseInTelegram")}
      </LinkButton>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Show when={purchaseLinkQuery.isError}>
        <ErrorAlert
          errorMessage={getLocalizedApiErrorMessage(
            purchaseLinkQuery.error,
            (code) => tErrors(`apiCodes.${code}`),
            t("errors.purchaseLinkFailed"),
          )}
        />
      </Show>

      <Button
        {...buttonProps}
        type="button"
        disabled={purchaseLinkQuery.isLoading || purchaseLinkQuery.isError}
        onClick={handlePurchase}
      >
        {children ?? t("purchaseInTelegram")}
      </Button>

      <Show when={showInstructions && purchaseLinkQuery.data != null}>
        <p className="text-sm text-muted-foreground">
          {purchaseLinkQuery.data?.instructions ?? t("purchaseInstructions")}
        </p>
      </Show>
    </div>
  );
}
