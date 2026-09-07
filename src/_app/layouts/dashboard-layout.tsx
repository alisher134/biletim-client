import { DashboardSidebar, DashboardTabBar } from "@/widgets/dashboard-sidebar";
import { Header } from "@/widgets/header";
import { RequireAuth } from "@/features/require-auth";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="flex min-h-dvh flex-col">
        <div className="hidden md:contents">
          <Header />
        </div>

        <div className="flex min-h-0 flex-1">
          <DashboardSidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>

        <DashboardTabBar />
      </div>
    </RequireAuth>
  );
}
