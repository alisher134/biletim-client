import { GuestOnly } from "@/features/require-auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestOnly>
      <div className="flex h-screen w-full items-center justify-center px-4">
        {children}
      </div>
    </GuestOnly>
  );
}
