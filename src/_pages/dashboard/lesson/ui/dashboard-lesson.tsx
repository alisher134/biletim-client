import { LessonPlayer } from "@/features/lesson-player";
import { Card, CardContent } from "@/shared/ui/card";

type DashboardLessonProps = {
  slug: string;
  lessonId: string;
};

export function DashboardLesson({ slug, lessonId }: DashboardLessonProps) {
  return (
    <Card>
      <CardContent>
        <LessonPlayer slug={slug} lessonId={lessonId} />
      </CardContent>
    </Card>
  );
}
