import { useId } from "react";

import type { FormUIProps } from "../types/form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function InputField({ label, error, ...props }: FormUIProps<"input">) {
  const id = useId();

  return (
    <Field data-invalid={error ? true : undefined}>
      {label && (
        <FieldLabel htmlFor={id} className="font-normal text-muted-foreground">
          {label}
        </FieldLabel>
      )}
      <Input
        autoComplete="off"
        id={id}
        {...props}
        aria-invalid={error ? true : undefined}
      />
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
