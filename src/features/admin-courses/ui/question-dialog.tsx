"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import type { Question } from "@/entities/course";
import { getErrorMessage } from "@/shared/api";
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
} from "@/shared/ui/dialog";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { InputField } from "@/shared/ui/input-field";
import { SelectField } from "@/shared/ui/select-field";
import { Show } from "@/shared/ui/show";
import { TextareaField } from "@/shared/ui/textarea-field";
import { showSuccessToast } from "@/shared/utils";

import {
  createQuestionSchema,
  type QuestionFormValues,
} from "../model/question-schema";
import { useSaveQuestion } from "../model/use-save-question";
import { QuestionOptionsEditor } from "./question-options-editor";

type QuestionDialogProps = {
  courseId: string;
  testId: string;
  question?: Question;
  nextOrder: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuestionDialog({
  courseId,
  testId,
  question,
  nextOrder,
  open,
  onOpenChange,
}: QuestionDialogProps) {
  const t = useTranslations("adminCourses");
  const { mutate, isPending } = useSaveQuestion(courseId, testId);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useZodForm(createQuestionSchema(t), {
    defaultValues: toQuestionValues(question),
  });

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) return;

    form.reset(toQuestionValues(question));
    setSubmitError(null);
  };

  const handleSave = (values: QuestionFormValues) => {
    setSubmitError(null);

    mutate(
      {
        questionId: question?.id,
        values: {
          text: values.text,
          type: values.type,
          points: values.points,
          order: question?.order ?? nextOrder,
          options: values.options.map((option, index) => ({
            ...option,
            order: index,
          })),
        },
      },
      {
        onSuccess: () => {
          showSuccessToast(t("successQuestionSave"));
          onOpenChange(false);
        },
        onError: (error) => {
          setSubmitError(getErrorMessage(error, t("errors.updateFailed")));
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {question == null ? t("addQuestion") : t("editQuestion")}
          </DialogTitle>
        </DialogHeader>

        <Show when={submitError != null}>
          <ErrorAlert errorMessage={submitError!} />
        </Show>

        <AppForm
          form={form}
          onSubmit={handleSave}
          className="flex min-h-0 flex-1 flex-col gap-4"
        >
          {({ register, setValue, control, formState }) => (
            <>
              <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
                <TextareaField
                  label={t("questionText")}
                  error={formState.errors.text?.message}
                  {...register("text")}
                />
                <div className="grid gap-4 sm:grid-cols-[1fr_8rem]">
                  <SelectField
                    label={t("questionType")}
                    {...register("type", {
                      onChange: (event) => {
                        if (event.target.value === "TRUE_FALSE") {
                          setValue("options", [
                            { text: "True", isCorrect: true },
                            { text: "False", isCorrect: false },
                          ]);
                        }
                      },
                    })}
                  >
                    <option value="SINGLE_CHOICE">{t("typeSingle")}</option>
                    <option value="MULTIPLE_CHOICE">{t("typeMultiple")}</option>
                    <option value="TRUE_FALSE">{t("typeTrueFalse")}</option>
                  </SelectField>
                  <InputField
                    label={t("points")}
                    type="number"
                    {...register("points", { valueAsNumber: true })}
                  />
                </div>
                <QuestionOptionsEditor control={control} form={form} />
                <Show when={formState.errors.options?.message != null}>
                  <ErrorAlert
                    errorMessage={formState.errors.options?.message ?? ""}
                  />
                </Show>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                  {t("cancel")}
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                  {t("save")}
                </Button>
              </DialogFooter>
            </>
          )}
        </AppForm>
      </DialogContent>
    </Dialog>
  );
}

function toQuestionValues(question?: Question): QuestionFormValues {
  if (question == null) {
    return {
      text: "",
      type: "SINGLE_CHOICE",
      points: 1,
      options: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
    };
  }

  return {
    text: question.text,
    type: question.type,
    points: question.points,
    options: question.options.map((option) => ({
      text: option.text,
      isCorrect: option.isCorrect === true,
    })),
  };
}
