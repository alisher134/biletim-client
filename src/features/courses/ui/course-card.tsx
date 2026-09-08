"use client";

import { BookOpenIcon } from "lucide-react";

import type { Course, MyCourseItemCourse } from "@/entities/course";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { LinkButton } from "@/shared/ui/link-button";
import { Show } from "@/shared/ui/show";

import { CourseProgress } from "./course-progress";

type CourseCardCourse = Pick<Course, "title" | "slug"> &
  Partial<Pick<Course, "description">> &
  Pick<MyCourseItemCourse, "id">;

type CourseCardProps = {
  course: CourseCardCourse;
  actionHref: string;
  actionLabel: string;
  meta?: string;
  progress?: number;
};

export function CourseCard({
  course,
  actionHref,
  actionLabel,
  meta,
  progress,
}: CourseCardProps) {
  return (
    <Card className="relative overflow-hidden py-0">
      <div className="flex aspect-video items-center justify-center bg-muted">
        <BookOpenIcon
          className="size-10 text-muted-foreground"
          strokeWidth={1.25}
          aria-hidden
        />
      </div>

      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {course.title}
        </CardTitle>
        <Show when={meta != null}>
          <p className="text-sm text-muted-foreground">{meta}</p>
        </Show>
        <Show when={progress != null} data={progress}>
          {(value) => <CourseProgress value={value} />}
        </Show>
      </CardHeader>

      <CardContent>
        <Show
          when={
            course.description != null && course.description.length > 0
          }
        >
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        </Show>
      </CardContent>

      <CardFooter className="px-(--card-spacing) pt-0 pb-(--card-spacing)">
        <LinkButton
          href={actionHref}
          variant="default"
          size="default"
          className="w-full"
        >
          {actionLabel}
        </LinkButton>
      </CardFooter>
    </Card>
  );
}
