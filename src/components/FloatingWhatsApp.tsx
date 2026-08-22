"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function FloatingWhatsApp() {
  const { settings } = usePortfolio();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const waLink = `https://wa.me/${settings.whatsappNumber}?text=Halo%20Admin%20Kemasan323%20(KTD),%20saya%20tertarik%20untuk%20konsultasi%20custom%20kardus.`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Small Chat Balloon Prompt */}
      {showNotification && (
        <div className="relative bg-white text-slate-800 p-3 sm:p-3.5 rounded-2xl shadow-2xl border border-slate-100 max-w-[260px] animate-in fade-in slide-in-from-bottom-3 duration-300">
          <button
            onClick={() => setShowNotification(false)}
            className="absolute -top-1.5 -right-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full p-1 shadow-sm transition-colors"
            aria-label="Tutup pesan"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-bold text-slate-700">
              {settings.adminName || "Admin Kemasan323"}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-snug">
            Butuh custom kardus untuk produkmu? Klik di sini untuk tanya harga & ukuran ya! 📦
          </p>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/40 transform hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Chat WhatsApp Admin Kemasan323"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="hidden sm:inline-block font-bold text-xs tracking-wide">
          Tanya Kardus via WA
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FF6000] border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
}
