"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { useAdminLayout } from "@/components/admin/admin-layout-wrapper";
import { MediaUploader, MediaItem } from "@/components/admin/media-uploader";
import { TagSelector } from "@/components/admin/tag-selector";
import { CustomSelect } from "@/components/ui/custom-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";

import { createArtwork } from "@/actions/portfolio";
import { getCategories } from "@/actions/categories";
import { getTags } from "@/actions/tags";
import { deleteAssets } from "@/actions/upload";

const DRAFT_STORAGE_KEY = "ayamu_portfolio_draft_new";

export default function NewPortfolioItemPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { toggleMobile } = useAdminLayout();

  const [categories, setCategories] = React.useState<{ slug: string; name: string }[]>([]);
  const [availablePresetTags, setAvailablePresetTags] = React.useState<string[]>([]);
  const [isSaving, setIsSaving] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [sessionUploadedUrls, setSessionUploadedUrls] = React.useState<string[]>([]);

  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [category, setCategory] = React.useState("illustration");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([
    "Clip Studio Paint",
    "Cel Shading",
    "Anime Pop",
  ]);
  const [year, setYear] = React.useState("2026");
  const [client, setClient] = React.useState("Studio Original");
  const [roles, setRoles] = React.useState("Character Concept, Line Art, Color Rendering");
  const [tools, setTools] = React.useState("Clip Studio Paint, Adobe Photoshop");
  const [description, setDescription] = React.useState("");
  const [conceptStory, setConceptStory] = React.useState("");
  const [aspectRatio, setAspectRatio] = React.useState<"landscape" | "portrait" | "square">("landscape");
  const [isFeatured, setIsFeatured] = React.useState(false);
  const [status, setStatus] = React.useState<string>("published");

  // Initial media items start completely empty as requested
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

  // Load Categories, Tags & restore Draft from SessionStorage
  React.useEffect(() => {
    async function loadData() {
      const [cats, tags] = await Promise.all([getCategories(), getTags()]);
      setCategories(cats);
      setAvailablePresetTags(tags);

      // Check for saved draft in SessionStorage
      try {
        const savedDraft = sessionStorage.getItem(DRAFT_STORAGE_KEY);
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          if (parsed.title) setTitle(parsed.title);
          if (parsed.slug) setSlug(parsed.slug);
          if (parsed.subtitle) setSubtitle(parsed.subtitle);
          if (parsed.category) setCategory(parsed.category);
          if (parsed.selectedTags) setSelectedTags(parsed.selectedTags);
          if (parsed.year) setYear(parsed.year);
          if (parsed.client) setClient(parsed.client);
          if (parsed.roles) setRoles(parsed.roles);
          if (parsed.tools) setTools(parsed.tools);
          if (parsed.description) setDescription(parsed.description);
          if (parsed.conceptStory) setConceptStory(parsed.conceptStory);
          if (parsed.aspectRatio) setAspectRatio(parsed.aspectRatio);
          if (parsed.isFeatured !== undefined) setIsFeatured(parsed.isFeatured);
          if (parsed.status) setStatus(parsed.status);
          if (parsed.mediaList) setMediaList(parsed.mediaList);
          if (parsed.coverImage) setCoverImage(parsed.coverImage);
          if (parsed.hasBeforeAfter !== undefined) setHasBeforeAfter(parsed.hasBeforeAfter);
          if (parsed.beforeImage) setBeforeImage(parsed.beforeImage);
          if (parsed.afterImage) setAfterImage(parsed.afterImage);
        }
      } catch (err) {
        console.warn("Could not restore draft from storage:", err);
      }

      setIsInitialized(true);
    }
    loadData();
  }, []);

  // Save draft to SessionStorage when fields update
  React.useEffect(() => {
    if (!isInitialized) return;
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
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Ignore storage errors (quota/incognito)
    }
  }, [
    isInitialized,
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
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (titleError) setTitleError(undefined);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
      if (slugError) setSlugError(undefined);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    if (slugError) setSlugError(undefined);
  };

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

    const res = await createArtwork(
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
        title: "Creation Failed",
        description: res.error || "Failed to create artwork in database.",
        type: "error",
      });
      return;
    }

    // Clear saved draft upon successful publish
    clearDraft();

    toast({
      title: "Portfolio Item Created!",
      description: `"${title}" was successfully added to the studio vault.`,
      type: "success",
    });

    router.push("/admin/portfolio");
    router.refresh();
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      {/* Fixed Topbar */}
      <AdminHeader
        title="Create New Portfolio Item"
        subtitle="Add a new artwork or project to the Ayamu Labs showcase repository."
        onMenuClick={toggleMobile}
      />

      {/* Full-width Scrollable Viewport (Scrollbar pinned to far right of screen) */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/admin/portfolio"
              onClick={() => clearDraft(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm group cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
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
                    onChange={handleTitleChange}
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
                    onChange={handleSlugChange}
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
                    placeholder="Ayamu Labs Original IP / Neo Tokyo Records"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Studio Roles (comma-separated)
                  </label>
                  <Input
                    value={roles}
                    onChange={(e) => setRoles(e.target.value)}
                    placeholder="Character Concept, Line Art, Color Rendering"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Software & Tools (comma-separated)
                  </label>
                  <Input
                    value={tools}
                    onChange={(e) => setTools(e.target.value)}
                    placeholder="Clip Studio Paint, Photoshop, Wacom Cintiq"
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

            {/* 2. Visual Media Uploads */}
            <section id="field-media" className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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

              {mediaError && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/40 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-800">
                  {mediaError}
                </p>
              )}

              {/* Multiple Gallery Media Items */}
              <div className="pt-2">
                <MediaUploader
                  items={mediaList}
                  onChange={handleMediaChange}
                  coverImage={coverImage}
                  onSetCover={setCoverImage}
                  onUploadSuccess={(url) =>
                    setSessionUploadedUrls((prev) => [...prev, url])
                  }
                />
              </div>
            </section>

            {/* 3. Before/After Interactive Comparison */}
            <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
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

            {/* 5. Publishing Visibility & Status */}
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

            {/* Action buttons */}
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
                <span>{isSaving ? "Publishing..." : "Publish to Portfolio"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
