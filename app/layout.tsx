import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ebira.net"),
  title: {
    default: "Ebira.net — the digital home of the Ebira language",
    template: "%s · Ebira.net",
  },
  description:
    "Dictionary, translator, riddles, history, and learning for the Ebira language — built openly with the community by Haleyouth Foundation. Ẹ́bírà lives here.",
  keywords: [
    "Ebira",
    "Ebira language",
    "Ebira dictionary",
    "Ebira translator",
    "Anebira",
    "Okene",
    "Kogi State",
    "African languages",
    "language preservation",
  ],
  openGraph: {
    title: "Ebira.net — Ẹ́bírà lives here",
    description:
      "The digital home for the Ebira language, its people, and its diaspora: dictionary, translator, oral heritage, history, and learning.",
    url: "https://ebira.net",
    siteName: "Ebira.net",
    locale: "en_NG",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf6ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1220" },
  ],
};

const themeInit = `(function(){try{var q=new URLSearchParams(location.search).get("theme");var t=(q==="dark"||q==="light")?q:localStorage.getItem("ebira-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-clay focus:px-5 focus:py-2.5 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
