import { ImageResponse } from "next/og";

// Site-wide social share image (1200x630). Inherited by every route that doesn't
// define its own, so links to lessons/glossary all get a branded preview.
export const alt = "SMC Course — Learn Smart Money Concepts for free";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const candles = [
  { h: 70, c: "#22c55e" },
  { h: 110, c: "#22c55e" },
  { h: 86, c: "#f5b82e" },
  { h: 140, c: "#2de0b6" },
  { h: 104, c: "#22c55e" },
  { h: 150, c: "#2de0b6" },
  { h: 120, c: "#f5b82e" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0d14",
          color: "#e8ebf2",
          padding: "72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(45,224,182,0.22), rgba(10,13,20,0) 70%)",
            display: "flex",
          }}
        />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#2de0b6",
              color: "#04150f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>
            SMC Course
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 78, fontWeight: 800, lineHeight: 1.05 }}>
            Learn Smart Money Concepts
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#2de0b6",
            }}
          >
            for free.
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#9aa3b2", marginTop: 26 }}>
            Interactive lessons, charts &amp; quizzes. English + Taglish.
          </div>
        </div>

        {/* Footer: domain + candlestick motif */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#2de0b6" }}>
            freesmartmoneycourse.online
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
            {candles.map((k, i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: k.h,
                  borderRadius: 5,
                  background: k.c,
                  display: "flex",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
