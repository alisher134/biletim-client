"use client";

import { cn } from "cn";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/shared/config/i18n/navigation";
import { buttonVariants } from "@/shared/ui/button";

export function CoursesTabs() {
  const t = useTranslations("courses");
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/dashboard/courses"
        className={tabClassName(pathname.startsWith("/dashboard/courses"))}
      >
        {t("allCourses")}
      </Link>
      <Link
        href="/dashboard/my-courses"
        className={tabClassName(pathname.startsWith("/dashboard/my-courses"))}
      >
        {t("myCourses")}
      </Link>
      <Link
        href="/dashboard/favorites"
        className={tabClassName(pathname.startsWith("/dashboard/favorites"))}
      >
        {t("favorites")}
      </Link>
    </div>
  );
}

function tabClassName(isActive: boolean) {
  return cn(
    buttonVariants({ variant: isActive ? "default" : "outline", size: "sm" }),
  );
}
