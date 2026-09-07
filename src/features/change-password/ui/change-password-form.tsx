"use client";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { useZodForm } from "@/shared/hooks/use-zod-form";
import { AppForm } from "@/shared/ui/app-form";
import { Button } from "@/shared/ui/button";
import { PasswordField } from "@/shared/ui/password-field";
import { showErrorToast, showSuccessToast } from "@/shared/utils";

import {
  createChangePasswordSchema,
  type ChangePasswordValues,
} from "../model/change-password-schema";
import { useChangePassword } from "../model/use-change-password";

const emptyPasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function ChangePasswordForm() {
  const t = useTranslations("changePassword");
  const { mutate, isPending } = useChangePassword();

  const form = useZodForm(createChangePasswordSchema(t), {
    defaultValues: emptyPasswordValues,
  });

  const { errors } = form.formState;

  const handleSave = ({
    currentPassword,
    newPassword,
  }: ChangePasswordValues) => {
    mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => {
          showSuccessToast(t("success"));
          form.reset(emptyPasswordValues);
        },
        onError: (error) => {
          showErrorToast(getErrorMessage(error, t("errors.requestFailed")));
        },
      },
    );
  };

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">{t("title")}</h2>

      <AppForm
        form={form}
        onSubmit={handleSave}
        className="flex flex-col gap-5"
      >
        {({ register }) => (
          <>
            <PasswordField
              label={t("currentPassword")}
              placeholder={t("currentPasswordPlaceholder")}
              error={errors.currentPassword?.message}
              autoComplete="current-password"
              {...register("currentPassword")}
            />

            <PasswordField
              label={t("newPassword")}
              placeholder={t("newPasswordPlaceholder")}
              error={errors.newPassword?.message}
              autoComplete="new-password"
              {...register("newPassword")}
            />

            <PasswordField
              label={t("confirmPassword")}
              placeholder={t("confirmPasswordPlaceholder")}
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              {...register("confirmPassword")}
            />

            <Button type="submit" disabled={isPending} className="self-end">
              {t("save")}
            </Button>
          </>
        )}
      </AppForm>
    </section>
  );
}
