"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  Save,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Lock,
  Unlock,
  Sliders,
  Settings,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  Upload,
  X,
  Eye,
  RefreshCw,
  LogOut,
  HelpCircle,
  Layers,
  ArrowRight,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import { PortfolioItem, PortfolioCategory } from "@/data/initialData";
import { InstagramIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import Logo from "@/components/Logo";
import { isSupabaseConfigured, uploadImageToSupabase } from "@/lib/supabase";

const CATEGORY_OPTIONS: { value: PortfolioCategory; label: string }[] = [
  { value: "fashion", label: "👗 Fashion & Hijab" },
  { value: "skincare", label: "✨ Beauty & Skincare" },
  { value: "fnb", label: "🍪 Food & Beverage" },
  { value: "hampers", label: "🎁 Hampers & Gift" },
  { value: "custom", label: "📦 Custom & Master Box" },
];

const COLOR_PRESETS = [
  {
    name: "Amber Gold",
    colorScheme: "from-amber-100 to-orange-100 border-amber-300/40 text-amber-900",
    accentBg: "bg-amber-800 text-white",
  },
  {
    name: "Rose Pink",
    colorScheme: "from-pink-50 to-rose-100 border-pink-200 text-rose-900",
    accentBg: "bg-rose-700 text-white",
  },
  {
    name: "Navy Blue",
    colorScheme: "from-blue-50 to-slate-100 border-blue-200 text-slate-900",
    accentBg: "bg-[#0F2744] text-white",
  },
  {
    name: "Orange KTD",
    colorScheme: "from-orange-50 to-amber-100 border-orange-200 text-amber-950",
    accentBg: "bg-[#FF6000] text-white",
  },
  {
    name: "Slate Stone",
    colorScheme: "from-stone-100 to-slate-200 border-slate-300 text-slate-900",
    accentBg: "bg-slate-800 text-white",
  },
];

export default function AdminPage() {
  const {
    portfolio,
    settings,
    isSupabaseConnected,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    updateSettings,
    resetToDefaults,
    refreshFromCloud,
  } = usePortfolio();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Active Tab
  const [activeTab, setActiveTab] = useState<"catalog" | "settings" | "database" | "guide">("catalog");

  // Search & Filter in Catalog
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<PortfolioCategory>("fashion");
  const [formLength, setFormLength] = useState<number>(20);
  const [formWidth, setFormWidth] = useState<number>(15);
  const [formHeight, setFormHeight] = useState<number>(6);
  const [formMaterial, setFormMaterial] = useState("E-Flute Corrugated + Sablon 1 Warna");
  const [formClient, setFormClient] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImageSrc, setFormImageSrc] = useState("");
  const [formColorIdx, setFormColorIdx] = useState(0);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === settings.adminPin || pinInput === "ktd323") {
      setIsAuthenticated(true);
      setAuthError("");
      setSettingsForm({ ...settings });
    } else {
      setAuthError("PIN salah! Coba masukkan PIN default: ktd323");
    }
  };

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormTitle("");
    setFormCategory("fashion");
    setFormLength(22);
    setFormWidth(18);
    setFormHeight(7);
    setFormMaterial("E-Flute Corrugated + Sablon 1 Warna");
    setFormClient("Brand Klien");
    setFormDescription("Kardus custom berkualitas tinggi dengan kerapian lipatan die-cut dan sablon presisi.");
    setFormImageSrc("");
    setFormColorIdx(0);
    setUploadError("");
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (item: PortfolioItem) => {
    setEditingId(item.id);
    setFormTitle(item.title);
    setFormCategory(item.category);
    
    const sizeMatch = item.size.match(/(\d+)\s*x\s*(\d+)\s*x\s*(\d+)/i);
    if (sizeMatch) {
      setFormLength(parseInt(sizeMatch[1]) || 20);
      setFormWidth(parseInt(sizeMatch[2]) || 15);
      setFormHeight(parseInt(sizeMatch[3]) || 5);
    } else {
      setFormLength(20);
      setFormWidth(15);
      setFormHeight(5);
    }

    setFormMaterial(item.material);
    setFormClient(item.client);
    setFormDescription(item.description);
    setFormImageSrc(item.imageSrc || "");
    setFormColorIdx(0);
    setUploadError("");
    setIsModalOpen(true);
  };

  // Helper for compressing image to base64 WebP
  const compressImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/webp", 0.82);
            resolve(dataUrl);
          } else {
            resolve(readerEvent.target?.result as string);
          }
        };
        img.onerror = () => reject(new Error("Gagal memproses file gambar"));
        img.src = readerEvent.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Handle File Upload: Uploads to Supabase Storage if configured, or falls back to WebP
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal 15MB");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      // 1. Jika Supabase terhubung, upload langsung ke Cloud Storage
      if (isSupabaseConfigured) {
        const { url, error } = await uploadImageToSupabase(file);
        if (url) {
          setFormImageSrc(url);
          setIsUploading(false);
          return;
        } else {
          console.warn("Supabase upload error, falling back to local WebP:", error);
        }
      }

      // 2. Fallback kompresi lokal WebP
      const base64Url = await compressImageToBase64(file);
      setFormImageSrc(base64Url);
    } catch (err: any) {
      setUploadError("Gagal memproses gambar: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Save Item (Create / Update)
  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Mohon isi judul produk");
      return;
    }

    const categoryObj = CATEGORY_OPTIONS.find((c) => c.value === formCategory);
    const categoryLabel = categoryObj ? categoryObj.label.split(" ")[1] : "Custom";
    const selectedColor = COLOR_PRESETS[formColorIdx] || COLOR_PRESETS[0];
    const formattedSize = `${formLength} x ${formWidth} x ${formHeight} cm`;

    const itemData = {
      title: formTitle,
      category: formCategory,
      categoryLabel: categoryLabel,
      size: formattedSize,
      material: formMaterial,
      client: formClient || "Brand Klien",
      description: formDescription,
      imageSrc: formImageSrc.trim() || undefined,
      colorScheme: selectedColor.colorScheme,
      accentBg: selectedColor.accentBg,
    };

    if (editingId) {
      updatePortfolioItem(editingId, itemData);
    } else {
      addPortfolioItem(itemData);
    }

    setIsModalOpen(false);
  };

  // Delete Item
  const handleDeleteItem = (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${title}" dari katalog?`)) {
      deletePortfolioItem(id);
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSaveSuccessMessage("Pengaturan toko & WhatsApp berhasil diperbarui!");
    setTimeout(() => setSaveSuccessMessage(""), 4000);
  };

  // Filtered Items
  const filteredItems = portfolio.filter((item) => {
    const matchCat = filterCategory === "all" || item.category === filterCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  // --- SCREEN 1: LOGIN AUTHENTICATION ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F2744] via-[#133E6D] to-[#0A192F] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-[#162038] rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-700/60 text-center relative overflow-hidden">
          {/* Accent top banner */}
          <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#FF6000] via-orange-400 to-[#0F2744]" />

          {/* Logo Badge */}
          <div className="mb-6 flex justify-center">
            <Logo size="lg" />
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F2744] dark:text-white mb-2">
            Masuk ke Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            Kelola katalog produk kardus custom, foto, dan nomor WhatsApp toko Anda.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#FF6000]" />
                <span>Masukkan PIN Admin</span>
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN (Default: ktd323)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-800 dark:text-white text-center tracking-widest text-lg outline-none transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#FF6000] hover:bg-[#E55500] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 text-sm"
            >
              <Unlock className="w-4 h-4" />
              <span>Buka Dashboard Admin</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span>PIN Default: <strong>ktd323</strong></span>
            <Link
              href="/"
              className="text-[#FF6000] font-bold hover:underline flex items-center gap-1"
            >
              <span>Lihat Web Publik</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- SCREEN 2: MAIN ADMIN DASHBOARD ---
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0B132B] text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      {/* Top Admin Header Bar */}
      <header className="bg-[#0F2744] dark:bg-[#070D1E] text-white sticky top-0 z-40 shadow-md border-b border-slate-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Logo size="sm" variant="admin" />
            </Link>
          </div>

          {/* Quick Info & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <ThemeToggle className="text-white hover:text-orange-400 hover:bg-white/10 dark:hover:bg-white/10" />

            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-slate-200 border border-white/10">
              <span
                className={`w-2 h-2 rounded-full ${
                  settings.isOpenToday ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
                }`}
              />
              <span>{settings.isOpenToday ? "Toko Buka" : "Toko Libur"}</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all border border-white/15"
            >
              <span>Lihat Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-white hover:bg-rose-500/20 px-3 py-2 rounded-xl transition-all"
              title="Keluar dari Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-grow w-full">
        {/* Metric Cards Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-[#162038] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider">
                Total Produk
              </span>
              <span className="text-2xl font-black text-[#0F2744] dark:text-white">
                {portfolio.length}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#FF6000] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#162038] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider">
                Kategori Aktif
              </span>
              <span className="text-2xl font-black text-[#0F2744] dark:text-white">
                {CATEGORY_OPTIONS.length}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-[#0F2744] dark:text-blue-300 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#162038] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider">
                No. WA Admin
              </span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 block truncate max-w-[120px]">
                +{settings.whatsappNumber}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#162038] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1 uppercase tracking-wider">
                Status Toko
              </span>
              <span
                className={`text-sm font-black ${
                  settings.isOpenToday ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {settings.isOpenToday ? "🟢 Buka Hari Ini" : "🔴 Sedang Libur"}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700/60 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "catalog"
                ? "border-[#FF6000] text-[#FF6000]"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Katalog & Produk Kardus ({portfolio.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("settings");
              setSettingsForm({ ...settings });
            }}
            className={`pb-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "settings"
                ? "border-[#FF6000] text-[#FF6000]"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan WhatsApp & Toko</span>
          </button>

          <button
            onClick={() => setActiveTab("database")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "database"
                ? "border-[#FF6000] text-[#FF6000]"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Database Cloud (Supabase)</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                isSupabaseConnected
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"
              }`}
            >
              {isSupabaseConnected ? "Terhubung" : "Setup"}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("guide")}
            className={`pb-3 px-4 font-bold text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === "guide"
                ? "border-[#FF6000] text-[#FF6000]"
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Panduan & Tips Foto</span>
          </button>
        </div>

        {/* --- TAB 1: CATALOG MANAGEMENT --- */}
        {activeTab === "catalog" && (
          <div>
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-2.5 flex-1">
                <div className="relative flex-1 min-w-[220px] max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul produk, klien, atau bahan..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#162038] rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium outline-none focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 text-slate-800 dark:text-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-white dark:bg-[#162038] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none focus:border-[#FF6000]"
                >
                  <option value="all">Semua Kategori</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add New Product Button */}
              <button
                onClick={handleOpenAddModal}
                className="inline-flex items-center justify-center gap-2 bg-[#FF6000] hover:bg-[#E55500] text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-orange-500/30 transition-all text-xs sm:text-sm flex-shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Baru</span>
              </button>
            </div>

            {/* Product Cards Table/Grid */}
            {filteredItems.length === 0 ? (
              <div className="bg-white dark:bg-[#162038] rounded-3xl p-12 text-center border border-slate-200/80 dark:border-slate-700/60">
                <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700 dark:text-slate-200 text-base mb-1">
                  Tidak ada produk yang cocok
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Coba ubah kata kunci pencarian atau tambahkan produk kardus baru.
                </p>
                <button
                  onClick={handleOpenAddModal}
                  className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-950/60 text-[#FF6000] font-bold text-xs px-4 py-2 rounded-xl hover:bg-orange-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Produk Baru</span>
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#162038] rounded-3xl border border-slate-200/90 dark:border-slate-700/60 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Visual / Image Section */}
                    <div
                      className={`p-5 bg-gradient-to-br ${item.colorScheme} border-b dark:border-slate-700/50 relative min-h-[170px] overflow-hidden flex flex-col justify-between`}
                    >
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

                      {!item.imageSrc ? (
                        <div className="my-auto py-2 text-center relative z-10">
                          <div className="inline-block bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-sm border border-white/80 dark:border-slate-700">
                            <div className="flex items-center justify-center gap-1 font-bold text-xs text-[#0F2744] dark:text-white">
                              <span className="w-2 h-2 rounded-full bg-[#FF6000]" />
                              <span>{item.client}</span>
                            </div>
                            <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium block">
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
                        <span>{item.imageSrc ? "📸 Foto Asli" : "🎨 Mockup Grafis"}</span>
                        <span>{item.client}</span>
                      </div>
                    </div>

                    {/* Details & Actions */}
                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h4 className="font-bold text-[#0F2744] dark:text-white text-sm mb-1.5 line-clamp-1 group-hover:text-[#FF6000] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs py-2 px-3 rounded-xl transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item.id, item.title)}
                          className="inline-flex items-center justify-center p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/60 transition-colors"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB 2: SETTINGS MANAGEMENT --- */}
        {activeTab === "settings" && (
          <div className="max-w-3xl bg-white dark:bg-[#162038] rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-700/60 shadow-sm">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-700/60">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0F2744] dark:text-white">
                  Pengaturan WhatsApp & Operasional Toko
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Informasi ini langsung terhubung dengan tombol CTA dan footer di landing page.
                </p>
              </div>
            </div>

            {saveSuccessMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-semibold">{saveSuccessMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#FF6000]" />
                  <span>Nomor WhatsApp Admin (Gunakan kode negara 62)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 font-bold text-xs text-slate-400">
                    +
                  </span>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        whatsappNumber: e.target.value.replace(/[^0-9]/g, ""),
                      })
                    }
                    placeholder="Contoh: 6281234567890"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-800 dark:text-white text-sm outline-none transition-all"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Semua tombol "Chat WhatsApp" dan "Minta Harga via WA" akan otomatis mengarah ke nomor ini.
                </span>
              </div>

              {/* Store Open Status Toggle */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-[#0F2744] dark:text-white block">
                    Status Buka / Tutup Toko Hari Ini
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Menampilkan badge "🟢 Admin Siap Melayani" di navbar publik.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.isOpenToday}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        isOpenToday: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6000]"></div>
                </label>
              </div>

              {/* Operating Hours */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF6000]" />
                  <span>Jam Operasional Admin</span>
                </label>
                <input
                  type="text"
                  value={settingsForm.operatingHours}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      operatingHours: e.target.value,
                    })
                  }
                  placeholder="Contoh: Senin – Sabtu: 08.00 – 17.00 WIB"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-medium text-slate-800 dark:text-white text-sm outline-none transition-all"
                />
              </div>

              {/* Workshop Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6000]" />
                  <span>Alamat Workshop & Operasional</span>
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.workshopAddress}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      workshopAddress: e.target.value,
                    })
                  }
                  placeholder="Alamat workshop lengkap..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-medium text-slate-800 dark:text-white text-sm outline-none transition-all"
                />
              </div>

              {/* Instagram Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <InstagramIcon className="w-3.5 h-3.5 text-[#FF6000]" />
                    <span>Handle Instagram</span>
                  </label>
                  <input
                    type="text"
                    value={settingsForm.instagramHandle}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        instagramHandle: e.target.value,
                      })
                    }
                    placeholder="@kemasan323"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-medium text-slate-800 dark:text-white text-sm outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#FF6000]" />
                    <span>PIN Masuk Admin (Keamanan)</span>
                  </label>
                  <input
                    type="text"
                    value={settingsForm.adminPin}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        adminPin: e.target.value,
                      })
                    }
                    placeholder="ktd323"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-bold text-slate-800 dark:text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF6000] hover:bg-[#E55500] text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all text-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Pengaturan</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Kembalikan data katalog dan pengaturan ke kondisi awal default?")) {
                      resetToDefaults();
                      setSettingsForm({ ...settings });
                      alert("Data berhasil direset ke default!");
                    }
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Reset ke Data Awal Pabrik
                </button>
              </div>
            </form>
          </div>
        )}

        {/* --- TAB 3: SUPABASE DATABASE CLOUD --- */}
        {activeTab === "database" && (
          <div className="max-w-3xl bg-white dark:bg-[#162038] rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-700/60 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700/60">
              <div>
                <h3 className="text-xl font-extrabold text-[#0F2744] dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#FF6000]" />
                  <span>Koneksi Supabase Cloud Database & Storage</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Hubungkan database PostgreSQL dan Cloud Storage Supabase gratis agar semua pengunjung web melihat update katalog secara live.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  refreshFromCloud();
                  alert("Mencoba sinkronisasi ulang data dari Supabase...");
                }}
                className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors self-start sm:self-auto flex-shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Test Koneksi Cloud</span>
              </button>
            </div>

            {/* Connection Status Banner */}
            <div
              className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                isSupabaseConnected
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                  : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${
                    isSupabaseConnected ? "bg-emerald-500 animate-ping" : "bg-amber-500"
                  }`}
                />
                <div>
                  <h4 className="font-bold text-sm">
                    {isSupabaseConnected
                      ? "Supabase Cloud Aktif & Terhubung!"
                      : "Mode Penyimpanan Lokal (Belum Terkoneksi Supabase)"}
                  </h4>
                  <p className="text-xs opacity-90 mt-0.5">
                    {isSupabaseConnected
                      ? "Produk dan foto yang Anda upload tersimpan permanen di cloud CDN dan langsung tampil ke seluruh dunia."
                      : "Data saat ini tersimpan di browser ini. Ikuti 3 langkah di bawah untuk menghubungkan Supabase gratis."}
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Step Wizard */}
            <div className="space-y-4 pt-2">
              {/* Step 1 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0F2744] dark:text-white">
                  <span className="w-6 h-6 rounded-full bg-[#FF6000] text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Buat Proyek Gratis di Supabase</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-8 leading-relaxed">
                  Buka <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#FF6000] font-bold underline">supabase.com</a>, daftar/login gratis, lalu buat proyek baru (contoh nama: <code>kemasan323-db</code>).
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0F2744] dark:text-white">
                  <span className="w-6 h-6 rounded-full bg-[#FF6000] text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Jalankan Script SQL di SQL Editor Supabase</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-8 leading-relaxed">
                  Buka menu <strong>SQL Editor</strong> di dashboard Supabase Anda, buat query baru, lalu jalankan query dari file <code>supabase_schema.sql</code> yang sudah kami sediakan di proyek ini.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0F2744] dark:text-white">
                  <span className="w-6 h-6 rounded-full bg-[#FF6000] text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Masukkan API Keys ke Vercel / .env.local</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-8 leading-relaxed">
                  Buka <strong>Project Settings → API</strong> di Supabase. Salin URL dan anon public key ke <strong>Environment Variables di Vercel</strong>:
                </p>
                <div className="bg-slate-900 text-slate-100 p-3.5 rounded-xl text-xs font-mono pl-8 space-y-1 overflow-x-auto">
                  <div>NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co</div>
                  <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: ADMIN GUIDE --- */}
        {activeTab === "guide" && (
          <div className="max-w-3xl bg-white dark:bg-[#162038] rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-700/60 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-[#0F2744] dark:text-white mb-2">
                💡 Panduan & Tips Upload Foto Produk Kardus
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Ikuti tips berikut agar landing page Kemasan323 selalu terlihat profesional, rapi, dan memikat calon pembeli.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-800/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FF6000] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F2744] dark:text-white mb-1">
                    Gunakan Rasio Foto 1:1 (Square) atau 4:3
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Foto kardus dengan sudut 45 derajat (tampak depan dan samping) dengan pencahayaan terang agar detail lipatan dan sablon logo terlihat jelas.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0F2744] dark:bg-slate-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F2744] dark:text-white mb-1">
                    Kompres Ukuran File Gambar (Di Bawah 1-2 MB)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Pastikan ukuran foto tidak terlalu besar agar pengunjung yang membuka web dari link bio Instagram di HP dapat memuat katalog secara instan tanpa loading lama.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-300 mb-1">
                    Format Dimensi Konsisten (Panjang x Lebar x Tinggi cm)
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400 leading-relaxed">
                    Saat input ukuran, masukkan nilai Panjang, Lebar, dan Tinggi dalam satuan centimeter (cm). Sistem akan memformatnya secara rapi di katalog dan kalkulator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- MODAL: ADD / EDIT PRODUCT --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#162038] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-700 my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#FF6000] flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0F2744] dark:text-white text-lg">
                    {editingId ? "Edit Produk Kardus" : "Tambah Produk Kardus Baru"}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Produk ini akan langsung tampil di galeri katalog landing page.
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-5">
              {/* Image Upload Zone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#FF6000]" />
                  <span>Foto Produk (Upload Langsung dari Komputer/HP)</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:bg-orange-50/30 dark:hover:bg-slate-800 transition-all">
                  {/* Image Preview Box */}
                  <div className="w-28 h-28 rounded-xl bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center flex-shrink-0 relative border border-slate-300 dark:border-slate-600">
                    {formImageSrc ? (
                      <>
                        <img
                          src={formImageSrc}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormImageSrc("")}
                          className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white p-1 rounded-full text-[10px]"
                          title="Hapus foto"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-2 text-slate-400">
                        <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-[9px] block font-medium">Belum ada foto</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                    />

                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 bg-[#0F2744] dark:bg-[#FF6000] hover:bg-[#163B66] dark:hover:bg-[#E55500] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploading ? "Mengunggah..." : "Pilih File Foto"}</span>
                      </button>

                      {formImageSrc && (
                        <button
                          type="button"
                          onClick={() => setFormImageSrc("")}
                          className="text-xs text-rose-600 dark:text-rose-400 font-semibold px-3 py-2 hover:underline"
                        >
                          Gunakan Mockup Default
                        </button>
                      )}
                    </div>

                    <div className="text-[10px] text-slate-400">
                      Mendukung format PNG, JPG, WebP (Maks. 5MB). Foto akan tersimpan otomatis.
                    </div>

                    {/* Or URL input */}
                    <div className="pt-1">
                      <input
                        type="text"
                        value={formImageSrc}
                        onChange={(e) => setFormImageSrc(e.target.value)}
                        placeholder="Atau tempel URL gambar langsung..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs outline-none focus:border-[#FF6000] text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {uploadError && (
                  <span className="text-xs text-rose-600 font-semibold mt-1 block">
                    {uploadError}
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Judul Produk Kardus *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Contoh: Eksklusif Hijab Mailer Box"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-semibold text-slate-800 dark:text-white text-xs sm:text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Kategori Industri
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as PortfolioCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] focus:ring-2 focus:ring-orange-500/20 font-semibold text-slate-800 dark:text-white text-xs sm:text-sm outline-none"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dimensions (P x L x T) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Dimensi Kardus (cm)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={formLength}
                      onChange={(e) => setFormLength(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 font-bold text-xs text-slate-800 dark:text-white outline-none focus:border-[#FF6000]"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold">
                      P (cm)
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={formWidth}
                      onChange={(e) => setFormWidth(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 font-bold text-xs text-slate-800 dark:text-white outline-none focus:border-[#FF6000]"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold">
                      L (cm)
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={formHeight}
                      onChange={(e) => setFormHeight(parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 font-bold text-xs text-slate-800 dark:text-white outline-none focus:border-[#FF6000]"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold">
                      T (cm)
                    </span>
                  </div>
                </div>
              </div>

              {/* Material & Client Tag */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Material / Bahan & Sablon
                  </label>
                  <input
                    type="text"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    placeholder="E-Flute + Sablon 1 Warna"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] text-xs font-medium text-slate-800 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nama Klien / Tipe Brand
                  </label>
                  <input
                    type="text"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    placeholder="Contoh: Local Modest Fashion"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] text-xs font-medium text-slate-800 dark:text-white outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Deskripsi Singkat Keunggulan
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Kardus lipat die-cut rapi dengan sablon logo presisi..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:border-[#FF6000] text-xs text-slate-800 dark:text-white outline-none leading-relaxed"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#FF6000] hover:bg-[#E55500] text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-md transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingId ? "Perbarui Produk" : "Simpan & Publikasikan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
