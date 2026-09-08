"use client";

import { useId } from "react";
import { cn } from "cn";

import type { FormUIProps } from "../types/form";
import { Field, FieldError, FieldLabel } from "./field";

export function SelectField({
  label,
  error,
  className,
  children,
  ...props
}: FormUIProps<"select">) {
  const id = useId();

  return (
    <Field data-invalid={error ? true : undefined}>
      {label && (
        <FieldLabel htmlFor={id} className="font-normal text-muted-foreground">
          {label}
        </FieldLabel>
      )}
      <select
        id={id}
        className={cn(
          "h-8 w-full min-w-0 appearance-none rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
