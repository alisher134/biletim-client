export const dashboardNavItems = [
  { href: "/dashboard", labelKey: "home" },
  { href: "/dashboard/my-courses", labelKey: "myCourses" },
  { href: "/dashboard/courses", labelKey: "allCourses" },
] as const;

export type DashboardNavHref = (typeof dashboardNavItems)[number]["href"];
