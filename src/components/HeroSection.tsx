"use client";

import React from "react";
import {
  MessageCircle,
  Package,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Layers,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function HeroSection() {
  const { settings } = usePortfolio();
  const waLink = `https://wa.me/${settings.whatsappNumber}?text=Halo%20Admin%20Kemasan323%20(KTD),%20saya%20tertarik%20untuk%20konsultasi%20dan%20tanya%20harga%20custom%20kardus.`;

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-orange-50/40 via-slate-50 to-white dark:from-[#0B132B] dark:via-[#0F172A] dark:to-[#0B132B] transition-colors duration-300">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/30 dark:bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-100/40 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Value Prop & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/60 text-[#FF6000] text-xs sm:text-sm font-bold tracking-wide uppercase mb-5 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FF6000]" />
              <span>More Than Brown Boxes 📦</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2744] dark:text-white tracking-tight leading-[1.15] mb-5">
              Custom Kardus Kartonmu di{" "}
              <span className="text-[#FF6000] underline decoration-[#FF6000]/30 decoration-wavy underline-offset-8">
                KTD!
              </span>
            </h1>

            {/* Sub-headline / Description */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-medium">
              Solusi packaging kardus custom berkualitas untuk UMKM, Online Shop,
              dan Brand Owner. Bebas pesan sesuai ukuran, opsi sablon logo presisi,
              tanpa proses ribet!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-10">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#FF6000] hover:bg-[#E55500] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Hubungi Kami Sekarang ⬇️</span>
              </a>

              <a
                href="#kalkulator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0F2744] dark:text-white font-bold text-sm sm:text-base px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all"
              >
                <span>Cek Estimasi Ukuran</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Key Value Points Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#FF6000] flex-shrink-0" />
                <span>Bebas Custom Ukuran</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#FF6000] flex-shrink-0" />
                <span>Sablon Logo Presisi</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-[#FF6000] flex-shrink-0" />
                <span>MOQ Ramah UMKM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic / 3D Box Mockup */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Box Representation Card */}
              <div className="relative bg-gradient-to-br from-[#0F2744] via-[#163B66] to-[#0A192F] text-white p-6 sm:p-7 rounded-3xl shadow-2xl border border-slate-700/40 overflow-hidden">
                {/* Accent glow on top right */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#FF6000]/30 rounded-full blur-2xl" />

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold text-orange-200">
                    <Package className="w-3.5 h-3.5 text-[#FF6000]" />
                    <span>Mailer Box Custom</span>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-300 bg-black/20 px-2.5 py-1 rounded-md">
                    E-Flute Corrugated
                  </span>
                </div>

                {/* Illustrated Custom Box SVG */}
                <div className="py-4 my-2 relative flex items-center justify-center">
                  <div className="w-full max-w-[280px] aspect-[4/3] bg-gradient-to-tr from-amber-700/20 via-orange-500/15 to-amber-900/30 rounded-2xl border-2 border-dashed border-orange-400/40 flex flex-col items-center justify-center p-6 relative group transition-all duration-300">
                    {/* Dimension Indicators */}
                    <div className="absolute -top-2 bg-[#FF6000] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      Panjang 20 cm
                    </div>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-[#0F2744] border border-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow rotate-90">
                      Tinggi 7 cm
                    </div>
                    <div className="absolute -bottom-2 bg-[#0F2744] border border-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                      Lebar 20 cm
                    </div>

                    {/* Logo Mockup on Box */}
                    <div className="bg-white/90 text-[#0F2744] p-3.5 rounded-xl shadow-lg flex flex-col items-center text-center">
                      <div className="flex items-center gap-1 font-black text-sm">
                        <span className="bg-[#FF6000] text-white px-1.5 py-0.5 rounded text-xs">
                          LOGO
                        </span>
                        <span>BRAND KAMU</span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-semibold mt-1">
                        High Quality Screen Printing
                      </span>
                    </div>

                    <div className="mt-3 text-center text-orange-200 text-xs font-semibold">
                      📦 Ear Lock Die Cut System
                    </div>
                  </div>
                </div>

                {/* Floating Micro-Features on Box */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Karton Tebal & Kokoh</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Truck className="w-4 h-4 text-orange-300 flex-shrink-0" />
                    <span>Packing Aman Ekspedisi</span>
                  </div>
                </div>
              </div>

              {/* Floating Pill: WhatsApp Quick Trigger */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white dark:bg-slate-800 text-[#0F2744] dark:text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 animate-pulse-subtle">
                <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-[#FF6000]">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-[#0F2744] dark:text-white">
                    Custom Segala Bentuk
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Mailer, Master, Pizza Box
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
