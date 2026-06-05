import { Playfair_Display, Lora } from "next/font/google";
import Script from "next/script";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
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
  metadataBase: new URL("https://ninahealthy.com"),
  title: {
    default: "Nina Healthy",
    template: "%s | Nina Healthy",
  },
  description:
    "Finding peace in the everyday. A personal journey through mindfulness, intentional living, and inner wellness.",
  openGraph: {
    title: "Nina Healthy",
    description:
      "Finding peace in the everyday. A personal journey through mindfulness, intentional living, and inner wellness.",
    url: "https://ninahealthy.com",
    siteName: "Nina Healthy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Nina Healthy, a mindfulness and intentional living space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nina Healthy",
    description:
      "Finding peace in the everyday. A personal journey through mindfulness, intentional living, and inner wellness.",
    images: ["/og-default.png"],
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
    canonical: "https://ninahealthy.com",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <a href="#main-content" className="skipLink">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
