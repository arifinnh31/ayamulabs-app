"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
}

interface ToastContextType {
  toast: (opts: Omit<Toast, "id">) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback(
    ({ title, description, type = "success" }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm sm:w-full z-[99999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-2xl p-4 shadow-2xl border backdrop-blur-md",
                t.type === "success" &&
                  "bg-amber-400 text-zinc-950 border-amber-300 shadow-amber-400/20 font-medium",
                t.type === "error" &&
                  "bg-rose-500 text-white border-rose-400 shadow-rose-500/20",
                t.type === "info" &&
                  "bg-zinc-900/95 text-white border-zinc-700 shadow-black/40 dark:bg-zinc-800/95"
              )}
            >
              {t.type === "success" && (
                <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-zinc-950" />
              )}
              {t.type === "error" && (
                <AlertCircle className="h-5 w-5 mt-0.5 shrink-0 text-white" />
              )}
              {t.type === "info" && (
                <Info className="h-5 w-5 mt-0.5 shrink-0 text-amber-400" />
              )}

              <div className="flex-1">
                <h4 className="text-sm font-bold leading-tight">{t.title}</h4>
                {t.description && (
                  <p className="mt-1 text-xs opacity-90 leading-snug">{t.description}</p>
                )}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="text-current opacity-70 hover:opacity-100 transition-opacity p-0.5 cursor-pointer"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
