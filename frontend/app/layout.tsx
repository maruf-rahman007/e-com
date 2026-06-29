import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Providers from "@/components/layout/Providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: { default: "ShopNext", template: "%s | ShopNext" },
  description: "A modern e-commerce store with the best products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50 font-sans antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
