import { DashboardSidebar } from "@/widgets/dashboard-sidebar";
import { Header } from "@/widgets/header";
import { RequireAuth } from "@/features/require-auth";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="flex min-h-dvh flex-col">
        <Header />

        <div className="flex min-h-0 flex-1">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </RequireAuth>
  );
}
