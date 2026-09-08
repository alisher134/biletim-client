import { Header } from "@/widgets/header";

type AppShellLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  footer?: React.ReactNode;
  isHeaderHiddenOnMobile?: boolean;
};

export function AppShellLayout({
  children,
  sidebar,
  footer,
  isHeaderHiddenOnMobile = false,
}: AppShellLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <div
        className={isHeaderHiddenOnMobile ? "hidden md:contents" : "contents"}
      >
        <Header />
      </div>

      <div className="flex min-h-0 flex-1">
        {sidebar}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>

      {footer}
    </div>
  );
}
