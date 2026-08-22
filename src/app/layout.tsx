import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { ThemeProvider } from "@/context/ThemeContext";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FF6000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Kemasan323 (KTD) - Custom Kardus Karton & Packaging Box Berkualitas",
  description:
    "More Than Brown Boxes 📦. Solusi custom kardus karton, mailer box, master box, dan packaging sablon logo untuk UMKM, Online Shop, dan Brand di Indonesia. Hubungi kami sekarang!",
  keywords: [
    "custom kardus",
    "kardus custom",
    "kemasan323",
    "ktd packaging",
    "mailer box custom",
    "box karton",
    "kardus sablon logo",
    "packaging umkm",
    "kardus packing",
  ],
  authors: [{ name: "Kemasan323 (KTD)" }],
  openGraph: {
    title: "Kemasan323 (KTD) - Custom Kardus Karton Berkualitas",
    description:
      "More Than Brown Boxes 📦. Cetak & pesan kardus custom ukuran sesuai kebutuhan brand Anda.",
    url: "https://kemasan323.com",
    siteName: "Kemasan323 (KTD)",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-slate-50 dark:bg-[#0B132B] text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white flex flex-col transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <PortfolioProvider>{children}</PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
