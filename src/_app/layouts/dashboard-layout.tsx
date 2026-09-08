import { DashboardSidebar, DashboardTabBar } from "@/widgets/dashboard-sidebar";
import { RequireAuth } from "@/features/require-auth";

import { AppShellLayout } from "./app-shell-layout";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <AppShellLayout
        sidebar={<DashboardSidebar />}
        footer={<DashboardTabBar />}
        isHeaderHiddenOnMobile
      >
        {children}
      </AppShellLayout>
    </RequireAuth>
  );
}
