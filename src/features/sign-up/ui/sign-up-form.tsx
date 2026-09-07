"use client";

import { useTranslations } from "next-intl";

import { useZodForm } from "@/shared/hooks/use-zod-form";
import { AppForm } from "@/shared/ui/app-form";
import { Button } from "@/shared/ui/button";
import { EmailField } from "@/shared/ui/email-field";
import { PasswordField } from "@/shared/ui/password-field";

import { createSignUpSchema, SignUpValues } from "../model/sign-up-schema";

export function SignUpForm() {
  const t = useTranslations("signUp");

  const form = useZodForm(createSignUpSchema(t), {
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { errors } = form.formState;

  const handleSignUp = (values: SignUpValues) => {
    console.log(values);
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

          <Button type="submit" className="mt-2 w-full text-base">
            {t("submit")}
          </Button>
        </>
      )}
    </AppForm>
  );
}
