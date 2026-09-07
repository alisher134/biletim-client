"use client";

import { useTranslations } from "next-intl";

import { getErrorMessage } from "@/shared/api";
import { Link } from "@/shared/config/i18n/navigation";
import { useZodForm } from "@/shared/hooks/use-zod-form";
import { AppForm } from "@/shared/ui/app-form";
import { Button } from "@/shared/ui/button";
import { EmailField } from "@/shared/ui/email-field";
import { PasswordField } from "@/shared/ui/password-field";
import { showSuccessToast, showErrorToast } from "@/shared/utils";

import { createSignInSchema, SignInValues } from "../model/sign-in-schema";
import { useSignIn } from "../model/use-sign-in";

export function SignInForm() {
  const t = useTranslations("signIn");
  const { mutate, isPending } = useSignIn();

  const form = useZodForm(createSignInSchema(t), {
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = form.formState;

  const handleSignIn = (values: SignInValues) => {
    mutate(values, {
      onSuccess: () => {
        showSuccessToast(t("success"));
      },
      onError: (error) => {
        showErrorToast(getErrorMessage(error, t("errors.requestFailed")));
      },
    });
  };

  return (
    <AppForm
      form={form}
      onSubmit={handleSignIn}
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

          <div className="flex flex-col gap-2">
            <PasswordField
              label={t("password")}
              placeholder={t("passwordPlaceholder")}
              error={errors.password?.message}
              autoComplete="current-password"
              {...register("password")}
            />

            <Link
              href="/forgot-password"
              className="self-start text-sm text-primary hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>

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
