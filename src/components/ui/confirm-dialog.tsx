"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2, LogOut, CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info" | "success";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, isLoading]);

  const icons = {
    danger: <Trash2 className="h-6 w-6 text-rose-600 dark:text-rose-400" />,
    warning: <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
    info: <LogOut className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
    success: <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
  };

  const iconBgStyles = {
    danger: "bg-rose-100 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30",
    warning: "bg-amber-100 dark:bg-amber-400/20 border-amber-200 dark:border-amber-400/30",
    info: "bg-amber-100 dark:bg-amber-400/20 border-amber-200 dark:border-amber-400/30",
    success: "bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-500/30",
  };

  const confirmBtnStyles = {
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/25",
    warning: "bg-amber-500 hover:bg-amber-600 text-zinc-950 shadow-amber-500/25",
    info: "bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-amber-400/25 font-extrabold",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25",
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => {
              if (!isLoading) onClose();
            }}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 340,
              duration: 0.25,
            }}
            className="relative z-50 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 overflow-hidden"
          >
            {/* Header: Icon + Title + Close Button */}
            <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border",
                    iconBgStyles[variant]
                  )}
                >
                  {icons[variant]}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-white leading-tight truncate">
                  {title}
                </h3>
              </div>

              {!isLoading && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Description Body (Full Width) */}
            <div className="mt-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              {description}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={onClose}
                className="px-4.5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  await onConfirm();
                }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer",
                  confirmBtnStyles[variant]
                )}
              >
                {isLoading ? "Processing..." : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
