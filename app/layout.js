import { Playfair_Display, Lora } from "next/font/google";
import Header from "../components/Header/Header1";
import Footer from "../components/Footer/Footer";
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
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
