"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Palette,
  FolderTree,
  Users,
  Globe,
  LogOut,
  X,
} from "lucide-react";
import { CharacterAvatar } from "@/components/character/character-avatar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/ui/toast";
import { motion, AnimatePresence } from "framer-motion";

import { logoutAdmin } from "@/actions/auth";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function AdminSidebar({
  mobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Portfolio", href: "/admin/portfolio", icon: Palette },
    { name: "Categories & Tags", href: "/admin/categories", icon: FolderTree },
    { name: "Team & Character", href: "/admin/profile", icon: Users },
  ];

  const handleSignOut = async () => {
    setLogoutModalOpen(false);
    toast({
      title: "Signed Out",
      description: "Your studio admin session has ended.",
      type: "info",
    });
    await logoutAdmin();
  };

  const content = (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        {/* Studio Admin Brand - Responsive height matching AdminHeader */}
        <div className="h-16 sm:h-20 flex items-center justify-between px-5 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <CharacterAvatar size="sm" withBorder />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 font-black text-base text-zinc-950 dark:text-white leading-tight">
                <span>Ayamu</span>
                <span className="text-amber-500">Labs</span>
              </div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
                Studio Admin
              </p>
            </div>
          </div>

          {onMobileClose && (
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 p-4">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? "bg-amber-400 text-zinc-950 shadow-sm shadow-amber-400/20 font-extrabold"
                    : "text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Exit Links */}
      <div className="space-y-2 p-4 border-t border-zinc-200 dark:border-zinc-800">
        <Link
          href="/"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-amber-500" />
            <span>View Live Site</span>
          </span>
          <span className="text-[10px] text-zinc-400">&rarr;</span>
        </Link>

        <button
          type="button"
          onClick={() => setLogoutModalOpen(true)}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer text-left"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Sign Out Confirmation Modal */}
      <ConfirmDialog
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleSignOut}
        title="Sign Out from Studio Admin?"
        description="Are you sure you want to end your current admin session? You will need to sign in again to access the studio management panel."
        confirmText="Sign Out"
        cancelText="Stay Logged In"
        variant="info"
      />
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d12] flex-col shrink-0 h-full overflow-hidden select-none">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onMobileClose}
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-72 max-w-[80vw] bg-white dark:bg-[#0c0d12] border-r border-zinc-200 dark:border-zinc-800 h-full z-10 shadow-2xl"
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
