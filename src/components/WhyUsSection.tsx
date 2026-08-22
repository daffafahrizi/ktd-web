"use client";

import React from "react";
import {
  Ruler,
  Paintbrush,
  Boxes,
  ShieldCheck,
  Zap,
  HeartHandshake,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function WhyUsSection() {
  const { settings } = usePortfolio();
  const waLink = `https://wa.me/${settings.whatsappNumber}?text=Halo%20Admin%20Kemasan323%20(KTD),%20saya%20tertarik%20untuk%20konsultasi%20dan%20tanya%20harga%20custom%20kardus.`;

  const features = [
    {
      icon: Ruler,
      tag: "Fleksibel 100%",
      title: "Bebas Custom Ukuran & Bentuk",
      description:
        "Tidak perlu terpaku pada ukuran standar pasaran. Sesuaikan panjang, lebar, dan tinggi box dengan produk Anda agar pas, rapi, dan tidak boros bubble wrap.",
      badgeColor: "bg-orange-100 dark:bg-orange-950/60 text-[#FF6000]",
    },
    {
      icon: Paintbrush,
      tag: "Branding Maksimal",
      title: "Opsi Cetak & Sablon Logo",
      description:
        "Tingkatkan kesan premium unboxing produk Anda. Tersedia sablon logo 1-3 warna dengan hasil cetakan presisi, tajam, dan tidak mudah luntur.",
      badgeColor: "bg-blue-100 dark:bg-blue-950/60 text-[#0F2744] dark:text-blue-300",
    },
    {
      icon: Boxes,
      tag: "UMKM Friendly",
      title: "MOQ Bersahabat & Transparan",
      description:
        "Kami memahami kebutuhan bisnis yang sedang berkembang. Minimal order bersahabat tanpa biaya tersembunyi, cocok untuk testing produk maupun produksi massal.",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300",
    },
    {
      icon: ShieldCheck,
      tag: "Kualitas Teruji",
      title: "Material Karton Kokoh (E & B Flute)",
      description:
        "Menggunakan bahan corrugated paper berkualitas tinggi. Tahan tekanan ekspedisi, menjaga isi paket tetap aman sampai ke tangan pelanggan.",
      badgeColor: "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300",
    },
  ];

  return (
    <section id="keunggulan" className="py-16 md:py-24 bg-white dark:bg-[#0E172E] relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F2744] dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-[#FF6000]" />
            <span>Keunggulan Layanan KTD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2744] dark:text-white tracking-tight mb-4">
            Kenapa Ratusan Brand Memilih{" "}
            <span className="text-[#FF6000]">KTD Kemasan323?</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Dari kardus hampers eksklusif hingga master box pengiriman rutin,
            kami hadirkan kemasan yang melindungi produk sekaligus memperkuat nilai brand Anda.
          </p>
        </div>

        {/* Feature Cards Grid (2x2) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-slate-50/70 dark:bg-[#162038] hover:bg-white dark:hover:bg-[#1E2C4A] rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-700/60 hover:border-orange-200 dark:hover:border-orange-500/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 group-hover:bg-[#FF6000] text-[#0F2744] dark:text-white group-hover:text-white shadow-sm flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${item.badgeColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F2744] dark:text-white mb-2.5 group-hover:text-[#FF6000] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-[#FF6000] transition-colors">
                  <span>Konsultasikan Kebutuhan</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small Sub-banner with Fast Response Guarantee */}
        <div className="mt-12 bg-gradient-to-r from-[#0F2744] via-[#163B66] to-[#0F2744] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg border border-slate-700/50">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-[#FF6000] flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <HeartHandshake className="w-6 h-6 text-[#FF6000]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                Punya Ukuran Khusus atau Belum Ada Desain?
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm">
                Tim KTD siap bantu hitungkan ukuran terbaik dan pandu format logo Anda.
              </p>
            </div>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-[#FF6000] hover:bg-[#E55500] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-orange-500/30 transition-all text-center w-full sm:w-auto"
          >
            Konsultasi Gratis Sekarang 💬
          </a>
        </div>
      </div>
    </section>
  );
}
