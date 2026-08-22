"use client";

import React, { useState } from "react";
import {
  Package,
  Sparkles,
  MessageCircle,
  CheckCircle,
  Sliders,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

type BoxType = {
  id: string;
  name: string;
  desc: string;
  popularFor: string;
  defaultP: number;
  defaultL: number;
  defaultT: number;
};

const BOX_TYPES: BoxType[] = [
  {
    id: "mailer",
    name: "Mailer Box (Ear Lock)",
    desc: "Kardus lipat premium tanpa lakban atas, cocok untuk unboxing experience eksklusif.",
    popularFor: "Baju, Hijab, Skincare, Hampers, Sepatu",
    defaultP: 22,
    defaultL: 18,
    defaultT: 7,
  },
  {
    id: "reguler",
    name: "Master Box (Standar A1)",
    desc: "Kardus tipe reguler standar buka atas-bawah dengan lakban, kuat untuk pengiriman berat.",
    popularFor: "Pengiriman partai besar, F&B, Botol, Frozen Food",
    defaultP: 30,
    defaultL: 20,
    defaultT: 20,
  },
  {
    id: "pizza",
    name: "Pizza / Flat Box",
    desc: "Kardus ceper dengan bukaan lebar, pas untuk barang datar agar tidak bergeser.",
    popularFor: "Pizza, Kaos lipat tipis, Frame, Buku, Aksesoris",
    defaultP: 25,
    defaultL: 25,
    defaultT: 5,
  },
  {
    id: "top-bottom",
    name: "Top-Bottom (Tutup Pisah)",
    desc: "Kardus dengan tutup dan alas terpisah, memberikan kesan kokoh & formal.",
    popularFor: "Sepatu premium, Gift set, Hampers Lebaran/Natal",
    defaultP: 28,
    defaultL: 16,
    defaultT: 10,
  },
];

const PRESET_SIZES = [
  { label: "Hijab / Kaos (20x20x5 cm)", p: 20, l: 20, t: 5, type: "mailer" },
  { label: "Skincare / Serum (15x15x5 cm)", p: 15, l: 15, t: 5, type: "mailer" },
  { label: "Sepatu / Sandal (30x18x12 cm)", p: 30, l: 18, t: 12, type: "mailer" },
  { label: "Master Packing (35x25x20 cm)", p: 35, l: 25, t: 20, type: "reguler" },
  { label: "Snack / Cookies (24x24x7 cm)", p: 24, l: 24, t: 7, type: "pizza" },
];

export default function BoxCalculator() {
  const { settings } = usePortfolio();
  const [selectedType, setSelectedType] = useState<string>("mailer");
  const [length, setLength] = useState<number>(22);
  const [width, setWidth] = useState<number>(18);
  const [height, setHeight] = useState<number>(7);
  const [finishing, setFinishing] = useState<string>("Sablon 1 Warna (1 Sisi)");
  const [qty, setQty] = useState<string>("100 pcs");

  const currentBox =
    BOX_TYPES.find((b) => b.id === selectedType) || BOX_TYPES[0];

  const handleSelectPreset = (preset: (typeof PRESET_SIZES)[0]) => {
    setSelectedType(preset.type);
    setLength(preset.p);
    setWidth(preset.l);
    setHeight(preset.t);
  };

  const generateWhatsAppUrl = () => {
    const text = `Halo Admin Kemasan323 (KTD), saya ingin konsultasi dan minta estimasi harga custom kardus:

• Tipe Box: ${currentBox.name}
• Dimensi: ${length} x ${width} x ${height} cm (P x L x T)
• Pilihan Cetak: ${finishing}
• Perkiraan Jumlah: ${qty}

Apakah bisa dibantu info harga dan minimal ordernya? Terima kasih!`;

    return `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section
      id="kalkulator"
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-[#0B132B] dark:to-[#0E172E] relative transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 dark:bg-orange-950/60 text-[#FF6000] text-xs font-bold uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>Kalkulator & Estimasi Ukuran</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F2744] dark:text-white tracking-tight mb-4">
            Simulasikan Kardus Custom{" "}
            <span className="text-[#FF6000]">Sesuai Produkmu</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Pilih model kardus dan masukkan ukuran yang Anda butuhkan. Langsung
            kirimkan rincian ini ke WhatsApp admin untuk mendapatkan penawaran cepat!
          </p>
        </div>

        {/* Interactive Box Configurator Container */}
        <div className="bg-white dark:bg-[#162038] rounded-3xl border border-slate-200/90 dark:border-slate-700/60 shadow-xl overflow-hidden grid lg:grid-cols-12">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-700/60">
            {/* Step 1: Choose Box Model */}
            <div className="mb-8">
              <label className="block text-sm font-extrabold text-[#0F2744] dark:text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0F2744] dark:bg-[#FF6000] text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                Pilih Model Kardus
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {BOX_TYPES.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedType(b.id);
                      setLength(b.defaultP);
                      setWidth(b.defaultL);
                      setHeight(b.defaultT);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      selectedType === b.id
                        ? "border-[#FF6000] bg-orange-50/60 dark:bg-orange-950/40 ring-2 ring-orange-500/20 shadow-sm"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-[#1E293B]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-[#0F2744] dark:text-white">
                        {b.name.split(" (")[0]}
                      </span>
                      {selectedType === b.id && (
                        <CheckCircle className="w-4 h-4 text-[#FF6000]" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {b.popularFor}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="mb-6">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                ⚡ Ukuran Populer Rekomendasi:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_SIZES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className="text-xs font-medium px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-orange-950/50 hover:text-[#FF6000] dark:hover:text-[#FF6000] text-slate-700 dark:text-slate-300 transition-colors border border-slate-200/60 dark:border-slate-700"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions Input (P x L x T) */}
            <div className="mb-8">
              <label className="block text-sm font-extrabold text-[#0F2744] dark:text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0F2744] dark:bg-[#FF6000] text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Tentukan Dimensi (dalam cm)
              </label>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block">
                    Panjang (P)
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min="5"
                      max="150"
                      value={length}
                      onChange={(e) =>
                        setLength(Math.max(1, parseInt(e.target.value) || 0))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-800 dark:text-white text-sm outline-none transition-all"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">
                      cm
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block">
                    Lebar (L)
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min="5"
                      max="150"
                      value={width}
                      onChange={(e) =>
                        setWidth(Math.max(1, parseInt(e.target.value) || 0))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-800 dark:text-white text-sm outline-none transition-all"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">
                      cm
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block">
                    Tinggi (T)
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min="2"
                      max="150"
                      value={height}
                      onChange={(e) =>
                        setHeight(Math.max(1, parseInt(e.target.value) || 0))
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-800 dark:text-white text-sm outline-none transition-all"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-semibold">
                      cm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Cetak & Quantity */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  🎨 Opsi Sablon / Cetak Logo
                </label>
                <select
                  value={finishing}
                  onChange={(e) => setFinishing(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-semibold text-slate-800 dark:text-white text-xs sm:text-sm outline-none transition-all cursor-pointer"
                >
                  <option value="Polos (Tanpa Cetak)">Polos (Tanpa Cetak)</option>
                  <option value="Sablon 1 Warna (1 Sisi)">
                    Sablon 1 Warna (1 Sisi)
                  </option>
                  <option value="Sablon 2 Warna (1 Sisi)">
                    Sablon 2 Warna (1 Sisi)
                  </option>
                  <option value="Sablon 2 Sisi (Luar & Dalam)">
                    Sablon 2 Sisi (Luar & Dalam)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  📦 Rencana Jumlah Pesanan
                </label>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-semibold text-slate-800 dark:text-white text-xs sm:text-sm outline-none transition-all cursor-pointer"
                >
                  <option value="50 pcs (Sample/Testing)">50 pcs (Sample / Testing)</option>
                  <option value="100 pcs">100 pcs</option>
                  <option value="250 pcs">250 pcs</option>
                  <option value="500 pcs">500 pcs</option>
                  <option value="1.000 pcs+ (Harga Spesial)">
                    1.000 pcs+ (Harga Spesial)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Live Summary & WhatsApp Direct CTA (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0F2744] via-[#133E6D] to-[#0A192F] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6000]/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#FF6000]" />
                  <span className="font-bold text-sm text-slate-200">
                    Ringkasan Spesifikasi
                  </span>
                </div>
                <span className="text-[11px] font-semibold bg-[#FF6000]/20 text-orange-300 px-2.5 py-1 rounded-full border border-orange-400/30">
                  Custom Order
                </span>
              </div>

              {/* Dynamic Summary Cards */}
              <div className="space-y-3.5 mb-8">
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">
                    Model Kardus:
                  </span>
                  <span className="text-xs font-bold text-white text-right">
                    {currentBox.name.split(" (")[0]}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">
                    Dimensi (P x L x T):
                  </span>
                  <span className="text-sm font-extrabold text-orange-400">
                    {length} × {width} × {height} cm
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">
                    Finishing Cetak:
                  </span>
                  <span className="text-xs font-bold text-white text-right">
                    {finishing}
                  </span>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">
                    Estimasi Jumlah:
                  </span>
                  <span className="text-xs font-bold text-emerald-300 text-right">
                    {qty}
                  </span>
                </div>
              </div>
            </div>

            {/* Instant Action CTA */}
            <div>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#FF6000] hover:bg-[#E55500] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-2xl shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-200 group active:scale-95 text-center"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>Minta Harga Ukuran Ini via WA 💬</span>
              </a>

              <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
                <span>⚡ Admin membalas pesan dalam hitungan menit</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
