import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "Ayamu Labs Creative Studio";
    const category = searchParams.get("category") || "Visual Portfolio Showcase";
    const year = searchParams.get("year") || "2026";

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
            backgroundColor: "#0A0B0E",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, rgba(245, 158, 11, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(244, 63, 94, 0.1) 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: "60px 80px",
            fontFamily: "sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Top Brand Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                🐣
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: "26px",
                    fontWeight: "900",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Ayamu <span style={{ color: "#F59E0B" }}>Labs</span>
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    color: "#94A3B8",
                  }}
                >
                  Creative Studio
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                backgroundColor: "rgba(245, 158, 11, 0.15)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                padding: "8px 20px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#FCD34D",
              }}
            >
              {category.toUpperCase()} &bull; {year}
            </div>
          </div>

          {/* Center Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxWidth: "900px",
            }}
          >
            <h1
              style={{
                fontSize: "56px",
                fontWeight: "900",
                lineHeight: "1.1",
                letterSpacing: "-1px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "20px",
                color: "#CBD5E1",
                margin: 0,
              }}
            >
              Where Imagination Hatches Into Immersive Visual Masterpieces &bull; Made with ❤️ by Ayamu Labs
            </p>
          </div>

          {/* Bottom Footer Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              paddingTop: "24px",
            }}
          >
            <div style={{ display: "flex", gap: "24px", fontSize: "16px", color: "#94A3B8" }}>
              <span>🎨 3D Cel-Shading</span>
              <span>🎬 Motion Graphics</span>
              <span>🐣 Character Design</span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#F59E0B",
              }}
            >
              <span>Order via VGen & Fiverr &bull; ayamulabs.art</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
