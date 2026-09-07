import { getTranslations } from "next-intl/server";

import { AuthFormLayout } from "@/widgets/auth-form-layout";
import { SignInForm } from "@/features/sign-in";
import { Link } from "@/shared/config/i18n/navigation";

export async function SignIn() {
  const t = await getTranslations("signIn");

  return (
    <AuthFormLayout
      title={t("title")}
      footer={
        <>
          {t("noAccount")}{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            {t("signUp")}
          </Link>
        </>
      }
    >
      <SignInForm />
    </AuthFormLayout>
  );
}
