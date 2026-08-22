"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { InstagramIcon } from "./Icons";
import { usePortfolio } from "@/context/PortfolioContext";

export default function FooterSection() {
  const { settings } = usePortfolio();
  const waLink = `https://wa.me/${settings.whatsappNumber}?text=Halo%20Admin%20Kemasan323%20(KTD),%20saya%20tertarik%20untuk%20konsultasi%20custom%20kardus.`;

  return (
    <footer id="lokasi" className="bg-[#0F2744] dark:bg-[#070D1E] text-white pt-16 pb-24 md:pb-12 border-t border-slate-800 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5">
            {/* Logo KTD */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="bg-[#FF6000] text-white font-extrabold text-2xl px-3 py-1 rounded-xl shadow-md">
                K
              </span>
              <span className="text-white font-black text-2xl tracking-tight">
                TD
              </span>
              <div className="border-l border-slate-700 pl-3">
                <span className="text-sm font-bold text-slate-200 tracking-wider uppercase block">
                  Kemasan323
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  More Than Brown Boxes 📦
                </span>
              </div>
            </div>

            <p className="text-slate-300 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              Mitra terpercaya pembuatan kardus karton & mailer box custom untuk
              ratusan UMKM dan brand di Indonesia. Kualitas presisi, sablon tajam,
              dan layanan ramah.
            </p>

            {/* Instagram Social Badge */}
            <div className="flex items-center gap-3">
              <a
                href={settings.instagramUrl || "https://instagram.com/kemasan323"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 dark:bg-white/5 hover:bg-[#FF6000] dark:hover:bg-[#FF6000] px-4 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white transition-all border border-white/10"
              >
                <InstagramIcon className="w-4 h-4 text-[#FF6000] group-hover:text-white" />
                <span>Follow {settings.instagramHandle || "@kemasan323"}</span>
              </a>

              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-xs px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            </div>
          </div>

          {/* Workshop & Operational Hours (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF6000]" />
              <span>Workshop & Operasional</span>
            </h4>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 dark:text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    Workshop Kemasan323 (KTD)
                  </span>
                  <span className="text-slate-400 text-xs leading-relaxed">
                    {settings.workshopAddress}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">
                    Jam Layanan Admin & Konsultasi:
                  </span>
                  <span className="text-slate-400 text-xs">
                    {settings.operatingHours}
                  </span>
                  <span className="text-slate-500 text-[11px] block mt-0.5">
                    (Pesan WhatsApp di luar jam kerja tetap diproses pada hari kerja berikutnya)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact & Bottom CTA (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Siap Upgrade Packaging?
              </h4>
              <p className="text-xs text-slate-300 dark:text-slate-400 mb-4 leading-relaxed">
                Tingkatkan kepuasan pembeli Anda dengan kemasan unboxing yang
                eksklusif hari ini!
              </p>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FF6000] hover:bg-[#E55500] text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Admin WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} <strong className="text-slate-200">Kemasan323 (KTD)</strong>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Dibuat khusus untuk mendukung kemajuan</span>
            <strong className="text-orange-400 font-semibold">UMKM Indonesia</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
