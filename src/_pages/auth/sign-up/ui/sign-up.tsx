import { getTranslations } from "next-intl/server";

import { AuthFormLayout } from "@/widgets/auth-form-layout";
import { SignUpForm } from "@/features/sign-up";
import { LinkButton } from "@/shared/ui/link-button";

export async function SignUp() {
  const t = await getTranslations("signUp");

  return (
    <AuthFormLayout
      title={t("title")}
      footer={
        <>
          {t("hasAccount")}{" "}
          <LinkButton
            href="/sign-in"
            variant="link"
            className="inline h-auto p-0"
          >
            {t("signIn")}
          </LinkButton>
        </>
      }
    >
      <SignUpForm />
    </AuthFormLayout>
  );
}
