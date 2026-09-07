import { getTranslations } from "next-intl/server";

import { AuthFormLayout } from "@/widgets/auth-form-layout";
import { SignUpForm } from "@/features/sign-up";
import { Link } from "@/shared/config/i18n/navigation";

export async function SignUp() {
  const t = await getTranslations("signUp");

  return (
    <AuthFormLayout
      title={t("title")}
      footer={
        <>
          {t("hasAccount")}{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            {t("signIn")}
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthFormLayout>
  );
}
