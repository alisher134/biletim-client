import { TakeTest } from "@/features/take-test";
import { Card, CardContent } from "@/shared/ui/card";

type DashboardTestProps = {
  slug: string;
  testId: string;
};

export function DashboardTest({ slug, testId }: DashboardTestProps) {
  return (
    <Card>
      <CardContent>
        <TakeTest slug={slug} testId={testId} />
      </CardContent>
    </Card>
  );
}
