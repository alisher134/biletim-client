"use client";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { useZodForm } from "@/shared/hooks/use-zod-form";
import { AppForm } from "@/shared/ui/app-form";
import { Button } from "@/shared/ui/button";
import { EmailField } from "@/shared/ui/email-field";
import { PasswordField } from "@/shared/ui/password-field";
import { showSuccessToast, showErrorToast } from "@/shared/utils";

import { createSignUpSchema, SignUpValues } from "../model/sign-up-schema";
import { useSignUp } from "../model/use-sign-up";

export function SignUpForm() {
  const t = useTranslations("signUp");
  const { mutate, isPending } = useSignUp();

  const form = useZodForm(createSignUpSchema(t), {
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { errors } = form.formState;

  const handleSignUp = ({ email, password }: SignUpValues) => {
    mutate(
      { email, password },
      {
        onSuccess: () => {
          showSuccessToast(t("success"));
        },
        onError: (error) => {
          showErrorToast(getErrorMessage(error, t("errors.requestFailed")));
        },
      },
    );
  };

  return (
    <AppForm
      form={form}
      onSubmit={handleSignUp}
      className="flex flex-col gap-2"
    >
      {({ register }) => (
        <>
          <EmailField
            label={t("email")}
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordField
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
            error={errors.password?.message}
            autoComplete="new-password"
            {...register("password")}
          />

          <PasswordField
            label={t("confirmPassword")}
            placeholder={t("confirmPasswordPlaceholder")}
            error={errors.confirmPassword?.message}
            autoComplete="new-password"
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            disabled={isPending}
            className="mt-2 w-full text-base"
          >
            {t("submit")}
          </Button>
        </>
      )}
    </AppForm>
  );
}
