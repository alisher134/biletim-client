import { z } from "zod";

import type {
  Course,
  CourseDetail,
  CourseEnrollment,
  CourseFavorite,
  CourseLesson,
  CoursesList,
  DownloadUrl,
  LessonMaterial,
  LessonTest,
  PlaybackUrl,
  Question,
  StudentLessonTest,
  TestAttempt,
  UploadIntent,
  UserLessonProgress,
} from "../model/types";

const courseStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional().default(null),
  slug: z.string(),
  status: courseStatusSchema,
  order: z.number(),
  createdAt: z.string().optional().default(""),
  updatedAt: z.string().optional().default(""),
});

const listMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const coursesListSchema = z.object({
  data: z.array(courseSchema),
  meta: listMetaSchema,
});

const questionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  order: z.number(),
  isCorrect: z.boolean().optional(),
});

const questionSchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "TRUE_FALSE"]),
  points: z.number(),
  order: z.number(),
  options: z.array(questionOptionSchema).optional().default([]),
});

const lessonTestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional().default(null),
  passingScore: z.number(),
  timeLimit: z.number().nullable().optional().default(null),
  attemptsLimit: z.number().nullable().optional().default(null),
  questions: z.array(questionSchema).optional().default([]),
});

const studentQuestionOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  order: z.number(),
});

const studentQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "TRUE_FALSE"]),
  points: z.number(),
  order: z.number(),
  options: z.array(studentQuestionOptionSchema).optional().default([]),
});

const studentLessonTestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional().default(null),
  passingScore: z.number(),
  timeLimit: z.number().nullable().optional().default(null),
  attemptsLimit: z.number().nullable().optional().default(null),
  questions: z.array(studentQuestionSchema).optional().default([]),
});

const lessonMaterialSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["PDF", "DOCUMENT", "PRESENTATION", "ARCHIVE", "FILE"]),
  fileObjectKey: z.string().optional(),
  fileName: z.string(),
  fileSize: z.number(),
  order: z.number(),
});

export const courseLessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional().default(null),
  videoObjectKey: z.string().nullable().optional(),
  videoDuration: z.number().nullable().optional().default(null),
  order: z.number(),
  materials: z.array(lessonMaterialSchema).optional().default([]),
  test: lessonTestSchema.nullable().optional().default(null),
});

export const courseDetailSchema = courseSchema.extend({
  lessons: z.array(courseLessonSchema).optional().default([]),
});

export const courseEnrollmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  enrolledAt: z.string(),
  completedAt: z.string().nullable(),
  progress: z.number(),
  status: z.enum(["ACTIVE", "COMPLETED"]),
  course: courseSchema.optional(),
});

export const courseFavoriteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  course: courseSchema.optional(),
});

export const userLessonProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  lessonId: z.string(),
  watchedSeconds: z.number(),
  completed: z.boolean(),
  completedAt: z.string().nullable(),
  updatedAt: z.string(),
});

export const playbackUrlSchema = z.object({
  lessonId: z.string(),
  downloadUrl: z.string(),
  expiresIn: z.number(),
});

export const downloadUrlSchema = z.object({
  downloadUrl: z.string(),
  expiresIn: z.number(),
  materialId: z.string().optional(),
});

export const testAttemptSchema = z.object({
  id: z.string(),
  userId: z.string(),
  testId: z.string(),
  score: z.number().nullable(),
  passed: z.boolean().nullable(),
  startedAt: z.string(),
  completedAt: z.string().nullable(),
});

export const uploadIntentSchema = z.object({
  objectKey: z.string(),
  uploadUrl: z.string(),
  expiresIn: z.number(),
});

export function parseCourse(data: unknown): Course {
  return courseSchema.parse(data);
}

export function parseCoursesList(data: unknown): CoursesList {
  return coursesListSchema.parse(data);
}

export function parseCourseDetail(data: unknown): CourseDetail {
  return courseDetailSchema.parse(data);
}

export function parseCourseLesson(data: unknown): CourseLesson {
  return courseLessonSchema.parse(data);
}

export function parseLessonMaterial(data: unknown): LessonMaterial {
  return lessonMaterialSchema.parse(data);
}

export function parseLessonTest(data: unknown): LessonTest {
  return lessonTestSchema.parse(data);
}

export function parseStudentLessonTest(data: unknown): StudentLessonTest {
  return studentLessonTestSchema.parse(data);
}

export function parseQuestion(data: unknown): Question {
  return questionSchema.parse(data);
}

export function parseCourseEnrollment(data: unknown): CourseEnrollment {
  return courseEnrollmentSchema.parse(data);
}

export function parseCourseEnrollments(data: unknown): CourseEnrollment[] {
  if (Array.isArray(data)) {
    return z.array(courseEnrollmentSchema).parse(data);
  }

  return z.object({ data: z.array(courseEnrollmentSchema) }).parse(data).data;
}

export function parseCourseFavorites(data: unknown): CourseFavorite[] {
  if (Array.isArray(data)) {
    return z.array(courseFavoriteSchema).parse(data);
  }

  return z.object({ data: z.array(courseFavoriteSchema) }).parse(data).data;
}

export function parseLessonProgress(data: unknown): UserLessonProgress | null {
  if (data == null) return null;

  return userLessonProgressSchema.parse(data);
}

export function parsePlaybackUrl(data: unknown): PlaybackUrl {
  return playbackUrlSchema.parse(data);
}

export function parseDownloadUrl(data: unknown): DownloadUrl {
  return downloadUrlSchema.parse(data);
}

export function parseTestAttempt(data: unknown): TestAttempt {
  return testAttemptSchema.parse(data);
}

export function parseUploadIntent(data: unknown): UploadIntent {
  return uploadIntentSchema.parse(data);
}
