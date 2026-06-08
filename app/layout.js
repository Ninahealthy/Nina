import { Playfair_Display, Lora } from "next/font/google";
import { preconnect, prefetchDNS } from "react-dom";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE } from "@/lib/siteConfig";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import AdSenseRefresh from "@/components/AdSenseRefresh/AdSenseRefresh";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalytics";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Mindfulness, Intentional Living & Inner Wellness`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
    images: [SITE.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    languages: {
      "en": SITE.url,
    },
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C07A56" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1714" },
  ],
};

export default function RootLayout({ children }) {
  preconnect("https://pagead2.googlesyndication.com", { crossOrigin: "anonymous" });
  prefetchDNS("https://pagead2.googlesyndication.com");
  preconnect("https://www.googletagmanager.com", { crossOrigin: "anonymous" });
  prefetchDNS("https://www.googletagmanager.com");

  return (
    <html lang="en-US" className={`${playfair.variable} ${lora.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <AdSenseRefresh />
        <GoogleAnalytics />
        <a href="#main-content" className="skipLink">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
