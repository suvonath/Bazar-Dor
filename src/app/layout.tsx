
import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toaster from "@/components/Toaster";
import ToastHandler from "@/components/ToastHandler";

const hindSiliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "Bazar-Dor | বাজার দর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন।",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="bn"  
    data-theme="light"
    className="h-full">
      <body
        className={`${hindSiliguri.className} min-h-full flex flex-col antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Toaster />
        <Suspense fallback={null}>
          <ToastHandler />
        </Suspense>
      </body>
    </html>
  );
}
