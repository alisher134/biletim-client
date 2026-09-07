import { type ReactNode } from "react";

import { Spinner } from "./spinner";

type AsyncWrapperProps<T> = {
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
  children: (data: T) => ReactNode;
  loaderSlot?: ReactNode;
  errorSlot?: ReactNode;
};

export function AsyncWrapper<T>({
  children,
  data,
  isLoading,
  isError,
  loaderSlot,
  errorSlot,
}: AsyncWrapperProps<T>) {
  if (isLoading) {
    return loaderSlot ?? <Spinner />;
  }

  if (isError) {
    return errorSlot ?? null;
  }

  if (data == null) {
    return null;
  }

  return children(data);
}
