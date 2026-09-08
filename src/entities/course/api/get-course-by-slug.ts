import { apiClient } from "@/shared/api";

import { parseCourseDetail } from "../lib/parse-course";
import type { CourseDetail } from "../model/types";

export async function getCourseBySlug(slug: string): Promise<CourseDetail> {
  const { data } = await apiClient.get(`/courses/${slug}`);

  return parseCourseDetail(data);
}
