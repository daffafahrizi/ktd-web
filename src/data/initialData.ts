export type PortfolioCategory =
  | "fashion"
  | "fnb"
  | "skincare"
  | "hampers"
  | "custom";

export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  title: string;
  categoryLabel: string;
  size: string;
  material: string;
  client: string;
  imageSrc?: string;
  colorScheme: string;
  accentBg: string;
  description: string;
  createdAt?: string;
};

export type ShopSettings = {
  whatsappNumber: string;
  adminName: string;
  isOpenToday: boolean;
  operatingHours: string;
  workshopAddress: string;
  instagramHandle: string;
  instagramUrl: string;
  adminPin: string;
};

export const INITIAL_SETTINGS: ShopSettings = {
  whatsappNumber: "6281234567890",
  adminName: "Admin Kemasan323",
  isOpenToday: true,
  operatingHours: "Senin – Sabtu: 08.00 – 17.00 WIB",
  workshopAddress:
    "Workshop Kemasan323 (KTD) - Pusat Produksi & Custom Box Packaging Karton Berkualitas (Pengiriman ke Seluruh Indonesia via Kargo & Ekspedisi).",
  instagramHandle: "@kemasan323",
  instagramUrl: "https://instagram.com/kemasan323",
  adminPin: "ktd323",
};

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "1",
    category: "fashion",
    title: "Eksklusif Hijab & Apparel Mailer Box",
    categoryLabel: "Fashion & Hijab",
    size: "22 x 18 x 6 cm",
    material: "E-Flute Corrugated + Sablon Gold & Hitam",
    client: "Local Modest Fashion Brand",
    colorScheme: "from-amber-100 to-orange-100 border-amber-300/40 text-amber-900",
    accentBg: "bg-amber-800 text-white",
    description:
      "Kardus model ear-lock die-cut rapi dengan sablon logo presisi di bagian penutup luar dan ucapan terima kasih di balik tutup.",
  },
  {
    id: "2",
    category: "skincare",
    title: "Skincare Glow Package & Beauty Box",
    categoryLabel: "Beauty & Skincare",
    size: "16 x 14 x 5 cm",
    material: "Karton Kraft Tebal + Sablon Putih & Pastel",
    client: "Organic Beauty Brand",
    colorScheme: "from-pink-50 to-rose-100 border-pink-200 text-rose-900",
    accentBg: "bg-rose-700 text-white",
    description:
      "Desain compact yang melindungi botol serum dan pot krim kaca agar tidak goyang selama pengiriman kurir reguler.",
  },
  {
    id: "3",
    category: "fnb",
    title: "Artisan Cookies & Pastry Box",
    categoryLabel: "Food & Beverage",
    size: "25 x 25 x 8 cm",
    material: "Food-safe Cardboard + Sablon Cokelat Klasik",
    client: "Artisan Bakery Shop",
    colorScheme: "from-orange-50 to-amber-100 border-orange-200 text-amber-950",
    accentBg: "bg-amber-900 text-white",
    description:
      "Kardus pizza flat style dengan ventilasi udara halus untuk menjaga kerenyahan cookies dan kue kering tetap utuh.",
  },
  {
    id: "4",
    category: "hampers",
    title: "Luxury Hampers Gift Box Set",
    categoryLabel: "Hampers & Gift",
    size: "30 x 22 x 10 cm",
    material: "Double Wall Corrugated + Hot Print Logo",
    client: "Corporate & Event Organizer",
    colorScheme: "from-blue-50 to-slate-100 border-blue-200 text-slate-900",
    accentBg: "bg-[#0F2744] text-white",
    description:
      "Kekuatan ekstra untuk menampung sajadah, mug keramik, dan toples madu dengan tampilan yang sangat berkelas.",
  },
  {
    id: "5",
    category: "fashion",
    title: "Sneakers & Footwear Premium Box",
    categoryLabel: "Fashion & Footwear",
    size: "32 x 20 x 12 cm",
    material: "B-Flute Heavy Duty + Sablon 2 Warna",
    client: "Streetwear Shoes Brand",
    colorScheme: "from-slate-100 to-zinc-200 border-zinc-300 text-zinc-900",
    accentBg: "bg-zinc-800 text-white",
    description:
      "Konstruksi kokoh tahan tumpuk untuk penyimpanan di gudang maupun pengiriman ke seluruh pelosok Indonesia.",
  },
  {
    id: "6",
    category: "fnb",
    title: "Coffee Drip Bag & Tumbler Outer Box",
    categoryLabel: "Food & Beverage",
    size: "20 x 15 x 10 cm",
    material: "E-Flute Kraft Paper + Sablon Hitam Solid",
    client: "Specialty Roastery",
    colorScheme: "from-stone-100 to-amber-50 border-stone-200 text-stone-900",
    accentBg: "bg-stone-800 text-white",
    description:
      "Memberikan kesan natural, ramah lingkungan, dan estetik saat difoto oleh pelanggan untuk story Instagram.",
  },
];
