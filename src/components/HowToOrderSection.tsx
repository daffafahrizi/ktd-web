"use client";

import React from "react";
import { MessageSquare, LayoutTemplate, Truck, Check, ArrowRight } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function HowToOrderSection() {
  const { settings } = usePortfolio();
  const waLink = `https://wa.me/${settings.whatsappNumber}?text=Halo%20Admin%20Kemasan323%20(KTD),%20saya%20tertarik%20untuk%20konsultasi%20order%20kardus%20custom.`;

  const steps = [
    {
      number: "01",
      icon: MessageSquare,
      title: "Konsultasi & Kirim Ukuran",
      description:
        "Hubungi admin via WhatsApp. Informasikan tipe kardus, ukuran (P x L x T), serta kirim file logo jika ingin disablon.",
    },
    {
      number: "02",
      icon: LayoutTemplate,
      title: "Approval Mockup & Penawaran",
      description:
        "Tim KTD membuatkan simulasi mockup penempatan logo dan memberikan kalkulasi harga terbaik dengan estimasi waktu produksi.",
    },
    {
      number: "03",
      icon: Truck,
      title: "Produksi & Kirim ke Lokasi",
      description:
        "Setelah deal & DP, kardus langsung diproduksi dengan kontrol kualitas presisi, dipacking rapi, dan dikirim aman ke alamat Anda.",
    },
  ];

  return (
    <section id="cara-order" className="py-16 md:py-24 bg-slate-50 dark:bg-[#0E172E] relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#FF6000] text-xs font-bold uppercase tracking-wider mb-3">
            <Check className="w-3.5 h-3.5" />
            <span>Alur Pemesanan Mudah</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2744] dark:text-white tracking-tight mb-4">
            3 Langkah Simpel Pesan di <span className="text-[#FF6000]">KTD</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Tidak perlu pusing dengan prosedur pabrik yang rumit. Kami bantu dari
            awal penentuan ukuran hingga kardus siap digunakan untuk jualanmu.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-[#162038] rounded-3xl p-7 sm:p-8 border border-slate-200 dark:border-slate-700/60 shadow-sm relative flex flex-col justify-between hover:shadow-lg hover:border-orange-200 dark:hover:border-orange-500/30 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/60 group-hover:bg-[#FF6000] text-[#FF6000] group-hover:text-white flex items-center justify-center transition-colors duration-300 shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 dark:text-slate-700 group-hover:text-orange-200 dark:group-hover:text-orange-400/40 transition-colors font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F2744] dark:text-white mb-3 group-hover:text-[#FF6000] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Check className="w-4 h-4 mr-1.5" />
                  <span>Proses Cepat & Terpantau</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#0F2744] dark:bg-[#FF6000] hover:bg-[#163B66] dark:hover:bg-[#E55500] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <span>Mulai Konsultasi Langkah Pertama Sekarang</span>
            <ArrowRight className="w-4 h-4 text-orange-400 dark:text-white" />
          </a>
        </div>
      </div>
    </section>
  );
}
