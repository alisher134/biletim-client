"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { useRouter } from "@/shared/config/i18n/navigation";
import { useZodForm } from "@/shared/hooks/use-zod-form";
import { AppForm } from "@/shared/ui/app-form";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { InputField } from "@/shared/ui/input-field";
import { Show } from "@/shared/ui/show";
import { TextareaField } from "@/shared/ui/textarea-field";
import { showSuccessToast } from "@/shared/utils";

import {
  createLessonSchema,
  type LessonFormValues,
} from "../model/lesson-schema";
import { useCreateLesson } from "../model/use-create-lesson";

type CreateLessonDialogProps = {
  courseId: string;
  nextOrder: number;
};

export function CreateLessonDialog({
  courseId,
  nextOrder,
}: CreateLessonDialogProps) {
  const t = useTranslations("adminCourses");
  const router = useRouter();
  const { mutate, isPending } = useCreateLesson(courseId);
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useZodForm(createLessonSchema(t), {
    defaultValues: {
      title: "",
      description: "",
      order: nextOrder,
      videoObjectKey: "",
      videoDuration: 0,
    },
  });

  const handleCreate = (values: LessonFormValues) => {
    setSubmitError(null);

    mutate(
      {
        title: values.title,
        description: values.description,
        order: values.order,
      },
      {
        onSuccess: (lesson) => {
          showSuccessToast(t("successLessonCreate"));
          setOpen(false);
          router.push(`/admin/courses/${courseId}/lessons/${lesson.id}`);
        },
        onError: (error) => {
          setSubmitError(getErrorMessage(error, t("errors.createFailed")));
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" />}>
        {t("addLesson")}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("createLessonTitle")}</DialogTitle>
        </DialogHeader>

        <Show when={submitError != null}>
          <ErrorAlert errorMessage={submitError!} />
        </Show>

        <AppForm
          form={form}
          onSubmit={handleCreate}
          className="flex flex-col gap-4"
        >
          {({ register, formState }) => (
            <>
              <InputField
                label={t("name")}
                error={formState.errors.title?.message}
                {...register("title")}
              />
              <TextareaField
                label={t("description")}
                error={formState.errors.description?.message}
                {...register("description")}
              />
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  {t("cancel")}
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {t("createSubmit")}
                </Button>
              </DialogFooter>
            </>
          )}
        </AppForm>
      </DialogContent>
    </Dialog>
  );
}
