"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X, Sparkles, ShieldCheck } from "lucide-react";
import { InstagramIcon } from "./Icons";
import ThemeToggle from "./ThemeToggle";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Navbar() {
  const { settings } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waLink = `https://wa.me/${settings.whatsappNumber}?text=Halo%20Admin%20Kemasan323%20(KTD),%20saya%20tertarik%20untuk%20konsultasi%20dan%20tanya%20harga%20custom%20kardus.`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-100 dark:border-slate-800/80"
          : "bg-white/80 dark:bg-[#0B132B]/80 backdrop-blur-sm py-4 border-b border-slate-200/50 dark:border-slate-800/50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo KTD */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center tracking-tight font-extrabold text-2xl">
            <span className="bg-[#FF6000] text-white px-2.5 py-1 rounded-xl shadow-sm group-hover:scale-105 transition-transform">
              K
            </span>
            <span className="text-[#0F2744] dark:text-white ml-1.5 font-black">TD</span>
          </div>
          <div className="hidden sm:flex flex-col border-l border-slate-200 dark:border-slate-700 pl-2.5 text-left">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase">
              Kemasan323
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-none">
              Custom Box Packaging
            </span>
          </div>
        </Link>

        {/* Live Status Badge (Desktop) */}
        <div
          className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
            settings.isOpenToday
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400"
              : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
          }`}
        >
          <span className="relative flex h-2 w-2">
            {settings.isOpenToday && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                settings.isOpenToday ? "bg-emerald-500" : "bg-slate-400"
              }`}
            ></span>
          </span>
          {settings.isOpenToday ? "Admin Siap Melayani" : "Toko Sedang Libur"}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#keunggulan"
            className="hover:text-[#FF6000] dark:hover:text-[#FF6000] transition-colors py-1"
          >
            Kenapa KTD
          </a>
          <a
            href="#kalkulator"
            className="hover:text-[#FF6000] dark:hover:text-[#FF6000] transition-colors py-1 flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6000]" />
            Cek Ukuran
          </a>
          <a
            href="#portofolio"
            className="hover:text-[#FF6000] dark:hover:text-[#FF6000] transition-colors py-1"
          >
            Portofolio
          </a>
          <a
            href="#cara-order"
            className="hover:text-[#FF6000] dark:hover:text-[#FF6000] transition-colors py-1"
          >
            Cara Order
          </a>
          <a
            href="#lokasi"
            className="hover:text-[#FF6000] dark:hover:text-[#FF6000] transition-colors py-1"
          >
            Kontak
          </a>
        </nav>

        {/* Action Button: Theme Toggle, Instagram & WhatsApp */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          <a
            href={settings.instagramUrl || "https://instagram.com/kemasan323"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex p-2 text-slate-500 dark:text-slate-400 hover:text-[#0F2744] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
            aria-label="Instagram @kemasan323"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF6000] hover:bg-[#E55500] text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2.5 rounded-xl shadow-md hover:shadow-orange-500/25 transition-all duration-200 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat WhatsApp</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0B132B] border-b border-slate-200 dark:border-slate-800 px-6 py-5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 font-semibold text-slate-700 dark:text-slate-200">
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-medium">
                <span
                  className={`h-2 w-2 rounded-full ${
                    settings.isOpenToday ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                ></span>
                <span className={settings.isOpenToday ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}>
                  {settings.isOpenToday ? "Admin Fast Response" : "Toko Sedang Tutup"}
                </span>
              </div>
              <ThemeToggle showLabel />
            </div>

            <a
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF6000] flex items-center justify-between"
            >
              <span>Kenapa KTD</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>
            <a
              href="#kalkulator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF6000] flex items-center justify-between"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FF6000]" />
                Kalkulator Ukuran Custom
              </span>
              <span className="text-slate-400 text-xs">→</span>
            </a>
            <a
              href="#portofolio"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF6000] flex items-center justify-between"
            >
              <span>Portofolio & Feed</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>
            <a
              href="#cara-order"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF6000] flex items-center justify-between"
            >
              <span>Cara Pemesanan</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>
            <a
              href="#lokasi"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#FF6000] flex items-center justify-between"
            >
              <span>Alamat Workshop & Jam Buka</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>
            <Link
              href="/admin"
              className="py-2 text-[#0F2744] dark:text-orange-400 hover:text-[#FF6000] flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#FF6000]" />
              <span>Login Dashboard Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
