import { getTranslations } from "next-intl/server";

import { SignInForm } from "@/features/sign-in";
import { AuthFormLayout } from "@/widgets/auth-form-layout";
import { LinkButton } from "@/shared/ui/link-button";

export async function SignIn() {
  const t = await getTranslations("signIn");

  return (
    <AuthFormLayout
      title={t("title")}
      footer={
        <>
          {t("noAccount")}{" "}
          <LinkButton
            href="/sign-up"
            variant="link"
            className="inline h-auto p-0"
          >
            {t("signUp")}
          </LinkButton>
        </>
      }
    >
      <SignInForm />
    </AuthFormLayout>
  );
}
