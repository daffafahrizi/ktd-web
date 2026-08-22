"use client";

import React, { useState } from "react";
import {
  PackageCheck,
  Star,
  ExternalLink,
  Sparkles,
  Layers,
} from "lucide-react";
import { InstagramIcon } from "./Icons";
import { usePortfolio } from "@/context/PortfolioContext";

const TESTIMONIALS = [
  {
    name: "Rania Wardani",
    role: "Owner @modestchic.id",
    text: "Semenjak ganti box ke KTD, rating unboxing dari customer di Shopee naik drastis! Sablonannya tajam, kardusnya tebel ga gampang penyok pas diekspedisi.",
    rating: 5,
  },
  {
    name: "Dimas Pratama",
    role: "Co-Founder Footwear ID",
    text: "Adminnya responsif banget pas diajak diskusi ukuran sepatu. Hasil potongan die-cut presisi dan lipatannya gampang dirakit.",
    rating: 5,
  },
  {
    name: "Clara S.",
    role: "Brand Specialist Skincare",
    text: "Paling suka karena MOQ-nya ramah buat brand baru seperti kami. Pelayanan sabar dan hasil produksinya selalu tepat waktu!",
    rating: 5,
  },
];

export default function PortfolioSection() {
  const { portfolio, settings } = usePortfolio();
  const [filter, setFilter] = useState<string>("all");

  const waBaseLink = `https://wa.me/${settings.whatsappNumber}?text=Halo%20Admin%20Kemasan323%20(KTD),`;

  const filteredItems =
    filter === "all"
      ? portfolio
      : portfolio.filter((item) => item.category === filter);

  return (
    <section id="portofolio" className="py-16 md:py-24 bg-white dark:bg-[#0B132B] relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F2744] dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
              <PackageCheck className="w-3.5 h-3.5 text-[#FF6000]" />
              <span>Portofolio & Hasil Produksi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2744] dark:text-white tracking-tight">
              Katalog Kardus Custom <span className="text-[#FF6000]">KTD</span>
            </h2>
          </div>

          {/* Instagram Link CTA */}
          <a
            href={settings.instagramUrl || "https://instagram.com/kemasan323"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-[#FF6000] dark:hover:text-[#FF6000] bg-slate-50 dark:bg-[#162038] hover:bg-orange-50 dark:hover:bg-[#1E2C4A] px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all self-start md:self-auto"
          >
            <InstagramIcon className="w-4 h-4 text-[#FF6000]" />
            <span>Lihat Real Video di {settings.instagramHandle || "@kemasan323"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { key: "all", label: "Semua Hasil Jadi" },
            { key: "fashion", label: "👗 Fashion & Hijab" },
            { key: "skincare", label: "✨ Skincare & Beauty" },
            { key: "fnb", label: "🍪 Makanan & Kue" },
            { key: "hampers", label: "🎁 Hampers & Souvenir" },
            { key: "custom", label: "📦 Custom Lainnya" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filter === tab.key
                  ? "bg-[#0F2744] dark:bg-[#FF6000] text-white shadow-md shadow-slate-900/10"
                  : "bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50/60 dark:bg-[#162038] rounded-3xl border border-slate-200 dark:border-slate-700/60 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Visual Box Graphic / Real Image Display */}
              <div
                className={`p-6 bg-gradient-to-br ${item.colorScheme} border-b dark:border-slate-700/50 relative min-h-[210px] overflow-hidden flex flex-col justify-between`}
              >
                {/* If real image provided, show image as background */}
                {item.imageSrc ? (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                  </div>
                ) : null}

                <div className="flex items-center justify-between relative z-10">
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${item.accentBg}`}
                  >
                    {item.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono font-bold bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded text-slate-800 dark:text-slate-100 shadow-sm backdrop-blur-sm">
                    {item.size}
                  </span>
                </div>

                {/* Box Graphic Visual (rendered if no imageSrc) */}
                {!item.imageSrc ? (
                  <div className="my-auto py-2 text-center relative z-10">
                    <div className="inline-block bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border border-white/80 dark:border-slate-700 group-hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-center gap-1.5 font-black text-sm text-[#0F2744] dark:text-white">
                        <span className="w-2 h-2 rounded-full bg-[#FF6000]" />
                        <span>{item.client}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block mt-0.5">
                        {item.material}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="my-auto" />
                )}

                <div
                  className={`text-[10px] font-semibold flex items-center justify-between relative z-10 ${
                    item.imageSrc ? "text-white drop-shadow" : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  <span>📦 Custom Die Cut</span>
                  <span>✨ Sablon Presisi</span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-[#0F2744] dark:text-white text-base mb-2 group-hover:text-[#FF6000] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <a
                  href={`${waBaseLink}%20saya%20tertarik%20dengan%20model%20box%20${encodeURIComponent(
                    item.title
                  )}%20(${item.size})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full text-xs font-bold text-[#FF6000] hover:text-white bg-orange-50 dark:bg-orange-950/40 hover:bg-[#FF6000] dark:hover:bg-[#FF6000] py-2.5 px-4 rounded-xl border border-orange-200 dark:border-orange-800/60 hover:border-[#FF6000] transition-all duration-200"
                >
                  <span>Pesan Model Seperti Ini</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof & Testimonials Section */}
        <div className="bg-slate-50 dark:bg-[#162038] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700/60">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-lg sm:text-2xl font-extrabold text-[#0F2744] dark:text-white">
              Apa Kata Pemilik Brand Tentang KTD?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Feedback nyata dari pelaku online shop & UMKM yang memesan box kardus di KTD.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1E2C4A] p-5 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 italic leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <span className="font-bold text-xs sm:text-sm text-[#0F2744] dark:text-white block">
                    {t.name}
                  </span>
                  <span className="text-[11px] font-semibold text-[#FF6000]">
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
