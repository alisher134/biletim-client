"use client";

import { useQueryClient } from "@tanstack/react-query";

import { resetSession, useSession } from "@/entities/session";
import { Button } from "@/shared/ui/button";
import { LinkButton } from "@/shared/ui/link-button";
import { LoaderGate } from "@/shared/ui/loader-gate";
import { Show } from "@/shared/ui/show";

type HeaderAuthProps = {
  loginLabel: string;
  logoutLabel: string;
};

export function HeaderAuth({ loginLabel, logoutLabel }: HeaderAuthProps) {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useSession();

  const handleLogout = () => {
    resetSession(queryClient);
  };

  return (
    <LoaderGate isLoading={isLoading} loaderSlot={<div className="h-7 w-16" />}>
      <Show
        when={user != null}
        data={user}
        fallback={<LinkButton href="/sign-in">{loginLabel}</LinkButton>}
      >
        {(user) => (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              {logoutLabel}
            </Button>
          </div>
        )}
      </Show>
    </LoaderGate>
  );
}
