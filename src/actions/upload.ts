"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export interface UploadResult {
  success: boolean;
  url?: string;
  type?: "image" | "video";
  caption?: string;
  error?: string;
}

async function processFileUpload(file: File): Promise<UploadResult> {
  try {
    // Determine type
    const mimeType = file.type || "";
    const isVideo = mimeType.startsWith("video/") || file.name.endsWith(".mp4") || file.name.endsWith(".webm");
    const type: "image" | "video" = isVideo ? "video" : "image";

    // Create caption from original file name without extension
    const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ");
    const caption = baseName.charAt(0).toUpperCase() + baseName.slice(1);

    if (!supabaseUrl || !serviceRoleKey) {
      // Fallback to data URL if Supabase credentials are missing
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type || "image/png"};base64,${base64}`;
      return {
        success: true,
        url: dataUrl,
        type,
        caption,
      };
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Ensure unique path
    const bucketName = "portfolio";
    const sanitizedCleanName = file.name
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .toLowerCase();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${sanitizedCleanName}`;
    const filePath = `uploads/${uniqueFileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: file.type || (isVideo ? "video/mp4" : "image/png"),
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      // Fallback to data URL if bucket upload fails
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type || "image/png"};base64,${base64}`;
      return {
        success: true,
        url: dataUrl,
        type,
        caption,
      };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrlData.publicUrl,
      type,
      caption,
    };
  } catch (error: unknown) {
    console.error("processFileUpload exception:", error);
    const msg = error instanceof Error ? error.message : "Failed to upload asset.";
    return { success: false, error: msg };
  }
}

export async function uploadAsset(formData: FormData): Promise<UploadResult> {
  const file = formData.get("file") as File | null;
  if (!file) {
    return { success: false, error: "No file provided for upload." };
  }
  return processFileUpload(file);
}

export async function uploadAssets(formData: FormData): Promise<{
  success: boolean;
  results: UploadResult[];
  error?: string;
}> {
  try {
    const rawFiles = formData.getAll("files") as File[];
    const single = formData.get("file") as File | null;
    const files = rawFiles.length > 0 ? rawFiles : single ? [single] : [];

    if (files.length === 0) {
      return { success: false, results: [], error: "No files provided for upload." };
    }

    const results = await Promise.all(files.map((f) => processFileUpload(f)));
    const hasSuccess = results.some((r) => r.success);
    return { success: hasSuccess, results };
  } catch (error: unknown) {
    console.error("uploadAssets exception:", error);
    const msg = error instanceof Error ? error.message : "Failed to upload assets.";
    return { success: false, results: [], error: msg };
  }
}

/**
 * Deletes a single uploaded asset from Supabase storage if it belongs to the portfolio bucket.
 */
export async function deleteAsset(url: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!url || !supabaseUrl || !serviceRoleKey) return { success: true };

    const bucketName = "portfolio";
    const marker = `/storage/v1/object/public/${bucketName}/`;
    if (!url.includes(marker)) {
      // Not a Supabase storage URL for this bucket, no need to delete
      return { success: true };
    }

    const filePath = decodeURIComponent(url.split(marker)[1]);
    if (!filePath) return { success: true };

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await supabase.storage.from(bucketName).remove([filePath]);
    if (error) {
      console.error("Error removing file from storage:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("deleteAsset exception:", err);
    return { success: false, error: err instanceof Error ? err.message : "Failed to delete file." };
  }
}

/**
 * Deletes multiple uploaded assets from Supabase storage.
 */
export async function deleteAssets(urls: string[]): Promise<{ success: boolean }> {
  try {
    if (!urls || urls.length === 0 || !supabaseUrl || !serviceRoleKey) return { success: true };
    await Promise.all(urls.map((u) => deleteAsset(u)));
    return { success: true };
  } catch {
    return { success: false };
  }
}