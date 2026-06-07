import { ImageResponse } from "next/og";

/**
 * Generates a 180x180 Apple Touch Icon as a raster PNG.
 * Reproduces the leaf motif from app/icon.svg for iOS home screen bookmarks.
 * Next.js serves this automatically at /apple-icon.png.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: "36px",
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 28C16 20.5 9 16 9 9C9 5.13401 12.134 2 16 2C19.866 2 23 5.13401 23 9C23 16 16 20.5 16 28Z"
            fill="#C07A56"
            opacity="0.9"
          />
          <path
            d="M16 2V0"
            stroke="#8FA98B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
