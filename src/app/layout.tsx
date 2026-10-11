import "./globals.css";

import { Toaster } from "react-hot-toast";
import NavbarWrapper from "../components/NavbarWrapper";
import Footer from "../components/Footer";

export const metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের ট্র্যাকিং ওয়েব অ্যাপ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className="bg-[#F5F7F2] antialiased">
        <Toaster position="top-right" />
        <NavbarWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
