import Link, { LinkProps } from "next/link";
import { buttonVariants } from "./button";
import { VariantProps } from "class-variance-authority";
import { cn } from "cn";

type LinkButtonProps = {
  children: React.ReactNode;
  className?: string;
} & LinkProps &
  VariantProps<typeof buttonVariants>;

export function LinkButton({
  children,
  className,
  variant = "secondary",
  size = "sm",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}
