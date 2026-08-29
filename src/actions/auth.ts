"use server";

import { createClient } from "@/lib/supabase/server";
import { safeRevalidatePath } from "@/lib/server-utils";
import { redirect } from "next/navigation";

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function loginAdmin(formData: FormData): Promise<AuthResponse> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { success: false, error: error.message || "Invalid login credentials." };
  }

  safeRevalidatePath("/admin", "layout");
  return { success: true, message: "Welcome back to Ayamu Labs Studio CMS!" };
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  safeRevalidatePath("/admin", "layout");
  redirect("/");
}

export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.name || "Ayamu Admin",
    role: user.user_metadata?.role || "SUPERADMIN",
    avatar: user.user_metadata?.avatar || "/images/ayamu-hamiru.jpg",
  };
}