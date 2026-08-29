"use client";

import * as React from "react";
import { X, Plus, Check, Tag as TagIcon } from "lucide-react";
import { INITIAL_TAGS } from "@/lib/mock-data";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export interface TagSelectorProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  availablePresets?: string[];
  error?: string;
}

export function TagSelector({
  selectedTags,
  onChange,
  availablePresets = INITIAL_TAGS,
  error,
}: TagSelectorProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [showClearConfirm, setShowClearConfirm] = React.useState(false);

  const handleAddTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim().replace(/^#+/, "");
    if (!trimmed) return;
    if (!selectedTags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      onChange([...selectedTags, trimmed]);
    }
    setInputValue("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(selectedTags.filter((t) => t !== tagToRemove));
  };

  const handleConfirmClear = () => {
    onChange([]);
    setShowClearConfirm(false);
  };

  const handleTogglePreset = (preset: string) => {
    const exists = selectedTags.some(
      (t) => t.toLowerCase() === preset.toLowerCase()
    );
    if (exists) {
      onChange(selectedTags.filter((t) => t.toLowerCase() !== preset.toLowerCase()));
    } else {
      onChange([...selectedTags, preset]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && selectedTags.length > 0) {
      handleRemoveTag(selectedTags[selectedTags.length - 1]);
    }
  };

  return (
    <div className="space-y-3">
      {/* 1. Active Selected Tags Display */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <TagIcon className="h-3.5 w-3.5 text-amber-500" />
            <span>Project Tags ({selectedTags.length})</span>
          </label>
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="text-[11px] font-bold text-rose-500 hover:text-rose-600 hover:underline cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        <div
          className={`min-h-[46px] p-2.5 rounded-2xl border bg-white dark:bg-zinc-900 flex flex-wrap items-center gap-1.5 transition-colors ${
            error
              ? "border-rose-500 dark:border-rose-500 bg-rose-50/20 dark:bg-rose-950/10"
              : "border-zinc-300 dark:border-zinc-700 focus-within:border-amber-400"
          }`}
        >
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-950 dark:bg-amber-400/20 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 animate-in fade-in zoom-in-95 duration-100"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="p-0.5 rounded-md hover:bg-amber-200 dark:hover:bg-amber-400/30 text-amber-800 dark:text-amber-200 cursor-pointer"
                title={`Remove #${tag}`}
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          {/* Custom Tag Text Input inside pill container */}
          <input
            type="text"
            placeholder={
              selectedTags.length === 0
                ? "Type custom tag (press Enter or comma) or select presets below..."
                : "Type custom tag..."
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[180px] bg-transparent text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none py-1 px-1.5 font-medium"
          />

          {inputValue.trim() && (
            <button
              type="button"
              onClick={() => handleAddTag(inputValue)}
              className="px-2.5 py-1 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold hover:bg-amber-400 hover:text-zinc-950 transition-colors cursor-pointer"
            >
              + Add
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs text-rose-600 dark:text-rose-400 font-bold px-1">
            {error}
          </p>
        )}
      </div>

      {/* 2. Studio Master Preset Tags Chips */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
          Studio Preset Tags &mdash; click to toggle:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {availablePresets.map((preset) => {
            const isSelected = selectedTags.some(
              (t) => t.toLowerCase() === preset.toLowerCase()
            );
            return (
              <button
                key={preset}
                type="button"
                onClick={() => handleTogglePreset(preset)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                  isSelected
                    ? "bg-amber-400 text-zinc-950 border border-amber-400 shadow-sm font-extrabold"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60 hover:border-amber-400 hover:text-zinc-950 dark:hover:text-white"
                }`}
              >
                {isSelected ? (
                  <Check className="h-3 w-3 text-zinc-950" />
                ) : (
                  <Plus className="h-3 w-3 text-zinc-400" />
                )}
                <span>#{preset}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear All Confirmation Modal */}
      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={handleConfirmClear}
        title="Clear All Project Tags?"
        description={`Are you sure you want to remove all ${selectedTags.length} tags assigned to this portfolio item?`}
        confirmText="Clear All Tags"
        cancelText="Keep Tags"
        variant="danger"
      />
    </div>
  );
}
