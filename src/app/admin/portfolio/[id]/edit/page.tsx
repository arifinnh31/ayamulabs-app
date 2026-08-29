"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { useAdminLayout } from "@/components/admin/admin-layout-wrapper";
import { MediaUploader, MediaItem } from "@/components/admin/media-uploader";
import { TagSelector } from "@/components/admin/tag-selector";
import { CustomSelect } from "@/components/ui/custom-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { getArtworks, updateArtwork } from "@/actions/portfolio";
import { getCategories } from "@/actions/categories";
import { getTags } from "@/actions/tags";
import { deleteAssets } from "@/actions/upload";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditPortfolioItemPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { toggleMobile } = useAdminLayout();
  const id = params?.id as string;

  const [categories, setCategories] = React.useState<{ slug: string; name: string }[]>([]);
  const [availablePresetTags, setAvailablePresetTags] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSaving, setIsSaving] = React.useState(false);
  const [sessionUploadedUrls, setSessionUploadedUrls] = React.useState<string[]>([]);

  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [category, setCategory] = React.useState("illustration");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
  const [year, setYear] = React.useState("2026");
  const [client, setClient] = React.useState("");
  const [roles, setRoles] = React.useState("");
  const [tools, setTools] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [conceptStory, setConceptStory] = React.useState("");
  const [aspectRatio, setAspectRatio] = React.useState<"landscape" | "portrait" | "square">("landscape");
  const [isFeatured, setIsFeatured] = React.useState(true);
  const [status, setStatus] = React.useState<string>("published");

  const [mediaList, setMediaList] = React.useState<MediaItem[]>([]);
  const [coverImage, setCoverImage] = React.useState("");

  // Before/After comparison fields
  const [hasBeforeAfter, setHasBeforeAfter] = React.useState(false);
  const [beforeImage, setBeforeImage] = React.useState("");
  const [afterImage, setAfterImage] = React.useState("");

  // Validation errors
  const [titleError, setTitleError] = React.useState<string | undefined>();
  const [slugError, setSlugError] = React.useState<string | undefined>();
  const [mediaError, setMediaError] = React.useState<string | undefined>();
  const [isInitialized, setIsInitialized] = React.useState(false);

  const draftKey = `ayamu_portfolio_draft_edit_${id}`;

  React.useEffect(() => {
    async function loadItem() {
      setIsLoading(true);
      const [allArtworks, cats, tags] = await Promise.all([
        getArtworks({ status: "all" }),
        getCategories(),
        getTags(),
      ]);

      setCategories(cats);
      setAvailablePresetTags(tags);

      const existing = allArtworks.find((a) => a.id === id || a.slug === id);
      if (existing) {
        // Check if there is an unsaved draft in sessionStorage first
        let restoredFromDraft = false;
        try {
          const savedDraft = sessionStorage.getItem(draftKey);
          if (savedDraft) {
            const parsed = JSON.parse(savedDraft);
            setTitle(parsed.title ?? existing.title);
            setSlug(parsed.slug ?? existing.slug);
            setSubtitle(parsed.subtitle ?? existing.subtitle ?? "");
            setCategory(parsed.category ?? existing.category);
            setSelectedTags(parsed.selectedTags ?? existing.tags);
            setYear(parsed.year ?? existing.year);
            setClient(parsed.client ?? existing.client ?? "");
            setRoles(parsed.roles ?? existing.role.join(", "));
            setTools(parsed.tools ?? existing.tools.join(", "));
            setDescription(parsed.description ?? existing.description);
            setConceptStory(parsed.conceptStory ?? existing.conceptStory);
            setAspectRatio(parsed.aspectRatio ?? existing.aspectRatio);
            setIsFeatured(parsed.isFeatured !== undefined ? parsed.isFeatured : existing.isFeatured);
            setStatus(parsed.status ?? existing.status);
            setCoverImage(parsed.coverImage ?? existing.coverImage);
            setMediaList(
              parsed.mediaList ??
                existing.gallery.map((g, idx) => ({
                  id: `med-${idx}`,
                  url: g.url,
                  type: g.type,
                  caption: g.caption,
                }))
            );
            if (parsed.hasBeforeAfter !== undefined) {
              setHasBeforeAfter(parsed.hasBeforeAfter);
              setBeforeImage(parsed.beforeImage ?? "");
              setAfterImage(parsed.afterImage ?? "");
            } else if (existing.beforeAfter) {
              setHasBeforeAfter(true);
              setBeforeImage(existing.beforeAfter.beforeImage);
              setAfterImage(existing.beforeAfter.afterImage);
            }
            restoredFromDraft = true;
          }
        } catch {
          // ignore
        }

        if (!restoredFromDraft) {
          setTitle(existing.title);
          setSlug(existing.slug);
          setSubtitle(existing.subtitle || "");
          setCategory(existing.category);
          setSelectedTags(existing.tags);
          setYear(existing.year);
          setClient(existing.client || "");
          setRoles(existing.role.join(", "));
          setTools(existing.tools.join(", "));
          setDescription(existing.description);
          setConceptStory(existing.conceptStory);
          setAspectRatio(existing.aspectRatio);
          setIsFeatured(existing.isFeatured);
          setStatus(existing.status);
          setCoverImage(existing.coverImage);
          setMediaList(
            existing.gallery.map((g, idx) => ({
              id: `med-${idx}`,
              url: g.url,
              type: g.type,
              caption: g.caption,
            }))
          );
          if (existing.beforeAfter) {
            setHasBeforeAfter(true);
            setBeforeImage(existing.beforeAfter.beforeImage);
            setAfterImage(existing.beforeAfter.afterImage);
          }
        }
      }
      setIsLoading(false);
      setIsInitialized(true);
    }
    loadItem();
  }, [id, draftKey]);

  // Persist draft on edit
  React.useEffect(() => {
    if (!isInitialized || isLoading) return;
    try {
      const draft = {
        title,
        slug,
        subtitle,
        category,
        selectedTags,
        year,
        client,
        roles,
        tools,
        description,
        conceptStory,
        aspectRatio,
        isFeatured,
        status,
        mediaList,
        coverImage,
        hasBeforeAfter,
        beforeImage,
        afterImage,
      };
      sessionStorage.setItem(draftKey, JSON.stringify(draft));
    } catch {
      // ignore
    }
  }, [
    isInitialized,
    isLoading,
    draftKey,
    title,
    slug,
    subtitle,
    category,
    selectedTags,
    year,
    client,
    roles,
    tools,
    description,
    conceptStory,
    aspectRatio,
    isFeatured,
    status,
    mediaList,
    coverImage,
    hasBeforeAfter,
    beforeImage,
    afterImage,
  ]);

  const clearDraft = (isCancel: boolean = false) => {
    try {
      sessionStorage.removeItem(draftKey);
    } catch {
      // ignore
    }
    if (isCancel && sessionUploadedUrls.length > 0) {
      deleteAssets(sessionUploadedUrls);
    }
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.slug,
    label: cat.name,
  }));

  const statusOptions = [
    { value: "published", label: "Published (Live)" },
    { value: "draft", label: "Draft (Hidden)" },
  ];

  const handleMediaChange = (newMedia: MediaItem[]) => {
    setMediaList(newMedia);
    if (mediaError) setMediaError(undefined);
    if (newMedia.length > 0) {
      if (!newMedia.some((m) => m.url === coverImage)) {
        setCoverImage(newMedia[0].url);
      }
      if (!newMedia.some((m) => m.url === beforeImage)) {
        setBeforeImage(newMedia[0].url);
      }
      if (!newMedia.some((m) => m.url === afterImage)) {
        setAfterImage(newMedia[newMedia.length > 1 ? 1 : 0].url);
      }
    } else {
      setCoverImage("");
      setBeforeImage("");
      setAfterImage("");
    }
  };

  const scrollToFirstError = (elementId: string) => {
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = el.querySelector("input, textarea, select") as HTMLElement | null;
        if (input && typeof input.focus === "function") {
          input.focus();
        }
      }
    }, 60);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    let firstErrorField = "";

    if (!title.trim()) {
      setTitleError("Project title is required.");
      hasError = true;
      if (!firstErrorField) firstErrorField = "field-title";
    } else {
      setTitleError(undefined);
    }

    if (!slug.trim()) {
      setSlugError("URL Slug is required.");
      hasError = true;
      if (!firstErrorField) firstErrorField = "field-slug";
    } else if (!/^[a-z0-9-]+$/.test(slug.trim())) {
      setSlugError("URL Slug can only contain lowercase alphanumeric characters and hyphens.");
      hasError = true;
      if (!firstErrorField) firstErrorField = "field-slug";
    } else {
      setSlugError(undefined);
    }

    if (mediaList.length === 0 || !coverImage.trim()) {
      setMediaError("Please add at least one visual asset for this portfolio item.");
      hasError = true;
      if (!firstErrorField) firstErrorField = "field-media";
    } else {
      setMediaError(undefined);
    }

    if (hasError) {
      scrollToFirstError(firstErrorField);
      return;
    }

    setIsSaving(true);
    const finalSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-");

    // Dynamic stage labels derived directly from captions of selected before/after images
    const dynamicBeforeLabel =
      mediaList.find((m) => m.url === beforeImage)?.caption?.trim() || "Rough Sketch";
    const dynamicAfterLabel =
      mediaList.find((m) => m.url === afterImage)?.caption?.trim() || "Final Render";

    const res = await updateArtwork(
      id,
      {
        title: title.trim(),
        slug: finalSlug,
        subtitle: subtitle.trim(),
        category,
        year,
        client: client.trim(),
        roles: roles.split(",").map((r) => r.trim()).filter(Boolean),
        tools: tools.split(",").map((t) => t.trim()).filter(Boolean),
        description: description.trim(),
        conceptStory: conceptStory.trim(),
        coverImage,
        aspectRatio,
        status: status === "published" ? "published" : "draft",
        isFeatured,
        tags: selectedTags,
        gallery: mediaList.map((m) => ({
          type: m.type,
          url: m.url,
          caption: m.caption || "",
        })),
        beforeAfter: hasBeforeAfter
          ? {
              beforeImage: beforeImage || mediaList[0]?.url || "",
              beforeLabel: dynamicBeforeLabel,
              afterImage: afterImage || mediaList[1]?.url || mediaList[0]?.url || "",
              afterLabel: dynamicAfterLabel,
            }
          : undefined,
      },
      sessionUploadedUrls
    );

    setIsSaving(false);

    if (!res.success) {
      if (res.fieldErrors?.slug || (res.error && res.error.toLowerCase().includes("slug"))) {
        setSlugError(res.fieldErrors?.slug || "This URL slug is already taken. Please choose a different unique slug.");
        scrollToFirstError("field-slug");
        return;
      }

      toast({
        title: "Update Failed",
        description: res.error || "Failed to update artwork.",
        type: "error",
      });
      return;
    }

    clearDraft();

    toast({
      title: "Portfolio Item Updated!",
      description: `"${title}" has been saved.`,
      type: "success",
    });

    router.push("/admin/portfolio");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
        {/* Topbar Skeleton */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 px-6 py-4 flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-6 w-48 rounded-lg" />
            <Skeleton className="h-3.5 w-64 rounded-md" />
          </div>
          <Skeleton className="h-9 w-28 rounded-xl bg-amber-400/20" />
        </div>

        {/* Form Viewport Skeleton (Full-width Scrollable Viewport) */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <Skeleton className="h-6 w-44 rounded-lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-28 w-full rounded-xl" />
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-6 sm:p-8 space-y-6 shadow-sm">
              <Skeleton className="h-6 w-36 rounded-lg" />
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Fixed Topbar */}
      <AdminHeader
        title="Edit Portfolio Item"
        subtitle={`Updating artwork details for "${title}".`}
        onMenuClick={toggleMobile}
      />

      {/* Full-width Scrollable Viewport */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl w-full mx-auto">
          {/* Header Action Bar */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/portfolio"
              onClick={() => clearDraft(true)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portfolio List</span>
            </Link>
          </div>

          <form onSubmit={handleSave} noValidate className="space-y-8 pb-12">
            {/* 1. Basic Metadata */}
            <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                1. Basic Project Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div id="field-title" className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Project Title *
                  </label>
                  <Input
                    placeholder="e.g. Ayamu: The Golden Awakening"
                    value={title}
                    error={titleError}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (titleError) setTitleError(undefined);
                    }}
                  />
                </div>

                <div id="field-slug" className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    URL Slug *
                  </label>
                  <Input
                    placeholder="ayamu-the-golden-awakening"
                    value={slug}
                    error={slugError}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      if (slugError) setSlugError(undefined);
                    }}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Category
                  </label>
                  <CustomSelect
                    value={category}
                    onChange={setCategory}
                    options={categoryOptions}
                    placeholder="Select category"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Subtitle / One-line Summary
                  </label>
                  <Input
                    placeholder="e.g. Original Studio Character Showcase & Cel-Shading Exploration"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Production Year
                  </label>
                  <Input
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Client / Initiative Name
                  </label>
                  <Input
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Ayamu Labs Original IP"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Studio Roles (comma-separated)
                  </label>
                  <Input
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    placeholder="Lead Illustrator, Character Design"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Software & Tools (comma-separated)
                  </label>
                  <Input
                    value={tools}
                    onChange={(e) => setTools(e.target.value)}
                    placeholder="Clip Studio Paint, Photoshop"
                  />
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <TagSelector
                    selectedTags={selectedTags}
                    onChange={setSelectedTags}
                    availablePresets={availablePresetTags.length > 0 ? availablePresetTags : undefined}
                  />
                </div>
              </div>
            </section>

            {/* 2. Visual Media & Gallery Assets */}
            <section id="field-media" className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                    2. Visual Media & Gallery Assets *
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 font-medium">
                    Upload visual assets and click &ldquo;Set as Cover&rdquo; on your primary key visual.
                  </p>
                </div>

                {/* Aspect Ratio Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                    Ratio:
                  </span>
                  <div className="flex gap-1.5">
                    {(["landscape", "portrait", "square"] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setAspectRatio(ratio)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          aspectRatio === ratio
                            ? "bg-amber-400 text-zinc-950 border-amber-400 shadow-sm font-extrabold"
                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                        }`}
                      >
                        {ratio.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <MediaUploader
                mediaList={mediaList}
                onChange={handleMediaChange}
                coverImage={coverImage}
                onSetCover={setCoverImage}
                error={mediaError}
                onUploadSuccess={(url) =>
                  setSessionUploadedUrls((prev) => [...prev, url])
                }
              />
            </section>

            {/* 3. Interactive Before / After Comparison */}
            <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                    3. Interactive Before / After Comparison
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Showcase your creative process with an interactive slider.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBeforeAfter}
                    onChange={(e) => setHasBeforeAfter(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                </label>
              </div>

              {hasBeforeAfter && (
                <div className="space-y-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  {mediaList.length < 2 ? (
                    <div className="rounded-2xl border border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 p-6 text-center">
                      <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                        Please upload at least 2 visual assets in Section 2 above to select Before and After comparison stages.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Stage 1: Before */}
                      <div className="rounded-2xl border border-cyan-200 dark:border-cyan-900/50 bg-cyan-50/30 dark:bg-cyan-950/10 p-4 space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                            Stage 1 &mdash; Before (Sketch / Draft)
                          </span>
                          <span className="text-[10px] bg-cyan-500 text-white font-bold px-2 py-0.5 rounded-full">
                            Before Step
                          </span>
                        </div>

                        {/* Visual Preview */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                          <Image
                            src={beforeImage || mediaList[0].url}
                            alt="Before preview"
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover"
                          />
                        </div>

                        {/* Realtime Caption Display as Stage Label */}
                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5">
                          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase">
                            Stage Label (from Image Caption):
                          </span>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 truncate">
                            {mediaList.find((m) => m.url === beforeImage)?.caption?.trim() || "Rough Sketch"}
                          </p>
                        </div>

                        {/* Thumbnail Selector */}
                        <div className="space-y-1.5 pt-1">
                          <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                            Select Before Image from Gallery:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {mediaList.map((m, idx) => {
                              const isSelected = (beforeImage || mediaList[0].url) === m.url;
                              return (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => setBeforeImage(m.url)}
                                  className={`relative h-14 w-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                    isSelected
                                      ? "border-cyan-500 ring-2 ring-cyan-400/50 shadow-md scale-105"
                                      : "border-zinc-200 dark:border-zinc-700 opacity-60 hover:opacity-100"
                                  }`}
                                  title={m.caption || `Image ${idx + 1}`}
                                >
                                  <Image
                                    src={m.url}
                                    alt={`Thumb ${idx + 1}`}
                                    fill
                                    unoptimized
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                  {isSelected && (
                                    <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                                      <span className="bg-cyan-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                        Selected
                                      </span>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Stage 2: After */}
                      <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10 p-4 space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                            Stage 2 &mdash; After (Final / Masterpiece)
                          </span>
                          <span className="text-[10px] bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-full">
                            After Step
                          </span>
                        </div>

                        {/* Visual Preview */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                          <Image
                            src={afterImage || (mediaList[1] || mediaList[0]).url}
                            alt="After preview"
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover"
                          />
                        </div>

                        {/* Realtime Caption Display as Stage Label */}
                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2.5">
                          <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 block uppercase">
                            Stage Label (from Image Caption):
                          </span>
                          <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 truncate">
                            {mediaList.find((m) => m.url === afterImage)?.caption?.trim() || (mediaList[1] || mediaList[0])?.caption?.trim() || "Final Render"}
                          </p>
                        </div>

                        {/* Thumbnail Selector */}
                        <div className="space-y-1.5 pt-1">
                          <label className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
                            Select After Image from Gallery:
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {mediaList.map((m, idx) => {
                              const isSelected = (afterImage || (mediaList[1] || mediaList[0]).url) === m.url;
                              return (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => setAfterImage(m.url)}
                                  className={`relative h-14 w-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                    isSelected
                                      ? "border-emerald-500 ring-2 ring-emerald-400/50 shadow-md scale-105"
                                      : "border-zinc-200 dark:border-zinc-700 opacity-60 hover:opacity-100"
                                  }`}
                                  title={m.caption || `Image ${idx + 1}`}
                                >
                                  <Image
                                    src={m.url}
                                    alt={`Thumb ${idx + 1}`}
                                    fill
                                    unoptimized
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                  {isSelected && (
                                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                                      <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                                        Selected
                                      </span>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* 4. Narrative & Case Study Content */}
            <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                4. Narrative & Case Study Content
              </h3>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Project Overview / Description
                  </label>
                  <Textarea
                    placeholder="Detail the creative brief, core vision, and thematic atmosphere..."
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Concept Story & Creative Process
                  </label>
                  <Textarea
                    placeholder="Break down line weight philosophy, layer management, lighting moods..."
                    rows={4}
                    value={conceptStory}
                    onChange={(e) => setConceptStory(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* 5. Publishing Controls & Visibility */}
            <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-950 dark:text-white">
                5. Publishing Visibility & Status
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Publishing Status
                  </label>
                  <CustomSelect
                    value={status}
                    onChange={setStatus}
                    options={statusOptions}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                  <div>
                    <span className="text-sm font-bold text-zinc-950 dark:text-white">
                      Featured Artwork
                    </span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Display prominently in homepage hero showcase
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
                  </label>
                </div>
              </div>
            </section>

            {/* Submit Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Link
                href="/admin/portfolio"
                onClick={() => clearDraft(true)}
                className="px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-xs sm:text-sm bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{isSaving ? "Saving Changes..." : "Save Changes"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}