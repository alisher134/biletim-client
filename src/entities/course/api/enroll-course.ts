import { apiClient } from "@/shared/api";

import { parseCourseEnrollment } from "../lib/parse-course";
import type { CourseEnrollment } from "../model/types";

export async function enrollCourse(
  courseId: string,
): Promise<CourseEnrollment> {
  const { data } = await apiClient.post(`/courses/${courseId}/enrollment`);

  return parseCourseEnrollment(data);
}
