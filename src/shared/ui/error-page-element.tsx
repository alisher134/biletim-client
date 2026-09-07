import type { ComponentProps } from "react";

import { cn } from "cn";

import { Button } from "./button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { LinkButton } from "./link-button";
import { Show } from "./show";

type ErrorPageElementProps = {
  title: string;
  description: string;
  retryLabel?: string;
  homeLabel?: string;
  homeHref?: ComponentProps<typeof LinkButton>["href"];
  onRetry?: () => void;
  className?: string;
};

export function ErrorPageElement({
  title,
  description,
  retryLabel,
  homeLabel,
  homeHref,
  onRetry,
  className,
}: ErrorPageElementProps) {
  const canRetry = onRetry != null && retryLabel != null;
  const canGoHome = homeHref != null && homeLabel != null;

  return (
    <div
      className={cn(
        "flex min-h-[70vh] items-center justify-center bg-background px-4",
        className,
      )}
    >
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>

        <CardContent className="text-center text-sm text-muted-foreground">
          {description}
        </CardContent>

        <Show when={canRetry || canGoHome}>
          <CardFooter className="justify-center gap-2">
            <Show when={canRetry} data={onRetry}>
              {(handleRetry) => (
                <Button type="button" onClick={handleRetry}>
                  {retryLabel}
                </Button>
              )}
            </Show>
            <Show when={canGoHome} data={homeHref}>
              {(href) => (
                <LinkButton href={href} variant="outline">
                  {homeLabel}
                </LinkButton>
              )}
            </Show>
          </CardFooter>
        </Show>
      </Card>
    </div>
  );
}
