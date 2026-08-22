"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle({
  className = "",
  showLabel = false,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#FF6000] dark:hover:text-[#FF6000] hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all duration-200 active:scale-95 ${className}`}
      aria-label={theme === "dark" ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
      title={theme === "dark" ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-amber-400 animate-in spin-in-180 duration-300" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 animate-in spin-in-90 duration-300" />
        )}
      </div>
      {showLabel && (
        <span className="text-xs font-semibold">
          {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
        </span>
      )}
    </button>
  );
}
