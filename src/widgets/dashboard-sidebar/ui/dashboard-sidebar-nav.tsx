"use client";

import { cn } from "cn";
import {
  BookIcon,
  HouseIcon,
  LibraryIcon,
  type LucideIcon,
} from "lucide-react";

import { Link, usePathname } from "@/shared/config/i18n/navigation";
import { Show } from "@/shared/ui/show";

import type { DashboardNavHref } from "../model/nav-items";

const navIcons = {
  "/dashboard": HouseIcon,
  "/dashboard/my-courses": BookIcon,
  "/dashboard/courses": LibraryIcon,
} as const satisfies Record<DashboardNavHref, LucideIcon>;

type NavItem = {
  href: DashboardNavHref;
  label: string;
};

type DashboardSidebarNavProps = {
  items: readonly NavItem[];
};

export function DashboardSidebarNav({ items }: DashboardSidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {items.map((item) => {
          const Icon = navIcons[item.href];
          const isActive = isNavItemActive(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent font-medium text-sidebar-primary"
                    : "text-secondary-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon
                  className="size-4 shrink-0"
                  strokeWidth={1.75}
                  aria-hidden
                />
                {item.label}
                <Show when={isActive}>
                  <span
                    aria-hidden
                    className="absolute inset-y-0 right-0 w-0.5 rounded-r-lg bg-sidebar-primary"
                  />
                </Show>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function isNavItemActive(pathname: string, href: DashboardNavHref): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";

  return pathname === href || pathname.startsWith(`${href}/`);
}
