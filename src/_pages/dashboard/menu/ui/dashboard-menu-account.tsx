"use client";

import { LogOutIcon } from "lucide-react";

import { useLogout } from "@/entities/session";

type DashboardMenuAccountProps = {
  logoutLabel: string;
};

export function DashboardMenuAccount({
  logoutLabel,
}: DashboardMenuAccountProps) {
  const logout = useLogout();

  return (
    <div className="flex flex-col items-center pt-2">
      <button
        type="button"
        onClick={logout}
        className="flex items-center gap-2 text-sm text-destructive"
      >
        {logoutLabel}
        <LogOutIcon className="size-4" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}
