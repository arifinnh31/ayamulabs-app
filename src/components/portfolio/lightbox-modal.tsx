"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import { PortfolioItem } from "@/lib/mock-data";
import { VGenButton } from "@/components/commission/vgen-button";
import { FiverrButton } from "@/components/commission/fiverr-button";
import { motion, AnimatePresence } from "framer-motion";

interface LightboxModalProps {
  artwork: PortfolioItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export function LightboxModal({
  artwork,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [transform, setTransform] = React.useState({ scale: 1, x: 0, y: 0 });
  const transformRef = React.useRef({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = React.useState(0);
  const [prevArtworkId, setPrevArtworkId] = React.useState<string | null>(null);

  const viewerRef = React.useRef<HTMLDivElement>(null);
  const dragStartRef = React.useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  // Reset state when artwork changes
  if (artwork && artwork.id !== prevArtworkId) {
    setPrevArtworkId(artwork.id);
    setTransform({ scale: 1, x: 0, y: 0 });
    setSelectedMediaIndex(0);
  }

  // Keep transformRef synced with transform state
  React.useEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  const handleZoomIn = React.useCallback(() => {
    const current = transformRef.current;
    const newScale = Math.min(current.scale * 1.25, 5.0);
    const ratio = newScale / current.scale;
    const next = {
      scale: newScale,
      x: current.x * ratio,
      y: current.y * ratio,
    };
    transformRef.current = next;
    setTransform(next);
  }, []);

  const handleZoomOut = React.useCallback(() => {
    const current = transformRef.current;
    const newScale = Math.max(current.scale / 1.25, 0.6);
    const ratio = newScale / current.scale;
    const next = {
      scale: newScale,
      x: newScale <= 1 ? 0 : current.x * ratio,
      y: newScale <= 1 ? 0 : current.y * ratio,
    };
    transformRef.current = next;
    setTransform(next);
  }, []);

  const handleResetZoom = React.useCallback(() => {
    const next = { scale: 1, x: 0, y: 0 };
    transformRef.current = next;
    setTransform(next);
  }, []);

  // 100% synchronous GeoGebra 2D graph fixed-point zoom
  React.useEffect(() => {
    if (!artwork) return;
    const viewer = viewerRef.current;
    if (!viewer) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = viewer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Cursor position relative to center of viewer
      const cursorX = e.clientX - centerX;
      const cursorY = e.clientY - centerY;

      const { scale: currentScale, x: currentX, y: currentY } = transformRef.current;

      const zoomFactor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      const newScale = Math.min(Math.max(currentScale * zoomFactor, 0.6), 5.0);
      const actualRatio = newScale / currentScale;

      // Exact GeoGebra coordinate mapping:
      // Keep image point (cursorX - currentX) / currentScale stationary under cursor
      let newX = cursorX - (cursorX - currentX) * actualRatio;
      let newY = cursorY - (cursorY - currentY) * actualRatio;

      if (newScale <= 1) {
        newX = 0;
        newY = 0;
      }

      const nextTransform = {
        scale: newScale,
        x: newX,
        y: newY,
      };

      transformRef.current = nextTransform;
      setTransform(nextTransform);
    };

    // Mobile Pinch-to-Zoom (2 fingers) and 1-finger pan gesture
    let initialPinchDist = 0;
    let initialPinchScale = 1;
    let pinchCenterX = 0;
    let pinchCenterY = 0;
    let initialPinchX = 0;
    let initialPinchY = 0;
    let isPinching = false;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchInitialX = 0;
    let touchInitialY = 0;
    let isTouchDragging = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        isPinching = true;
        isTouchDragging = false;
        setIsDragging(true);
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        initialPinchDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        initialPinchScale = transformRef.current.scale;
        initialPinchX = transformRef.current.x;
        initialPinchY = transformRef.current.y;

        const rect = viewer.getBoundingClientRect();
        const midX = (t1.clientX + t2.clientX) / 2;
        const midY = (t1.clientY + t2.clientY) / 2;
        pinchCenterX = midX - (rect.left + rect.width / 2);
        pinchCenterY = midY - (rect.top + rect.height / 2);
      } else if (e.touches.length === 1 && transformRef.current.scale > 1) {
        isTouchDragging = true;
        setIsDragging(true);
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchInitialX = transformRef.current.x;
        touchInitialY = transformRef.current.y;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isPinching && e.touches.length === 2) {
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        if (initialPinchDist > 0) {
          const pinchFactor = currentDist / initialPinchDist;
          const newScale = Math.min(Math.max(initialPinchScale * pinchFactor, 0.6), 5.0);
          const actualRatio = newScale / initialPinchScale;

          let newX = pinchCenterX - (pinchCenterX - initialPinchX) * actualRatio;
          let newY = pinchCenterY - (pinchCenterY - initialPinchY) * actualRatio;

          if (newScale <= 1) {
            newX = 0;
            newY = 0;
          }

          const nextTransform = {
            scale: newScale,
            x: newX,
            y: newY,
          };

          transformRef.current = nextTransform;
          setTransform(nextTransform);
        }
      } else if (isTouchDragging && e.touches.length === 1 && transformRef.current.scale > 1) {
        e.preventDefault();
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        const nextTransform = {
          ...transformRef.current,
          x: touchInitialX + dx,
          y: touchInitialY + dy,
        };
        transformRef.current = nextTransform;
        setTransform(nextTransform);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        isPinching = false;
      }
      if (e.touches.length === 0) {
        isTouchDragging = false;
        setIsDragging(false);
      }
    };

    viewer.addEventListener("wheel", onWheel, { passive: false });
    viewer.addEventListener("touchstart", onTouchStart, { passive: true });
    viewer.addEventListener("touchmove", onTouchMove, { passive: false });
    viewer.addEventListener("touchend", onTouchEnd, { passive: true });
    viewer.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      viewer.removeEventListener("wheel", onWheel);
      viewer.removeEventListener("touchstart", onTouchStart);
      viewer.removeEventListener("touchmove", onTouchMove);
      viewer.removeEventListener("touchend", onTouchEnd);
      viewer.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [artwork]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (transformRef.current.scale <= 1 || e.button !== 0) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: transformRef.current.x,
      posY: transformRef.current.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || transformRef.current.scale <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const nextTransform = {
      ...transformRef.current,
      x: dragStartRef.current.posX + dx,
      y: dragStartRef.current.posY + dy,
    };
    transformRef.current = nextTransform;
    setTransform(nextTransform);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      setIsDragging(false);
    }
  };

  const handleClose = React.useCallback(() => {
    const next = { scale: 1, x: 0, y: 0 };
    transformRef.current = next;
    setTransform(next);
    setSelectedMediaIndex(0);
    onClose();
  }, [onClose]);

  const handlePrev = React.useCallback(() => {
    if (!onPrev) return;
    const next = { scale: 1, x: 0, y: 0 };
    transformRef.current = next;
    setTransform(next);
    setSelectedMediaIndex(0);
    onPrev();
  }, [onPrev]);

  const handleNext = React.useCallback(() => {
    if (!onNext) return;
    const next = { scale: 1, x: 0, y: 0 };
    transformRef.current = next;
    setTransform(next);
    setSelectedMediaIndex(0);
    onNext();
  }, [onNext]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!artwork) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" && onNext) handleNext();
      if (e.key === "ArrowLeft" && onPrev) handlePrev();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [artwork, handleClose, handleNext, handlePrev, onNext, onPrev, handleZoomIn, handleZoomOut]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {artwork && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[9990] flex flex-col bg-black/95 text-white backdrop-blur-2xl select-none"
        >
          {/* Top Controls Bar */}
          <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-4 border-b border-white/10 bg-black/60 backdrop-blur-md z-30 gap-2 sm:gap-4">
            {/* Left title & badge */}
            <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 shrink-0">
                <Eye className="h-3.5 w-3.5" />
                4K Media Inspector
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <h3 className="text-xs sm:text-base font-bold text-white truncate min-w-0">
                {artwork.title}
              </h3>
            </div>

            {/* Right controls (Zoom + Close) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Zoom controls */}
              <div className="flex items-center gap-0.5 sm:gap-1 bg-white/10 rounded-full p-0.5 sm:p-1 border border-white/10">
                <button
                  onClick={handleZoomOut}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <span className="text-[10px] sm:text-xs px-1 sm:px-2 text-zinc-300 font-mono">
                  {Math.round(transform.scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="p-1 sm:p-1.5 hover:bg-white/20 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Reset Zoom"
                  aria-label="Reset Zoom"
                >
                  <RotateCcw className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </button>
              </div>

              <button
                onClick={handleClose}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close fullscreen view"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* Main High-Res Viewer Area */}
          <div
            ref={viewerRef}
            className="relative flex-1 flex items-center justify-center overflow-hidden p-4 sm:p-8"
          >
            {/* Navigation Arrows */}
            {onPrev && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 hover:bg-amber-400 hover:text-zinc-950 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                title="Previous Artwork"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>
            )}

            {onNext && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 hover:bg-amber-400 hover:text-zinc-950 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                title="Next Artwork"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            )}

            {/* Scalable Image Canvas with smooth spring zoom transitions */}
            <motion.div
              key={`${artwork.id}-${selectedMediaIndex}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: transform.scale,
                x: transform.x,
                y: transform.y,
              }}
              exit={{ opacity: 0 }}
              transition={
                isDragging
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      damping: 25,
                      stiffness: 280,
                      mass: 0.6,
                      opacity: { duration: 0.18 },
                    }
              }
              className="relative max-w-full max-h-full flex items-center justify-center touch-none"
              style={{
                cursor:
                  transform.scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div className="relative w-[85vw] max-w-4xl h-[65vh] sm:h-[72vh]">
                <Image
                  src={
                    artwork.gallery[selectedMediaIndex]?.url || artwork.coverImage
                  }
                  alt={artwork.title}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-2xl pointer-events-none"
                  priority
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom Thumbnail Strip and Actions */}
          <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-black/60 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 z-30">
            {/* Captions and thumbnail gallery */}
            <div className="flex items-center gap-3 overflow-x-auto max-w-full">
              <span className="text-xs text-zinc-400 font-medium truncate max-w-xs sm:max-w-md">
                {artwork.gallery[selectedMediaIndex]?.caption || artwork.title}
              </span>

              {artwork.gallery.length > 1 && (
                <div className="flex items-center gap-1.5 border-l border-white/20 pl-3">
                  {artwork.gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedMediaIndex(idx);
                        const next = { scale: 1, x: 0, y: 0 };
                        transformRef.current = next;
                        setTransform(next);
                      }}
                      className={`relative h-9 w-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedMediaIndex === idx
                          ? "border-amber-400 scale-105"
                          : "border-white/20 opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={item.url}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        unoptimized
                        sizes="36px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Action Order & Case Study Links */}
            <div className="flex items-center gap-2">
              <VGenButton size="sm" />
              <FiverrButton size="sm" />
              <Link
                href={`/portfolio/${artwork.slug}`}
                onClick={handleClose}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span>Case Study</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
