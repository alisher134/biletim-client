"use client";

import { useTranslations } from "next-intl";

import { useSession } from "@/entities/session";
import { getErrorMessage } from "@/shared/api";
import { useZodForm } from "@/shared/hooks/use-zod-form";
import { AppForm } from "@/shared/ui/app-form";
import { Button } from "@/shared/ui/button";
import { InputField } from "@/shared/ui/input-field";
import { showErrorToast, showSuccessToast } from "@/shared/utils";

import {
  createUpdateProfileSchema,
  type UpdateProfileValues,
} from "../model/update-profile-schema";
import { useUpdateProfile } from "../model/use-update-profile";

export function UpdateProfileForm() {
  const t = useTranslations("updateProfile");
  const { data: user } = useSession();
  const { mutate, isPending } = useUpdateProfile();

  const form = useZodForm(createUpdateProfileSchema(t), {
    defaultValues: { lastName: "", firstName: "" },
    values: {
      lastName: user?.lastName ?? "",
      firstName: user?.firstName ?? "",
    },
  });

  const { errors } = form.formState;

  const handleSave = (values: UpdateProfileValues) => {
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
    <section className="flex flex-col gap-5">
      <h2 className="text-lg font-semibold">{t("title")}</h2>

      <AppForm
        form={form}
        onSubmit={handleSave}
        className="flex flex-col gap-5"
      >
        {({ register }) => (
          <>
            <InputField
              label={t("lastName")}
              placeholder={t("lastNamePlaceholder")}
              error={errors.lastName?.message}
              autoComplete="family-name"
              {...register("lastName")}
            />

            <InputField
              label={t("firstName")}
              placeholder={t("firstNamePlaceholder")}
              error={errors.firstName?.message}
              autoComplete="given-name"
              {...register("firstName")}
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
