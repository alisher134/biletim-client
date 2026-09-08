import { CourseDetails } from "@/features/courses";
import { Card, CardContent } from "@/shared/ui/card";

type DashboardCourseProps = {
  slug: string;
};

export function DashboardCourse({ slug }: DashboardCourseProps) {
  return (
    <Card>
      <CardContent>
        <CourseDetails slug={slug} />
      </CardContent>
    </Card>
  );
}
