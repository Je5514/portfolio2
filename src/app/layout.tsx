import type { Metadata } from "next";
import { Shantell_Sans } from "next/font/google";
import "./globals.css";

import SageCursor from "../components/SageCursor";

const shantell = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-shantell",
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
        className={shantell.variable}
      >
        {children}
        <SageCursor />
      </body>
    </html>
  );
}