import { ImageResponse } from "next/og";
import { ARTICLES } from "@/lib/articles";

export const alt = "Nina Journal";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }) {
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
            background: "#FAF7F2",
            color: "#3D3832",
            fontSize: 48,
            fontFamily: "Georgia, serif",
          }}
        >
          Nina
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
          justifyContent: "center",
          padding: "60px 80px",
          background:
            "linear-gradient(145deg, #FAF7F2 0%, #F3EDE4 40%, #E8DFD0 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Top accent gradient bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background:
              "linear-gradient(90deg, #C07A56 0%, #C4A882 50%, #8FA98B 100%)",
            display: "flex",
          }}
        />

        {/* Category badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              background: "rgba(192, 122, 86, 0.12)",
              borderRadius: "20px",
              fontSize: 18,
              color: "#C07A56",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {article.category}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: article.title.length > 40 ? 52 : 60,
              fontWeight: 700,
              color: "#3D3832",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {article.title}
          </div>

          {/* Decorative divider dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: 32,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#C4A882",
                display: "flex",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#C07A56",
                display: "flex",
              }}
            />
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#8FA98B",
                display: "flex",
              }}
            />
          </div>

          {/* Date */}
          <div
            style={{
              fontSize: 20,
              color: "#6B6560",
              display: "flex",
            }}
          >
            {article.date}
          </div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#C07A56",
              letterSpacing: "0.02em",
              display: "flex",
            }}
          >
            Nina
          </div>
          <div
            style={{
              fontSize: 16,
              color: "#9A9490",
              display: "flex",
            }}
          >
            ninahealthy.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
