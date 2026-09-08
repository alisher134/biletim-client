"use client";

import { useId } from "react";

import type { FormUIProps } from "../types/form";
import { Field, FieldError, FieldLabel } from "./field";
import { Textarea } from "./textarea";

export function TextareaField({
  label,
  error,
  ...props
}: FormUIProps<"textarea">) {
  const id = useId();

  return (
    <Field data-invalid={error ? true : undefined}>
      {label && (
        <FieldLabel htmlFor={id} className="font-normal text-muted-foreground">
          {label}
        </FieldLabel>
      )}
      <Textarea
        id={id}
        autoComplete="off"
        {...props}
        aria-invalid={error ? true : undefined}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
