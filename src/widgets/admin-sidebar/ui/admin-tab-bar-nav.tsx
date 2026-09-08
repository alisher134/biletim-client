"use client";

import { cn } from "cn";
import { HouseIcon, UsersIcon, type LucideIcon } from "lucide-react";

import { Link, usePathname } from "@/shared/config/i18n/navigation";
import { isNavItemActive } from "@/shared/lib/is-nav-item-active";

import type { AdminNavHref, AdminNavItem } from "../model/nav-items";

const tabIcons = {
  "/admin": HouseIcon,
  "/admin/users": UsersIcon,
} as const satisfies Record<AdminNavHref, LucideIcon>;

type AdminTabBarNavProps = {
  items: readonly AdminNavItem[];
};

export function AdminTabBarNav({ items }: AdminTabBarNavProps) {
  const pathname = usePathname();

  return (
    <nav className="shrink-0 rounded-t-3xl bg-card pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_24px_rgba(0,0,0,0.06)] md:hidden">
      <ul className="flex items-stretch">
        {items.map((item) => {
          const Icon = tabIcons[item.href];
          const isActive = isNavItemActive(pathname, item.href, "/admin");

          return (
            <li key={item.href} className="min-w-0 flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={tabClassName(isActive)}
              >
                <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function tabClassName(isActive: boolean) {
  return cn(
    "flex w-full flex-col items-center gap-1 px-1 pt-2.5 pb-2 text-center text-[11px] leading-tight transition-colors",
    isActive ? "text-primary" : "text-secondary-foreground",
  );
}
