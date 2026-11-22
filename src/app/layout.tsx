import type { Metadata } from "next";
import { Gabarito, Bitcount_Single } from "next/font/google";
import "./globals.css";

import SageCursor from "../components/SageCursor";

const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
  display: "swap",
});

const bitcount = Bitcount_Single({
  subsets: ["latin"],
  variable: "--font-bitcount",
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
        className={`${gabarito.variable} ${bitcount.variable}`}
      >
        {children}
        <SageCursor />
      </body>
    </html>
  );
}