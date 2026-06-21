import { SITE } from "@/lib/siteConfig";
import Script from "next/script";
import SearchResultsClient from "./SearchResultsClient";

export const metadata = {
  title: "Search",
  description:
    "Search Nina for articles on mindfulness, intentional living, breathing exercises, and inner wellness.",
  openGraph: {
    title: "Search",
    description:
      "Search Nina for articles on mindfulness, intentional living, breathing exercises, and inner wellness.",
    url: `${SITE.url}/search`,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Search Nina",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Search",
    description:
      "Search Nina for articles on mindfulness, intentional living, and inner wellness.",
  },
  alternates: {
    canonical: `${SITE.url}/search`,
  },
};

/**
 * Search page powered by Google Programmable Search Engine.
 * The server component handles metadata; the client component
 * handles the interactive search bar and CSE widget mounting.
 */
export default function SearchPage() {
  return (
    <>
      <SearchResultsClient />
      <Script
        src="https://cse.google.com/cse.js?cx=763af41fbeba0fc8e"
        strategy="afterInteractive"
      />
    </>
  );
}
