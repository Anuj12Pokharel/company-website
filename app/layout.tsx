import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { EngagementProvider } from "@/context/EngagementContext";
import { GlobalErrorBoundary } from "@/components/error/GlobalErrorBoundary";
import { env } from "@/config/env"; // Trigger validation
import "./globals.css";
import Futuristic3DBackgroundWrapper from "@/components/layout/Futuristic3DBackgroundWrapper";
import ClientDynamicComponents from "@/components/layout/ClientDynamicComponents";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codexneural.com"),
  title: {
    default: "Codex Neural | Future-Ready IT Solutions",
    template: "%s | Codex Neural",
  },
  description: "Codex Neural is a leading IT services company in Nepal specializing in AI/ML, Enterprise Web Development, and Digital Transformation for global clients.",
  keywords: ["IT Company Nepal", "AI Development", "Web Development", "Software Engineering", "Tech Services", "Codex Neural"],
  authors: [{ name: "Codex Neural" }],
  creator: "Codex Neural Pvt. Ltd.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    shortcut: [
      { url: '/favicon.ico' }
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.codexneural.com",
    title: "Codex Neural | Future-Ready IT Solutions",
    description: "Architecting the Digital Neural Network. High-performance software and AI solutions.",
    siteName: "Codex Neural",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public
        width: 1200,
        height: 630,
        alt: "Codex Neural - Future of Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codex Neural | Future-Ready IT Solutions",
    description: "Architecting the Digital Neural Network. High-performance software and AI solutions.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-x-hidden`}
      >
        <div className="bg-noise" />

        <div className="flex flex-col min-h-screen relative z-10">
          <EngagementProvider>
            <GlobalErrorBoundary>
              <ClientDynamicComponents />
              <Futuristic3DBackgroundWrapper />
              <Navbar />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
            </GlobalErrorBoundary>
          </EngagementProvider>
        </div>

        {env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
