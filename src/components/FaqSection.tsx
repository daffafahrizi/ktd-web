"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "Berapa Minimal Order Quantity (MOQ) di Kemasan323?",
    answer:
      "Kami sangat mendukung UMKM dan brand berkembang! MOQ untuk kardus polos maupun sablon custom sangat bersahabat (mulai dari 50–100 pcs untuk ukuran standar/mailer box tertentu). Hubungi admin kami untuk rekomendasi ukuran dengan efisiensi biaya terbaik.",
  },
  {
    question: "Berapa lama proses pembuatan kardus custom?",
    answer:
      "Untuk pesanan standar sablon, durasi produksi berkisar antara 3–7 hari kerja setelah desain/mockup disetujui (approval) dan pembayaran DP dikonfirmasi. Untuk pesanan mendesak (urgent), silakan komunikasikan dengan admin kami.",
  },
  {
    question: "Format file logo apa yang harus disiapkan untuk sablon?",
    answer:
      "Sebaiknya file format vector (.AI, .CDR, .EPS, atau .PDF vector) agar hasil cetak presisi tajam. Jika Anda hanya memiliki format PNG/JPEG resolusi tinggi, tim kami dapat membantu memeriksa kelayakan cetaknya secara gratis.",
  },
  {
    question: "Apakah bisa kirim ke luar kota atau luar pulau Jawa?",
    answer:
      "Bisa banget! Kami sudah rutin mengirim ke seluruh wilayah Indonesia melalui berbagai ekspedisi kargo darat, laut, maupun udara dengan tarif terjangkau (seperti JTR, Indah Cargo, Baraka, Dakota, dll) atau kurir instan untuk area sekitar workshop.",
  },
  {
    question: "Apakah bisa request sampel (sample) sebelum produksi massal?",
    answer:
      "Ya, Anda bisa meminta pembuatan sampel polos atau dummy untuk memastikan ukuran pas dengan produk Anda sebelum naik cetak massal.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#0B132B] relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[#0F2744] dark:text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF6000]" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2744] dark:text-white tracking-tight mb-3">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Semua hal yang perlu Anda ketahui sebelum memesan kardus di KTD.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "border-orange-200 dark:border-orange-500/40 bg-orange-50/30 dark:bg-orange-950/20 shadow-sm"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#162038] hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base"
                >
                  <span className={isOpen ? "text-[#FF6000]" : "text-[#0F2744] dark:text-white"}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#FF6000]" : "text-slate-400"
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-orange-100/60 dark:border-orange-900/40 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
