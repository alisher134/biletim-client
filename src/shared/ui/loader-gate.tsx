import { type ReactNode } from "react";

import { Spinner } from "./spinner";

type LoaderGateProps = {
  isLoading: boolean;
  loaderSlot?: ReactNode;
  children: ReactNode;
};

export function LoaderGate({
  isLoading,
  loaderSlot,
  children,
}: LoaderGateProps) {
  if (isLoading) {
    return loaderSlot ?? <Spinner />;
  }

  return children;
}
