import Link from "next/link";

import { Button } from "@/shared/ui/button";

export function HomePage() {
  return (
    <div>
      <Button>
        <Link href="/">Click me</Link>
      </Button>
    </div>
  );
}
