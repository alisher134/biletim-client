import { TakeTest } from "@/features/take-test";

type DashboardTestProps = {
  slug: string;
  testId: string;
};

export function DashboardTest({ slug, testId }: DashboardTestProps) {
  return <TakeTest slug={slug} testId={testId} />;
}
