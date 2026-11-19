import type { Metadata } from "next";
import { Bitcount_Single } from "next/font/google";
import "./globals.css";

import SageCursor from "../components/SageCursor";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Single:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={bitcount.variable}>{children}<SageCursor /></body>
    </html>
  );
}
