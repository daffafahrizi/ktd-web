-- ==============================================================================
-- SCHEMA DATABASE & STORAGE UNTUK KEMASAN323 (KTD)
-- Jalankan query SQL ini di menu "SQL Editor" pada dashboard Supabase Anda.
-- ==============================================================================

-- 1. TABEL PRODUK KATALOG (portfolio_items)
CREATE TABLE IF NOT EXISTS public.portfolio_items (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    category_label TEXT NOT NULL,
    size TEXT NOT NULL,
    material TEXT NOT NULL,
    client TEXT NOT NULL,
    description TEXT,
    image_src TEXT,
    color_scheme TEXT DEFAULT 'from-amber-100 to-orange-100 border-amber-300/40 text-amber-900',
    accent_bg TEXT DEFAULT 'bg-amber-800 text-white',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. TABEL PENGATURAN TOKO & WHATSAPP (shop_settings)
CREATE TABLE IF NOT EXISTS public.shop_settings (
    id TEXT PRIMARY KEY DEFAULT 'ktd_main_settings',
    whatsapp_number TEXT NOT NULL DEFAULT '6281234567890',
    admin_name TEXT NOT NULL DEFAULT 'Admin Kemasan323',
    is_open_today BOOLEAN NOT NULL DEFAULT true,
    operating_hours TEXT NOT NULL DEFAULT 'Senin – Sabtu: 08.00 – 17.00 WIB',
    workshop_address TEXT NOT NULL DEFAULT 'Workshop Kemasan323 (KTD) - Pusat Produksi & Custom Box Packaging Karton Berkualitas (Pengiriman ke Seluruh Indonesia via Kargo & Ekspedisi).',
    instagram_handle TEXT NOT NULL DEFAULT '@kemasan323',
    instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/kemasan323',
    admin_pin TEXT NOT NULL DEFAULT 'ktd323',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;

-- 4. POLICIES (Izin Akses Publik)
-- Izinkan siapapun membaca katalog & pengaturan (Read)
CREATE POLICY "Public Read Portfolio" ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.shop_settings FOR SELECT USING (true);

-- Izinkan penambahan, pengeditan, & penghapusan (All Operations)
CREATE POLICY "Public All Portfolio" ON public.portfolio_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public All Settings" ON public.shop_settings FOR ALL USING (true) WITH CHECK (true);

-- 5. STORAGE BUCKET UNTUK FOTO PRODUK ('portfolio')
-- Membuat bucket penyimpanan foto publik
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Policy agar foto di bucket bisa dilihat publik
CREATE POLICY "Public Storage Select" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio');

-- Policy agar foto bisa diupload ke bucket
CREATE POLICY "Public Storage Insert" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'portfolio');

-- Policy agar foto bisa diupdate/dihapus
CREATE POLICY "Public Storage Update" ON storage.objects
FOR UPDATE USING (bucket_id = 'portfolio');
CREATE POLICY "Public Storage Delete" ON storage.objects
FOR DELETE USING (bucket_id = 'portfolio');

-- 6. DATA AWAL (SEED INITIAL DATA)
INSERT INTO public.shop_settings (
    id, whatsapp_number, admin_name, is_open_today, operating_hours,
    workshop_address, instagram_handle, instagram_url, admin_pin
) VALUES (
    'ktd_main_settings', '6281234567890', 'Admin Kemasan323', true,
    'Senin – Sabtu: 08.00 – 17.00 WIB',
    'Workshop Kemasan323 (KTD) - Pusat Produksi & Custom Box Packaging Karton Berkualitas (Pengiriman ke Seluruh Indonesia via Kargo & Ekspedisi).',
    '@kemasan323', 'https://instagram.com/kemasan323', 'ktd323'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.portfolio_items (
    id, title, category, category_label, size, material, client,
    color_scheme, accent_bg, description
) VALUES
('1', 'Eksklusif Hijab & Apparel Mailer Box', 'fashion', 'Fashion & Hijab', '22 x 18 x 6 cm', 'E-Flute Corrugated + Sablon Gold & Hitam', 'Local Modest Fashion Brand', 'from-amber-100 to-orange-100 border-amber-300/40 text-amber-900', 'bg-amber-800 text-white', 'Kardus model ear-lock die-cut rapi dengan sablon logo presisi di bagian penutup luar dan ucapan terima kasih di balik tutup.'),
('2', 'Skincare Glow Package & Beauty Box', 'skincare', 'Beauty & Skincare', '16 x 14 x 5 cm', 'Karton Kraft Tebal + Sablon Putih & Pastel', 'Organic Beauty Brand', 'from-pink-50 to-rose-100 border-pink-200 text-rose-900', 'bg-rose-700 text-white', 'Desain compact yang melindungi botol serum dan pot krim kaca agar tidak goyang selama pengiriman kurir reguler.'),
('3', 'Artisan Cookies & Pastry Box', 'fnb', 'Food & Beverage', '25 x 25 x 8 cm', 'Food-safe Cardboard + Sablon Cokelat Klasik', 'Artisan Bakery Shop', 'from-orange-50 to-amber-100 border-orange-200 text-amber-950', 'bg-amber-900 text-white', 'Kardus pizza flat style dengan ventilasi udara halus untuk menjaga kerenyahan cookies dan kue kering tetap utuh.'),
('4', 'Luxury Hampers Gift Box Set', 'hampers', 'Hampers & Gift', '30 x 22 x 10 cm', 'Double Wall Corrugated + Hot Print Logo', 'Corporate & Event Organizer', 'from-blue-50 to-slate-100 border-blue-200 text-slate-900', 'bg-[#0F2744] text-white', 'Kekuatan ekstra untuk menampung sajadah, mug keramik, dan toples madu dengan tampilan yang sangat berkelas.'),
('5', 'Sneakers & Footwear Premium Box', 'fashion', 'Fashion & Footwear', '32 x 20 x 12 cm', 'B-Flute Heavy Duty + Sablon 2 Warna', 'Streetwear Shoes Brand', 'from-slate-100 to-zinc-200 border-zinc-300 text-zinc-900', 'bg-zinc-800 text-white', 'Konstruksi kokoh tahan tumpuk untuk penyimpanan di gudang maupun pengiriman ke seluruh pelosok Indonesia.'),
('6', 'Coffee Drip Bag & Tumbler Outer Box', 'fnb', 'Food & Beverage', '20 x 15 x 10 cm', 'E-Flute Kraft Paper + Sablon Hitam Solid', 'Specialty Roastery', 'from-stone-100 to-amber-50 border-stone-200 text-stone-900', 'bg-stone-800 text-white', 'Memberikan kesan natural, ramah lingkungan, dan estetik saat difoto oleh pelanggan untuk story Instagram.')
ON CONFLICT (id) DO NOTHING;
