import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertTitle } from "./alert";

type ErrorAlertProps = {
  errorMessage: string;
};

export function ErrorAlert({ errorMessage }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>{errorMessage}</AlertTitle>
    </Alert>
  );
}
