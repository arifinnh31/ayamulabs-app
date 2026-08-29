"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar";

const AdminContext = React.createContext<{
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleMobile: () => void;
}>({
  mobileOpen: false,
  setMobileOpen: () => {},
  toggleMobile: () => {},
});

export function useAdminLayout() {
  return React.useContext(AdminContext);
}

export function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const toggleMobile = () => setMobileOpen((prev) => !prev);

  // If on login page, don't show admin sidebar or constrained shell
  if (pathname === "/admin/login" || pathname === "/login") {
    return <div className="min-h-screen bg-zinc-950 text-white">{children}</div>;
  }

  return (
    <AdminContext.Provider value={{ mobileOpen, setMobileOpen, toggleMobile }}>
      <div className="h-screen w-screen overflow-hidden flex bg-zinc-50 dark:bg-[#07080b] text-zinc-900 dark:text-zinc-100">
        {/* Fixed Left Sidebar */}
        <AdminSidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        {/* Right Main Container (Header is fixed at top, content scrolls inside) */}
        <main className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
          {children}
        </main>
      </div>
    </AdminContext.Provider>
  );
}
