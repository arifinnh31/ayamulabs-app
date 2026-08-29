"use client";

import * as React from "react";

export function CustomCursor() {
  const [isPointerFine, setIsPointerFine] = React.useState(false);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const spotlightRef = React.useRef<HTMLDivElement>(null);

  const mousePos = React.useRef({ x: -100, y: -100 });
  const ringPos = React.useRef({ x: -100, y: -100 });
  const isHovered = React.useRef(false);
  const isClicked = React.useRef(false);
  const isVisible = React.useRef(false);
  const isDraggingScrollbar = React.useRef(false);
  const activeScrollContainer = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    // Only enable on non-touch devices with fine pointer (mouse / trackpad)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setIsPointerFine(mediaQuery.matches);

    updatePointer();
    mediaQuery.addEventListener("change", updatePointer);
    return () => mediaQuery.removeEventListener("change", updatePointer);
  }, []);

  React.useEffect(() => {
    if (!isPointerFine) return;
    let animId: number;

    const updatePosition = (clientX: number, clientY: number, target: EventTarget | null) => {
      mousePos.current = { x: clientX, y: clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
      }

      // Check if hovering clickable elements
      if (target && target instanceof HTMLElement) {
        const clickable = Boolean(
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest("[role='button']") ||
          target.closest(".cursor-pointer")
        );
        isHovered.current = clickable;
      }
    };

    const checkScrollbarClick = (clientX: number, clientY: number, target: EventTarget | null) => {
      // Check if clicked near main window scrollbar (right 25px)
      const isWindowScrollable = document.documentElement.scrollHeight > window.innerHeight;
      if (isWindowScrollable && clientX >= window.innerWidth - 25) {
        activeScrollContainer.current = document.documentElement;
        isDraggingScrollbar.current = true;
        return;
      }

      // Check if clicked near an inner scrollable container's scrollbar
      let curr = target instanceof HTMLElement ? target : null;
      while (curr && curr !== document.body && curr !== document.documentElement) {
        const hasVerticalScroll = curr.scrollHeight > curr.clientHeight && curr.clientHeight > 0;
        if (hasVerticalScroll) {
          const overflowY = window.getComputedStyle(curr).overflowY;
          if (overflowY === "auto" || overflowY === "scroll") {
            const rect = curr.getBoundingClientRect();
            if (
              clientX >= rect.right - 25 &&
              clientX <= rect.right + 10 &&
              clientY >= rect.top &&
              clientY <= rect.bottom
            ) {
              activeScrollContainer.current = curr;
              isDraggingScrollbar.current = true;
              return;
            }
          }
        }
        curr = curr.parentElement;
      }
      isDraggingScrollbar.current = false;
      activeScrollContainer.current = null;
    };

    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      updatePosition(e.clientX, e.clientY, e.target);
    };

    const onDragOver = (e: DragEvent) => {
      if (e.clientX !== 0 || e.clientY !== 0) {
        updatePosition(e.clientX, e.clientY, e.target);
      }
    };

    const onPointerDown = (e: PointerEvent | MouseEvent) => {
      isClicked.current = true;
      checkScrollbarClick(e.clientX, e.clientY, e.target);
    };

    const onPointerUp = () => {
      isClicked.current = false;
      isDraggingScrollbar.current = false;
      activeScrollContainer.current = null;
    };

    const onScroll = (e: Event) => {
      // When dragging scrollbar or when mouse button is down near scrollbar
      if (isClicked.current || isDraggingScrollbar.current) {
        const target = e.target;
        let container: HTMLElement | null = activeScrollContainer.current;

        if (!container) {
          if (target === document || target === window) {
            container = document.documentElement;
          } else if (target instanceof HTMLElement) {
            container = target;
          }
        }

        if (container) {
          if (container === document.documentElement || container === document.body) {
            const doc = document.documentElement;
            const maxScroll = doc.scrollHeight - window.innerHeight;
            if (maxScroll > 0) {
              const scrollRatio = Math.max(0, Math.min(1, window.scrollY / maxScroll));
              const trackHeight = window.innerHeight;
              const thumbHeight = Math.max(24, (window.innerHeight / doc.scrollHeight) * trackHeight);
              const currentY = scrollRatio * (trackHeight - thumbHeight) + thumbHeight / 2;
              const currentX = window.innerWidth - 8;
              updatePosition(currentX, currentY, container);
            }
          } else {
            const rect = container.getBoundingClientRect();
            const maxScroll = container.scrollHeight - container.clientHeight;
            if (maxScroll > 0) {
              const scrollRatio = Math.max(0, Math.min(1, container.scrollTop / maxScroll));
              const trackHeight = rect.height;
              const thumbHeight = Math.max(24, (container.clientHeight / container.scrollHeight) * trackHeight);
              const currentY = rect.top + scrollRatio * (trackHeight - thumbHeight) + thumbHeight / 2;
              const currentX = rect.right - 8;
              updatePosition(currentX, currentY, container);
            }
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (spotlightRef.current) spotlightRef.current.style.opacity = "1";
    };

    // Use capture phase on window so pointer movements are ALWAYS tracked even when dragging captured elements or scrollbars
    window.addEventListener("pointermove", onPointerMove, { capture: true, passive: true });
    window.addEventListener("pointerdown", onPointerDown, { capture: true, passive: true });
    window.addEventListener("pointerup", onPointerUp, { capture: true, passive: true });
    window.addEventListener("mousemove", onPointerMove, { capture: true, passive: true });
    window.addEventListener("mousedown", onPointerDown, { capture: true, passive: true });
    window.addEventListener("mouseup", onPointerUp, { capture: true, passive: true });
    window.addEventListener("dragover", onDragOver, { capture: true, passive: true });
    window.addEventListener("drag", onDragOver, { capture: true, passive: true });
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // High-performance direct RAF animation loop (Zero React re-render overhead)
    const render = () => {
      // Smooth interpolation for the trailing ring (lerp factor 0.2)
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.2;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.2;

      // Update Center Dot
      if (dotRef.current) {
        const dotScale = isClicked.current ? 1.5 : isHovered.current ? 0.3 : 1;
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      // Update Trailing Ring
      if (ringRef.current) {
        const ringScale = isClicked.current ? 0.75 : isHovered.current ? 1.9 : 1;
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;

        if (isHovered.current) {
          ringRef.current.style.borderColor = "rgba(245, 158, 11, 0.9)";
          ringRef.current.style.backgroundColor = "rgba(245, 158, 11, 0.12)";
          ringRef.current.style.boxShadow = "0 0 20px rgba(245, 158, 11, 0.45)";
        } else {
          ringRef.current.style.borderColor = "rgba(245, 158, 11, 0.4)";
          ringRef.current.style.backgroundColor = "rgba(245, 158, 11, 0.02)";
          ringRef.current.style.boxShadow = "none";
        }
      }

      // Update Ambient Spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${mousePos.current.x}px ${mousePos.current.y}px, rgba(245, 158, 11, 0.06), transparent 75%)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onPointerMove, { capture: true });
      window.removeEventListener("pointerdown", onPointerDown, { capture: true });
      window.removeEventListener("pointerup", onPointerUp, { capture: true });
      window.removeEventListener("mousemove", onPointerMove, { capture: true });
      window.removeEventListener("mousedown", onPointerDown, { capture: true });
      window.removeEventListener("mouseup", onPointerUp, { capture: true });
      window.removeEventListener("dragover", onDragOver, { capture: true });
      window.removeEventListener("drag", onDragOver, { capture: true });
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Ambient mouse spotlight glow across the entire viewport */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300 opacity-0"
      />

      {/* Outer Golden Trailing Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full opacity-0"
        style={{
          width: "36px",
          height: "36px",
          border: "1.5px solid rgba(245, 158, 11, 0.4)",
          backgroundColor: "rgba(245, 158, 11, 0.02)",
          willChange: "transform, border-color, background-color, box-shadow",
          transition: "border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease",
        }}
      />

      {/* Center Golden Precision Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full opacity-0"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "#f59e0b",
          boxShadow: "0 0 8px rgba(245, 158, 11, 0.9)",
          willChange: "transform",
        }}
      />
    </>
  );
}
