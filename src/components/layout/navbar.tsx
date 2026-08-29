"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Palette,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CharacterAvatar } from "@/components/character/character-avatar";
import { VGenIcon, FiverrIcon } from "@/components/icons/brand-icons";
import { INITIAL_STUDIO_PROFILE } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [commissionDropdownOpen, setCommissionDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Ordered strictly: Home - Portfolio - Services - About
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
  ];

  const isAdminPage = pathname.startsWith("/admin") || pathname === "/login";

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCommissionDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isAdminPage) return null;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200 backdrop-blur-xl bg-white/90 dark:bg-[#090a0f]/85 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group select-none cursor-pointer"
        >
          <CharacterAvatar
            size="sm"
            withBorder
            className="group-hover:scale-110 group-hover:rotate-6 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-black text-lg sm:text-xl tracking-tight text-zinc-950 dark:text-white flex items-center gap-1">
              Ayamu <span className="text-amber-500">Labs</span>
            </span>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
              Creative Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "text-zinc-950 dark:text-white bg-amber-400/20 font-extrabold"
                    : "text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Admin link shortcut */}
          <Link
            href="/admin"
            title="Studio Admin"
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            <ShieldCheck className="h-4 w-4" />
          </Link>

          {/* Dark / Light Toggle */}
          <ThemeToggle />

          {/* Commission Dropdown CTA */}
          <div className="relative hidden sm:block" ref={dropdownRef}>
            <button
              onClick={() => setCommissionDropdownOpen((prev) => !prev)}
              className="inline-flex items-center justify-center gap-1.5 h-10 px-4 rounded-full font-extrabold text-xs sm:text-sm bg-amber-400 text-zinc-950 hover:bg-amber-300 shadow-md shadow-amber-400/20 hover:shadow-amber-400/35 transition-all select-none cursor-pointer"
            >
              <Palette className="h-4 w-4 text-zinc-950" />
              <span>Commission Us</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  commissionDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {commissionDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -6 }}
                  transition={{ type: "spring", damping: 20, stiffness: 350 }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 z-50 origin-top-right"
                >
                  <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Official Commission Platforms
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                      Order via official studio profiles
                    </p>
                  </div>

                  <Link
                    href={INITIAL_STUDIO_PROFILE.vgenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCommissionDropdownOpen(false)}
                    className="flex items-center justify-between gap-2 rounded-xl p-2.5 hover:bg-lime-50 dark:hover:bg-lime-950/30 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A3FF00] p-1 shadow-sm">
                        <VGenIcon className="h-full w-full" />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          Order on VGen
                        </div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                          VTuber & Anime Art
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-lime-600 dark:group-hover:text-[#A3FF00]" />
                  </Link>

                  <Link
                    href={INITIAL_STUDIO_PROFILE.fiverrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCommissionDropdownOpen(false)}
                    className="flex items-center justify-between gap-2 rounded-xl p-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1DBF73] text-white p-1.5 shadow-sm">
                        <FiverrIcon className="h-full w-full" />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          Order on Fiverr
                        </div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                          Commercial Illustration & Assets
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#1DBF73]" />
                  </Link>

                  <div className="border-t border-zinc-100 dark:border-zinc-800 my-1" />

                  <Link
                    href="/services"
                    onClick={() => setCommissionDropdownOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl p-2 text-xs font-bold text-zinc-800 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <span>Explore All Services &rarr;</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-300 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3"
          >
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-base font-bold text-zinc-900 hover:bg-amber-400/15 dark:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-2xl text-sm font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                Studio Admin
              </Link>
            </nav>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href={INITIAL_STUDIO_PROFILE.vgenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 h-11 rounded-full bg-[#A3FF00] hover:bg-[#92E800] text-zinc-950 font-extrabold text-sm shadow-md shadow-[#A3FF00]/25 transition-all"
              >
                <VGenIcon className="h-4 w-4" />
                <span>Order on VGen</span>
              </Link>
              <Link
                href={INITIAL_STUDIO_PROFILE.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 h-11 rounded-full bg-[#1DBF73] hover:bg-[#17A362] text-white font-bold text-sm shadow-md transition-all"
              >
                <FiverrIcon className="h-4 w-4" />
                <span>Order on Fiverr</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
