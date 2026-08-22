import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Kemasan323 (KTD) - Custom Kardus Karton Berkualitas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0F2744",
          backgroundImage: "radial-gradient(circle at 80% 20%, #FF6000 0%, #0F2744 45%)",
          padding: "60px 70px",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top Header / Brand Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              backgroundColor: "#FF6000",
              color: "white",
              fontSize: 32,
              fontWeight: 900,
              padding: "10px 22px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            K
          </div>
          <div
            style={{
              color: "white",
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: "-0.5px",
            }}
          >
            TD
          </div>
          <div
            style={{
              borderLeft: "2px solid rgba(255,255,255,0.2)",
              paddingLeft: "16px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 800, color: "#FFA666", textTransform: "uppercase", letterSpacing: "1px" }}>
              Kemasan323
            </span>
            <span style={{ fontSize: 13, color: "#CBD5E1", fontWeight: 500 }}>
              Custom Box Packaging Indonesia
            </span>
          </div>
        </div>

        {/* Middle Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "900px" }}>
          <div
            style={{
              backgroundColor: "rgba(255, 96, 0, 0.2)",
              border: "1px solid rgba(255, 96, 0, 0.4)",
              color: "#FFA666",
              fontSize: 16,
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "50px",
              alignSelf: "flex-start",
            }}
          >
            📦 More Than Brown Boxes
          </div>

          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#FFFFFF",
              letterSpacing: "-1px",
            }}
          >
            Custom Kardus Karton & Packaging Box Berkualitas
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#CBD5E1",
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            Bebas ukuran, sablon logo presisi, & minimal order ramah UMKM.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "30px", fontSize: 16, fontWeight: 700, color: "#E2E8F0" }}>
            <span>✓ Custom Ukuran</span>
            <span>✓ Sablon 1-3 Warna</span>
            <span>✓ MOQ UMKM Friendly</span>
            <span>✓ Kirim Se-Indonesia</span>
          </div>

          <div
            style={{
              backgroundColor: "#FF6000",
              color: "white",
              padding: "10px 24px",
              borderRadius: "14px",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            kemasan323.com ➔
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
