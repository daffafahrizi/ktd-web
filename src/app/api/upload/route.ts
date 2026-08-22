import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Tidak ada file yang diunggah" },
        { status: 400 }
      );
    }

    // Convert file to Base64 Data URL (kompatibel 100% dengan Vercel Serverless tanpa disk write)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || "image/jpeg";
    const base64String = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64String}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      fileName: file.name,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Gagal memproses file gambar: " + error.message },
      { status: 500 }
    );
  }
}
