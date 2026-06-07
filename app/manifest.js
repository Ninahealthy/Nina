import { SITE } from "@/lib/siteConfig";

/**
 * Next.js convention for generating manifest.json.
 * Enables "Add to Home Screen" on mobile browsers.
 */
export default function manifest() {
  return {
    name: SITE.name,
    short_name: "Nina",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#C07A56",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
