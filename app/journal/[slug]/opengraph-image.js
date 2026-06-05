import { ImageResponse } from "next/og";
import { ARTICLES } from "@/lib/articles";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nina Healthy journal article";

export default async function OgImage({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FAF7F2",
            fontFamily: "Georgia, serif",
          }}
        >
          <span style={{ fontSize: 40, color: "#3D3832" }}>Nina Healthy</span>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#FAF7F2",
          padding: "60px 80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Decorative top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #C07A56, #8FA98B)",
          }}
        />

        {/* Category badge */}
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "#C07A56",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {article.category}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#3D3832",
            lineHeight: 1.15,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          {article.title}
        </div>

        {/* Lead */}
        {article.lead && (
          <div
            style={{
              fontSize: 22,
              color: "#6B6560",
              lineHeight: 1.5,
              maxWidth: "800px",
              marginBottom: "40px",
            }}
          >
            {article.lead.length > 120
              ? article.lead.slice(0, 120) + "..."
              : article.lead}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E8DFD0",
            paddingTop: "20px",
          }}
        >
          <span style={{ fontSize: 20, color: "#3D3832", fontWeight: 600 }}>
            Nina Healthy
          </span>
          <span style={{ fontSize: 16, color: "#9A9490" }}>
            ninahealthy.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
