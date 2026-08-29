"use client";

import * as React from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  Star,
  MessageSquare,
  Loader2,
  Link2,
  Film,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isValidUrl } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { uploadAssets } from "@/actions/upload";
import { useToast } from "@/components/ui/toast";

export interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  caption?: string;
}

interface MediaUploaderProps {
  mediaList?: MediaItem[];
  items?: MediaItem[];
  onChange: (items: MediaItem[]) => void;
  coverImage?: string;
  onSetCover?: (url: string) => void;
  error?: string;
  onUploadSuccess?: (url: string) => void;
}

export function MediaUploader({
  mediaList,
  items,
  onChange,
  coverImage,
  onSetCover,
  error,
  onUploadSuccess,
}: MediaUploaderProps) {
  const { toast } = useToast();
  const list = items || mediaList || [];
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadCount, setUploadCount] = React.useState(0);

  const [urlInput, setUrlInput] = React.useState("");
  const [captionInput, setCaptionInput] = React.useState("");
  const [urlError, setUrlError] = React.useState<string | undefined>();
  const [mediaToDelete, setMediaToDelete] = React.useState<MediaItem | null>(null);

  // Helper to add media item
  const handleAddMedia = (
    url: string,
    type: "image" | "video" = "image",
    caption: string = ""
  ) => {
    const newItem: MediaItem = {
      id: Math.random().toString(36).substring(2, 9),
      url,
      type,
      caption,
    };
    const updated = [...list, newItem];
    onChange(updated);

    // If no cover image yet and this is the first image, set as cover
    if (!coverImage && onSetCover && type === "image") {
      onSetCover(url);
    }
  };

  // Upload one or multiple files in batch
  const processFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsUploading(true);
    setUploadCount(fileArray.length);

    try {
      const formData = new FormData();
      fileArray.forEach((file) => {
        formData.append("files", file);
      });

      const res = await uploadAssets(formData);

      if (res.success && res.results && res.results.length > 0) {
        const successfulUploads: MediaItem[] = [];
        let successCount = 0;

        res.results.forEach((item, idx) => {
          if (item.success && item.url) {
            successCount++;
            onUploadSuccess?.(item.url);
            successfulUploads.push({
              id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${idx}`,
              url: item.url,
              type: item.type || "image",
              caption:
                item.caption ||
                fileArray[idx]?.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ") ||
                "Artwork Asset",
            });
          } else {
            toast({
              title: "Upload Warning",
              description: item.error || `Failed to upload "${fileArray[idx]?.name}".`,
              type: "error",
            });
          }
        });

        if (successfulUploads.length > 0) {
          const updated = [...list, ...successfulUploads];
          onChange(updated);

          if (!coverImage && onSetCover) {
            const firstImg = successfulUploads.find((m) => m.type === "image");
            if (firstImg) onSetCover(firstImg.url);
          }

          toast({
            title: "Upload Completed",
            description: `Successfully added ${successCount} visual asset(s) to gallery.`,
            type: "success",
          });
        }
      } else {
        toast({
          title: "Upload Failed",
          description: res.error || "Failed to upload selected files.",
          type: "error",
        });
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      toast({
        title: "Upload Error",
        description: "An unexpected error occurred during batch file upload.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
      setUploadCount(0);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Reset input value so the same file can be selected again if needed
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    } else {
      // Check if dropped content is a URL text
      const droppedText = e.dataTransfer.getData("text/plain")?.trim();
      if (droppedText && isValidUrl(droppedText)) {
        const isVideo = droppedText.endsWith(".mp4") || droppedText.endsWith(".webm");
        handleAddMedia(droppedText, isVideo ? "video" : "image", "External Media Asset");
        toast({
          title: "URL Added",
          description: "Visual asset URL added to gallery.",
          type: "success",
        });
      }
    }
  };

  const handleConfirmRemove = () => {
    if (!mediaToDelete) return;
    const target = mediaToDelete;
    const updated = list.filter((m) => m.id !== target.id);
    onChange(updated);

    // If the removed item was the cover image, assign the next available image as cover
    if (coverImage === target.url && onSetCover) {
      const nextImg = updated.find((m) => m.type === "image");
      onSetCover(nextImg ? nextImg.url : (updated[0]?.url || ""));
    }

    setMediaToDelete(null);
  };

  const handleUpdateCaption = (id: string, caption: string) => {
    onChange(list.map((m) => (m.id === id ? { ...m, caption } : m)));
  };

  const handleAddManualUrl = (
    e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent
  ) => {
    if (e) e.preventDefault();
    let trimmed = urlInput.trim();

    if (!trimmed) {
      setUrlError("Please enter an image or video URL.");
      return;
    }

    // If missing protocol but looks like a domain url (e.g. vgen.co/...), prepend https://
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://") && !trimmed.startsWith("/") && !trimmed.startsWith("data:")) {
      trimmed = `https://${trimmed}`;
    }

    if (!isValidUrl(trimmed)) {
      setUrlError("Please enter a valid URL (e.g. https://... or /images/...).");
      return;
    }

    setUrlError(undefined);
    const isVideo = trimmed.endsWith(".mp4") || trimmed.endsWith(".webm");
    handleAddMedia(
      trimmed,
      isVideo ? "video" : "image",
      captionInput.trim() || (isVideo ? "Video Demonstration" : "Artwork Visual Asset")
    );
    setUrlInput("");
    setCaptionInput("");

    toast({
      title: "Media Added",
      description: "Visual asset successfully linked to gallery.",
      type: "success",
    });
  };

  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDropItem = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...list];
    const [movedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, movedItem);

    onChange(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);

    toast({
      title: "Order Updated",
      description: `Moved "${movedItem.caption || `Item #${draggedIndex + 1}`}" to position #${targetIndex + 1}.`,
      type: "success",
    });
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-5">
      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        multiple
        accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm"
        className="hidden"
      />

      {/* Interactive Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`rounded-3xl border-2 border-dashed p-8 text-center transition-all cursor-pointer select-none group relative overflow-hidden ${
          isDragging
            ? "border-amber-400 bg-amber-500/15 scale-[1.01]"
            : "border-zinc-300 dark:border-zinc-700 hover:border-amber-400 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-amber-50/30 dark:hover:bg-zinc-900/80"
        }`}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-3 py-4">
            <Loader2 className="h-10 w-10 text-amber-500 animate-spin" />
            <div>
              <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                Uploading {uploadCount} Visual Asset{uploadCount > 1 ? "s" : ""}...
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Storing securely in Supabase Cloud Storage
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="h-7 w-7" />
            </div>
            <h4 className="text-sm font-bold text-zinc-950 dark:text-white group-hover:text-amber-500 transition-colors">
              Click to Browse or Drag & Drop Visual Assets Here
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-sm mx-auto font-medium">
              Support for PNG, JPG, WEBP, MP4, GIF (up to 50MB per file). Select multiple files at once.
            </p>
          </>
        )}
      </div>

      {/* Manual URL & Caption Input Bar */}
      <div className="space-y-1.5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
          <div className="sm:col-span-6">
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Or paste direct image / video URL (e.g. https://...)..."
                value={urlInput}
                onChange={(e) => {
                  setUrlInput(e.target.value);
                  if (urlError) setUrlError(undefined);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddManualUrl(e);
                  }
                }}
                className={`w-full h-10 rounded-xl border bg-white dark:bg-zinc-900 pl-9 pr-3.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none font-medium transition-colors ${
                  urlError
                    ? "border-rose-500 focus:border-rose-500"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-amber-400"
                }`}
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <input
              type="text"
              placeholder="Asset Caption (e.g. Front View Sheet)..."
              value={captionInput}
              onChange={(e) => setCaptionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddManualUrl(e);
                }
              }}
              className="w-full h-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-amber-400 font-medium"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="button"
              onClick={handleAddManualUrl}
              className="w-full h-10 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold hover:bg-amber-400 hover:text-zinc-950 transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Link</span>
            </button>
          </div>
        </div>
        {urlError && (
          <p className="text-xs text-rose-600 dark:text-rose-400 font-bold px-2">
            {urlError}
          </p>
        )}
      </div>

      {/* Uploaded Media Gallery Items with Interactive Drag & Drop Reordering */}
      {list.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
              Gallery Media Items ({list.length}):
            </label>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Drag cards to arrange sequence.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence initial={false}>
              {list.map((item, idx) => {
                const isCover = coverImage === item.url;
                const isVideo =
                  item.type === "video" ||
                  item.url.endsWith(".mp4") ||
                  item.url.endsWith(".webm");
                const isBeingDragged = draggedIndex === idx;
                const isOverTarget = dragOverIndex === idx && draggedIndex !== idx;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, idx)}
                    onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent<HTMLDivElement>, idx)}
                    onDrop={(e) => handleDropItem(e as unknown as React.DragEvent<HTMLDivElement>, idx)}
                    onDragEnd={handleDragEnd}
                    className={`rounded-2xl border bg-white dark:bg-zinc-900 p-3 space-y-2.5 shadow-sm transition-all relative select-none cursor-grab active:cursor-grabbing ${
                      isBeingDragged
                        ? "opacity-30 scale-95 border-dashed border-amber-500 shadow-none ring-2 ring-amber-400/40"
                        : isOverTarget
                        ? "border-amber-400 ring-4 ring-amber-400/40 scale-[1.03] bg-amber-50/50 dark:bg-amber-950/30"
                        : isCover
                        ? "border-amber-400 ring-2 ring-amber-400/30"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-amber-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    {/* Thumbnail stage with overlaid badges & controls */}
                    <div className="relative rounded-xl overflow-hidden bg-zinc-950 aspect-video group">
                      {isVideo ? (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-300">
                          <Film className="h-8 w-8 text-amber-400 mb-1" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            Video Asset
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={item.url}
                          alt={item.caption || `Gallery media ${idx + 1}`}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover"
                        />
                      )}

                      {/* Top Overlay Badges: Sequence Number & Cover Badge */}
                      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 pointer-events-none">
                        <span className="bg-black/75 backdrop-blur-md text-white border border-white/15 px-2 py-0.5 rounded-lg text-[10px] font-black shadow-md">
                          #{idx + 1}
                        </span>

                        {isCover && (
                          <span className="rounded-lg bg-amber-400 text-zinc-950 px-2 py-0.5 text-[9px] font-black uppercase flex items-center gap-1 shadow-md border border-amber-300">
                            <Star className="h-3 w-3 fill-zinc-950" />
                            Cover
                          </span>
                        )}
                      </div>

                      {/* Hover Action Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                        {onSetCover && !isCover && !isVideo && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSetCover(item.url);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-amber-400 text-zinc-950 text-[11px] font-bold hover:bg-amber-300 transition-colors cursor-pointer shadow-sm"
                            title="Set as Cover Thumbnail"
                          >
                            Set as Cover
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMediaToDelete(item);
                          }}
                          className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors cursor-pointer shadow-sm"
                          title="Remove Media"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Caption Input Field */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                        <MessageSquare className="h-3 w-3 text-amber-500" />
                        <span>Caption / Breakdown Note:</span>
                      </div>
                      <input
                        type="text"
                        value={item.caption || ""}
                        onChange={(e) =>
                          handleUpdateCaption(item.id, e.target.value)
                        }
                        placeholder="e.g. Front View Sheet, Cel-Shading Detail..."
                        className="w-full text-xs px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-amber-400 font-medium"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Delete Media Confirmation Modal */}
      <ConfirmDialog
        isOpen={!!mediaToDelete}
        onClose={() => setMediaToDelete(null)}
        onConfirm={handleConfirmRemove}
        title="Remove Visual Asset?"
        description={
          mediaToDelete ? (
            <div className="space-y-3">
              <p>
                Are you sure you want to remove this visual asset from the portfolio gallery?
              </p>
              <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 w-full overflow-hidden">
                <div className="relative h-14 w-20 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-200 dark:border-zinc-700">
                  <Image
                    src={mediaToDelete.url}
                    alt="Asset preview"
                    fill
                    unoptimized
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-1 overflow-hidden">
                  <p className="font-bold text-xs text-zinc-950 dark:text-white truncate">
                    {mediaToDelete.caption || "Untitled Media Asset"}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono truncate">
                    {mediaToDelete.url}
                  </p>
                </div>
              </div>
              <p className="text-xs text-rose-600 dark:text-rose-400 font-bold">
                This will remove the item from the project visual assets.
              </p>
            </div>
          ) : null
        }
        confirmText="Remove Asset"
        cancelText="Cancel"
        variant="danger"
      />

      {error && (
        <p className="text-xs font-bold text-rose-500 pt-1">
          {error}
        </p>
      )}
    </div>
  );
}