"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { useRouter } from "@/shared/config/i18n/navigation";
import { useZodForm } from "@/shared/hooks/use-zod-form";
import { AppForm } from "@/shared/ui/app-form";
import { Button } from "@/shared/ui/button";
import { EmailField } from "@/shared/ui/email-field";
import { ErrorAlert } from "@/shared/ui/error-alert";
import { InputField } from "@/shared/ui/input-field";
import { PasswordField } from "@/shared/ui/password-field";
import { Show } from "@/shared/ui/show";
import { showSuccessToast } from "@/shared/utils";

import { createSignUpSchema, SignUpValues } from "../model/sign-up-schema";
import { useSignUp } from "../model/use-sign-up";

export function SignUpForm() {
  const t = useTranslations("signUp");
  const router = useRouter();
  const { mutate, isPending } = useSignUp();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useZodForm(createSignUpSchema(t), {
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { errors } = form.formState;

  const handleSignUp = ({
    email,
    firstName,
    lastName,
    password,
  }: SignUpValues) => {
    setSubmitError(null);

    mutate(
      { email, firstName, lastName, password },
      {
        onSuccess: () => {
          showSuccessToast(t("success"));
          router.replace("/dashboard");
        },
        onError: (error) => {
          setSubmitError(getErrorMessage(error, t("errors.requestFailed")));
        },
      },
    );
  };

  return (
    <>
      <Show when={submitError != null}>
        <ErrorAlert errorMessage={submitError!} />
      </Show>

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

            <div className="grid gap-2 sm:grid-cols-2">
              <InputField
                label={t("firstName")}
                placeholder={t("firstNamePlaceholder")}
                error={errors.firstName?.message}
                autoComplete="given-name"
                {...register("firstName")}
              />
              <InputField
                label={t("lastName")}
                placeholder={t("lastNamePlaceholder")}
                error={errors.lastName?.message}
                autoComplete="family-name"
                {...register("lastName")}
              />
            </div>

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
    </>
  );
}
