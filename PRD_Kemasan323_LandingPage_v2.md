# Product Requirements Document (PRD) - Kemasan323 Landing Page

## 1. Project Overview
*   **Project Name:** Kemasan323 (KTD) Landing Page
*   **Tagline:** "More Than Brown Boxes" 📦
*   **Primary Goal:** Membangun *landing page* yang ringkas dan *straight to the point* untuk mengonversi trafik dari Instagram @kemasan323 menjadi *leads* di WhatsApp. Halaman ini harus bertindak sebagai katalog digital cepat untuk layanan kardus custom.

## 2. Target Audience
*   Pelaku UMKM, pemilik *online shop*, dan *brand owner* yang butuh *packaging* kardus custom berkualitas tanpa proses pemesanan yang ribet.

## 3. Design System & Visual Guidelines
*   **Color Palette (Strict Logo Match):** 
    *   **Vibrant Orange:** Diambil dari huruf "K" pada logo KTD. Gunakan secara eksklusif untuk tombol *Call to Action* (CTA), ikon, dan elemen yang membutuhkan perhatian langsung (*highlight*).
    *   **Deep Blue:** Diambil dari huruf "TD" pada logo KTD. Gunakan untuk teks *Heading* utama, *footer*, dan elemen struktural agar terlihat profesional dan terpercaya.
    *   **Background:** Didominasi warna putih (*clean white*) atau abu-abu sangat terang (*off-white*) agar foto produk kardus dan warna logo lebih *stand out*.
*   **Typography:** Sans-serif modern dan bersih (seperti Inter atau Plus Jakarta Sans) untuk memastikan teks mudah dibaca di layar HP.
*   **Vibe:** Profesional tapi tetap *approachable* dan kasual, merepresentasikan tim di balik layar seperti konten Instagram mereka.

## 4. Page Structure (Single-Page Layout)

### A. Hero Section
*   **Headline:** "Custom Kardus Kartonmu di KTD!"
*   **Sub-headline:** "More Than Brown Boxes 📦"
*   **Primary CTA Button:** "Hubungi Kami Sekarang ⬇️" (Tombol berwarna Oranye mencolok). Harus langsung nge-link ke WhatsApp admin.
*   **Hero Image:** Logo KTD yang jelas, dipadukan dengan foto produk kardus terbaik atau foto representatif tim KTD.

### B. Why Us / Layanan
*   Penjelasan singkat kenapa harus pesan di KTD.
*   *Key points:* Bebas custom ukuran, opsi cetak/sablon, dan info Minimum Order Quantity (MOQ) yang jelas. Buat dalam bentuk *cards* atau *grid* sederhana.

### C. Portfolio & Social Proof
*   Bagian visual yang menampilkan *real picture* dari produk kardus yang sudah pernah dibuat.
*   Bisa berupa *grid* foto bergaya Instagram feed atau *embed* video pendek untuk menonjolkan kredibilitas.

### D. Footer
*   Informasi alamat operasional / *workshop*.
*   Jam operasional admin.
*   Tautan ke Instagram @kemasan323.
*   *Secondary CTA:* Tombol WhatsApp (berwarna Biru atau Oranye) untuk berjaga-jaga jika pengunjung sudah *scroll* sampai bawah.

## 5. Technical Stack (For AI Agent)
*   **Framework:** Next.js (App Router) dengan React.
*   **Styling:** Tailwind CSS (Gunakan *utility classes* untuk mempercepat *styling* komponen).
*   **Responsiveness:** Wajib *mobile-first approach*. Sebagian besar audiens akan membuka web ini lewat *browser* HP dari *link in bio* Instagram.

## 6. AI Agent Prompting Instructions
*   Fokus pada pembuatan komponen UI yang modular.
*   Gunakan kode *hex* yang mendekati warna logo KTD pada gambar referensi (Oranye terang dan Biru gelap).
*   Pastikan *layout* tidak terlalu kaku/korporat; berikan sedikit sentuhan modern (*border radius* yang halus, *subtle shadows*).
*   Gunakan *placeholder text* dan gambar yang relevan (seperti `https://via.placeholder.com/...` dengan label "Foto Kardus Custom") untuk memudahkan visualisasi awal.
