import { type ReactNode } from "react";

type ErrorGateProps = {
  isError: boolean;
  errorSlot?: ReactNode;
  children: ReactNode;
};

export function ErrorGate({ isError, errorSlot, children }: ErrorGateProps) {
  if (isError) {
    return (
      <>
        {errorSlot ?? (
          <div className="text-sm text-red-600">Произошла ошибка</div>
        )}
      </>
    );
  }

  return children;
}
