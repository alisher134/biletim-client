"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

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
  DialogTrigger,
} from "@/shared/ui/dialog";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { InputField } from "@/shared/ui/input-field";
import { SelectField } from "@/shared/ui/select-field";
import { Show } from "@/shared/ui/show";
import { showSuccessToast } from "@/shared/utils";

import {
  createMaterialSchema,
  type MaterialFormValues,
} from "../model/material-schema";
import { useCreateMaterial } from "../model/use-create-material";
import { FileUploadButton } from "./file-upload-button";

type CreateMaterialDialogProps = {
  courseId: string;
  lessonId: string;
  nextOrder: number;
};

export function CreateMaterialDialog({
  courseId,
  lessonId,
  nextOrder,
}: CreateMaterialDialogProps) {
  const t = useTranslations("adminCourses");
  const { mutate, isPending } = useCreateMaterial(courseId, lessonId);
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const form = useZodForm(createMaterialSchema(t), {
    defaultValues: {
      title: "",
      type: "PDF",
      fileObjectKey: "",
      fileName: "",
      fileSize: 0,
      order: nextOrder,
    } satisfies MaterialFormValues,
  });

  const handleCreate = (values: MaterialFormValues) => {
    setSubmitError(null);

    mutate(values, {
      onSuccess: () => {
        showSuccessToast(t("successMaterialCreate"));
        setOpen(false);
        form.reset();
      },
      onError: (error) => {
        setSubmitError(getErrorMessage(error, t("errors.createFailed")));
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button type="button" variant="outline" />}>
        {t("addMaterial")}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("addMaterial")}</DialogTitle>
        </DialogHeader>

        <Show when={submitError != null}>
          <ErrorAlert errorMessage={submitError!} />
        </Show>

        <AppForm
          form={form}
          onSubmit={handleCreate}
          className="flex flex-col gap-4"
        >
          {({ register, setValue, formState }) => (
            <>
              <InputField
                label={t("materialTitle")}
                error={formState.errors.title?.message}
                {...register("title")}
              />
              <SelectField label={t("materialType")} {...register("type")}>
                <option value="PDF">{t("typePdf")}</option>
                <option value="DOCUMENT">{t("typeDocument")}</option>
                <option value="PRESENTATION">{t("typePresentation")}</option>
                <option value="ARCHIVE">{t("typeArchive")}</option>
                <option value="FILE">{t("typeFile")}</option>
              </SelectField>
              <FileUploadButton
                purpose="material"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.rar"
                courseId={courseId}
                lessonId={lessonId}
                label={t("materialFile")}
                onUploaded={({ objectKey, fileName, fileSize }) => {
                  setValue("fileObjectKey", objectKey);
                  setValue("fileName", fileName);
                  setValue("fileSize", fileSize);
                  if (form.getValues("title").length === 0) {
                    setValue("title", fileName);
                  }
                }}
              />
              <Show when={formState.errors.fileObjectKey?.message != null}>
                <ErrorAlert
                  errorMessage={formState.errors.fileObjectKey?.message ?? ""}
                />
              </Show>
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
