import { Suspense } from "react";

import { CoursesCatalog } from "@/features/courses";
import { CenteredSpinner } from "@/shared/ui/spinner";

export function AllCourses() {
  return (
    <Suspense fallback={<CenteredSpinner />}>
      <CoursesCatalog />
    </Suspense>
  );
}
