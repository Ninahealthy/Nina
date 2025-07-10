import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header/Header"; // Adjust the import path as necessary
import { SearchProvider } from "@/contexts/SearchContext";
import Footer from "@/components/Footer/Footer";
import NewsletterSignup from "@/components/NewsletterSignup/NewsletterSignup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nina",
  description:
    "Nina is a home decor blogger sharing interior design inspiration, DIY projects, and styling tips.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};
//export const dynamic = "force-dynamic"; this gona make the entire slow.no SSR // Ensures the layout is always re-rendered

export default function RootLayout({ children }) {
  const handleSearch = (query) => {
    // Handle search functionality
    console.log("Search query:", query);
  };
  return (
    <SearchProvider>
      <html lang="en">
        <head>
          <Script
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2087636695455778"
            crossOrigin="anonymous"
          ></Script>
        </head>

        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Script
            id="Gtag"
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=G-C8757P0MH2"
          />
          <Script
            id="Analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-C8757P0MH2');
          `,
            }}
          />
          <Header />
          {children}
          <NewsletterSignup />
          <Footer />
        </body>
      </html>
    </SearchProvider>
  );
}
