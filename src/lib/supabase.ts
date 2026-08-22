import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith("http") &&
  supabaseAnonKey.length > 10
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Upload gambar langsung ke Supabase Storage Bucket 'portfolio'
 * Mengembalikan URL publik CDN foto yang tersimpan permanen.
 */
export async function uploadImageToSupabase(
  file: File
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase || !isSupabaseConfigured) {
    return {
      url: null,
      error: "Supabase belum dikonfigurasi. Masukkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di file .env.local / Vercel.",
    };
  }

  try {
    const fileExt = file.name.split(".").pop() || "png";
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9]/g, "_");
    const uniqueFilePath = `products/${Date.now()}_${cleanFileName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(uniqueFilePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from("portfolio")
      .getPublicUrl(uniqueFilePath);

    return {
      url: data.publicUrl,
      error: null,
    };
  } catch (err: any) {
    console.error("Gagal upload ke Supabase Storage:", err);
    return {
      url: null,
      error: err.message || "Gagal mengunggah foto ke Supabase Storage",
    };
  }
}
