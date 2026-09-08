"use client";

import { ShieldIcon } from "lucide-react";

import { useIsAdmin } from "@/entities/session";
import { Link } from "@/shared/config/i18n/navigation";
import { Show } from "@/shared/ui/show";

type DashboardMenuAdminLinkProps = {
  label: string;
};

export function DashboardMenuAdminLink({ label }: DashboardMenuAdminLinkProps) {
  const { isAdmin, isLoading } = useIsAdmin();

  return (
    <Show when={!isLoading && isAdmin}>
      <Link
        href="/admin"
        className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 text-sm shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
          <ShieldIcon className="size-6" strokeWidth={1.75} aria-hidden />
        </span>
        {label}
      </Link>
    </Show>
  );
}
