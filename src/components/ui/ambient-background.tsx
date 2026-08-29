import * as React from "react";

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Top Left Floating Amber Orb */}
      <div className="absolute -top-32 -left-32 w-96 h-96 sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-br from-amber-400/20 via-amber-300/10 to-transparent blur-3xl animate-pulse-glow" />

      {/* Top Right Floating Coral Glow */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-bl from-rose-500/15 via-amber-400/10 to-transparent blur-3xl animate-float-slow" />

      {/* Bottom Center Floating Lime/Amber Ambient Orb */}
      <div className="absolute bottom-10 left-1/3 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-gradient-to-tr from-amber-400/15 via-lime-400/10 to-transparent blur-3xl animate-float-gentle" />
    </div>
  );
}
