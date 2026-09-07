import type { DashboardNavHref } from "../model/nav-items";

export function isNavItemActive(
  pathname: string,
  href: DashboardNavHref,
): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";

  return pathname === href || pathname.startsWith(`${href}/`);
}
