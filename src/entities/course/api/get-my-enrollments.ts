import { apiClient } from "@/shared/api";

import { parseCourseEnrollments } from "../lib/parse-course";
import type { CourseEnrollment } from "../model/types";

export async function getMyEnrollments(): Promise<CourseEnrollment[]> {
  const { data } = await apiClient.get("/courses/my");

  return parseCourseEnrollments(data);
}
