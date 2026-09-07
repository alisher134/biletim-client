import { Spinner } from "@/shared/ui/spinner";

export function AuthGateLoader() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Spinner className="size-8" />
    </div>
  );
}
