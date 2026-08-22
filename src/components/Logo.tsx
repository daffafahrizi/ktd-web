"use client";

import React, { useState } from "react";
import Image from "next/image";

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "footer" | "admin";
};

export default function Logo({
  className = "",
  showText = true,
  size = "md",
  variant = "default",
}: LogoProps) {
  const [imageError, setImageError] = useState(false);

  // Ukuran dimensi logo
  const sizeMap = {
    sm: {
      imgClass: "h-8 w-auto",
      textClass: "text-lg",
      subTextClass: "text-[9px]",
    },
    md: {
      imgClass: "h-9 sm:h-10 w-auto",
      textClass: "text-2xl",
      subTextClass: "text-[10px]",
    },
    lg: {
      imgClass: "h-11 sm:h-12 w-auto",
      textClass: "text-3xl",
      subTextClass: "text-xs",
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* 1. Tampilan Foto Asli Logo KTD (/images/logo.jpg) */}
      {!imageError ? (
        <div className="relative flex items-center justify-center bg-white p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/60 overflow-hidden group-hover:scale-105 transition-transform duration-200">
          <img
            src="/images/logo.jpg"
            alt="Logo Resmi Kemasan323 (KTD)"
            className={`object-contain block ${currentSize.imgClass}`}
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        /* 2. Fallback CSS Badge jika file gambar tidak ditemukan */
        <div className="flex items-center tracking-tight font-extrabold">
          <span
            className={`bg-[#FF6000] text-white rounded-xl shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center font-black ${
              size === "sm"
                ? "px-2 py-0.5 text-base"
                : size === "lg"
                ? "px-3 py-1.5 text-2xl"
                : "px-2.5 py-1 text-xl"
            }`}
          >
            K
          </span>
          <span
            className={`ml-1.5 font-black ${currentSize.textClass} ${
              variant === "footer"
                ? "text-white"
                : "text-[#0F2744] dark:text-white"
            }`}
          >
            TD
          </span>
        </div>
      )}

      {/* Teks Pendamping / Subtitle */}
      {showText && (
        <div
          className={`flex flex-col text-left pl-2.5 border-l ${
            variant === "footer"
              ? "border-slate-700"
              : "border-slate-200 dark:border-slate-700"
          }`}
        >
          <span
            className={`font-extrabold tracking-wider uppercase leading-tight ${
              variant === "footer"
                ? "text-slate-200 text-xs"
                : "text-slate-800 dark:text-slate-200 text-xs"
            }`}
          >
            Kemasan323
          </span>
          <span
            className={`font-medium leading-none mt-0.5 ${currentSize.subTextClass} ${
              variant === "footer"
                ? "text-slate-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {variant === "footer"
              ? "More Than Brown Boxes 📦"
              : "Custom Box Packaging"}
          </span>
        </div>
      )}
    </div>
  );
}
