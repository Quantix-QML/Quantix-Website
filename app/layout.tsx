import type { Metadata, Viewport } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap"
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = {
  title: "Quantix — A universe of quantum possibilities",
  description:
    "Enter the Quantix quantum multiverse. Explore quantum computing, events, research, and the people shaping what's next.",
  applicationName: "Quantix",
  icons: {
    icon: "/quantix-logo.png"
  },
  openGraph: {
    title: "Quantix — A universe of quantum possibilities",
    description:
      "A universe for the quantum curious. Learn out loud, experiment together, and discover what's next.",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
