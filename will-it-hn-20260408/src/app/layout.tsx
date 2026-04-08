import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roast My Landing Page — $9 AI Conversion Audit",
  description:
    "Get a brutal AI audit of exactly what's killing your conversions. $9. 15 minutes. No fluff, just brutal honesty.",
  metadataBase: new URL("https://roast.dailyventures.xyz"),
  openGraph: {
    title: "Roast My Landing Page — $9 AI Conversion Audit",
    description:
      "Get a brutal AI audit of exactly what's killing your conversions. $9. 15 minutes.",
    url: "https://roast.dailyventures.xyz",
    siteName: "Roast My Landing Page",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roast My Landing Page — $9 AI Conversion Audit",
    description:
      "Get a brutal AI audit of exactly what's killing your conversions. $9. 15 minutes.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
