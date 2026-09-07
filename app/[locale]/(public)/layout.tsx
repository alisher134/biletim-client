import { MainLayout } from "@/_app/layouts/main-layout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
