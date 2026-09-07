import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

type AuthFormLayoutProps = {
  title: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthFormLayout({
  title,
  children,
  footer,
}: AuthFormLayoutProps) {
  return (
    <Card className="w-full max-w-md gap-2">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm">{footer}</p>
      </CardFooter>
    </Card>
  );
}
