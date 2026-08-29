"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { CharacterAvatar } from "@/components/character/character-avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { isValidEmail } from "@/lib/utils";

import { loginAdmin } from "@/actions/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Admin email is required.";
    } else if (!isValidEmail(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email.trim());
      formData.append("password", password);

      const res = await loginAdmin(formData);
      setIsLoading(false);

      if (!res.success) {
        toast({
          title: "Login Failed",
          description: res.error || "Invalid login credentials.",
          type: "error",
        });
        return;
      }

      toast({
        title: "Login Successful!",
        description: "Welcome back to the Ayamu Labs Studio Admin.",
        type: "success",
      });

      router.push("/admin");
      router.refresh();
    } catch {
      setIsLoading(false);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred during login.",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <CharacterAvatar size="lg" withBorder withGlow />
          <div>
            <span className="flex items-center justify-center gap-1 font-black text-2xl text-white tracking-tight">
              Ayamu <span className="text-amber-400">Labs</span>
            </span>
            <p className="text-sm font-semibold text-zinc-400 mt-1">
              Studio Admin
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">
              Admin Email *
            </label>
            <Input
              type="email"
              placeholder="Enter your admin email"
              value={email}
              error={errors.email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              icon={<Mail className="h-4 w-4" />}
              className="bg-zinc-800/80 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-300">
              Password *
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              error={errors.password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              icon={<Lock className="h-4 w-4" />}
              className="bg-zinc-800/80 border-zinc-700 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-full font-bold text-sm bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all cursor-pointer mt-6"
          >
            <span>{isLoading ? "Signing In..." : "Sign In to Studio Admin"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-amber-400 transition-colors"
          >
            &larr; Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
