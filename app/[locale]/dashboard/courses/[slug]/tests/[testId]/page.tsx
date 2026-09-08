import { DashboardTest } from "@/_pages/dashboard/test";

type DashboardTestPageProps = {
  params: Promise<{ slug: string; testId: string }>;
};

export default async function DashboardTestPage({
  params,
}: DashboardTestPageProps) {
  const { slug, testId } = await params;

  return <DashboardTest slug={slug} testId={testId} />;
}
