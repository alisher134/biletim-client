import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";

export function HomePage() {
  return (
    <Container>
      <Button>
        <Link href="/">Click me</Link>
      </Button>
    </Container>
  );
}
