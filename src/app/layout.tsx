import type { Metadata } from "next";
import { Pixelify_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

import SageCursor from "../components/SageCursor";

// Section labels: WHO I AM, EXPERIENCE, WHAT I KNOW...
const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify",
  display: "swap",
});

// Headings: Bytestrone, Furniture Website...
const bitcount = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bitcount",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Sreelakshmi | Portfolio",
  description: "Sreelakshmi's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelify.variable} ${bitcount.variable}`}
      >
        {children}
        <SageCursor />
      </body>
    </html>
  );
}