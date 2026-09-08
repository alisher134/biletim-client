import { cn } from "cn";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { LinkButton } from "@/shared/ui/link-button";

type PricingCardProps = {
  months: number;
  period: string;
  price: string;
  pricePerMonth: string;
  perMonthLabel: string;
  priceNote: string;
  cta: string;
  href: "/sign-up";
  featured?: boolean;
};

export function PricingCard({
  months,
  period,
  price,
  pricePerMonth,
  perMonthLabel,
  priceNote,
  cta,
  href,
  featured = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "h-full border transition-colors hover:border-primary/40",
        featured && "border-primary ring-1 ring-primary/15",
      )}
    >
      <CardHeader className="border-b pb-(--card-spacing)">
        <CardTitle className="flex items-baseline gap-1.5">
          <span className="font-heading text-3xl font-medium tracking-tight">
            {months}
          </span>
          <span className="text-sm font-normal text-muted-foreground">
            {period}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-center gap-1 py-6">
        <p className="font-heading text-2xl font-medium tracking-tight">
          {price}
        </p>
        <p className="text-xs text-muted-foreground">{priceNote}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {pricePerMonth}{" "}
          <span className="text-foreground/70">{perMonthLabel}</span>
        </p>
      </CardContent>

      <CardFooter className="border-t pt-(--card-spacing)">
        <LinkButton
          href={href}
          variant={featured ? "default" : "outline"}
          size="default"
          className="w-full"
        >
          {cta}
        </LinkButton>
      </CardFooter>
    </Card>
  );
}
