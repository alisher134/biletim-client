import { type ReactNode } from "react";

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
    return (
      <>
        {loaderSlot ?? <div className="text-sm text-gray-500">Загрузка…</div>}
      </>
    );
  }

  return children;
}
