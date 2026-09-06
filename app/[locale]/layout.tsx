import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

import { MainLayout } from "@/_app/layouts/main-layout";
import { routing } from "@/shared/config/i18n/routing";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale}>
      <MainLayout>{children}</MainLayout>
    </NextIntlClientProvider>
  );
}
