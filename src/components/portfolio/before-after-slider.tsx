"use client";

import * as React from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  beforeLabel?: string;
  afterImage: string;
  afterLabel?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

export function BeforeAfterSlider({
  beforeImage,
  beforeLabel = "Before",
  afterLabel = "After",
  afterImage,
  aspectRatio = "landscape",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMove = React.useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
  };

  const aspectClasses = {
    square: "aspect-square",
    landscape: "aspect-[16/10]",
    portrait: "aspect-[3/4]",
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDragStart={(e) => e.preventDefault()}
      className={`relative w-full ${aspectClasses[aspectRatio]} overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl select-none cursor-ew-resize touch-none`}
      style={{ userSelect: "none", WebkitUserSelect: "none" }}
    >
        {/* After Image (Right clipped layer - smoothly submerges when slider moves to 100%) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none select-none"
          style={{
            clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
          }}
        >
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            unoptimized
            draggable={false}
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
          <span className="absolute bottom-4 right-4 z-10 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md border border-white/20 whitespace-nowrap shadow-lg">
            {afterLabel}
          </span>
        </div>

        {/* Before Image (Left clipped layer - smoothly submerges when slider moves to 0%) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none select-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            unoptimized
            draggable={false}
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
          />
          <span className="absolute bottom-4 left-4 z-10 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-zinc-200 backdrop-blur-md border border-white/20 whitespace-nowrap shadow-lg">
            {beforeLabel}
          </span>
        </div>

        {/* Vertical Divider Bar */}
        <div
          className="absolute inset-y-0 w-0.5 bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular Drag Handle */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-400 bg-zinc-950 text-amber-400 shadow-xl transition-transform ${
              isDragging ? "scale-110" : ""
            }`}
          >
            <MoveHorizontal className="h-5 w-5 animate-pulse" />
          </div>
        </div>
      </div>
  );
}
