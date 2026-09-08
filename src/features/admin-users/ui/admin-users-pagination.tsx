"use client";

import { useTranslations } from "next-intl";

import type { UsersListMeta } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/shared/ui/pagination";

type AdminUsersPaginationProps = {
  meta: UsersListMeta;
  onPageChange: (page: number) => void;
};

export function AdminUsersPagination({
  meta,
  onPageChange,
}: AdminUsersPaginationProps) {
  const t = useTranslations("adminUsers");
  const pages = getVisiblePages(meta.page, Math.max(meta.totalPages, 1));

  return (
    <Pagination aria-label={t("pagination")}>
        <PaginationContent>
          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              disabled={meta.page <= 1}
              onClick={() => onPageChange(meta.page - 1)}
            >
              {t("prev")}
            </Button>
          </PaginationItem>

          {pages.map((page, index) => (
            <PaginationItem
              key={page === "ellipsis" ? `ellipsis-${index}` : page}
            >
              {page === "ellipsis" ? (
                <PaginationEllipsis srOnlyLabel={t("morePages")} />
              ) : (
                <Button
                  type="button"
                  size="icon"
                  variant={page === meta.page ? "outline" : "ghost"}
                  aria-current={page === meta.page ? "page" : undefined}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <Button
              type="button"
              variant="ghost"
              disabled={meta.page >= meta.totalPages}
              onClick={() => onPageChange(meta.page + 1)}
            >
              {t("next")}
            </Button>
          </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function getVisiblePages(
  current: number,
  total: number,
): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, total, current]);

  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  const sortedPages = [...pages].sort((left, right) => left - right);
  const items: Array<number | "ellipsis"> = [];

  for (const page of sortedPages) {
    const previous = items.at(-1);

    if (typeof previous === "number" && page - previous > 1) {
      items.push("ellipsis");
    }

    items.push(page);
  }

  return items;
}
