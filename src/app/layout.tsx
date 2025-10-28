import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Navbar from "./_components/layout/Navbar/Navbar";
import MainProvider from "./_components/MainProvider/MainProvider";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "POS Resturant",
  description: "POS Resturant is a restaurant management system that allows you to manage your restaurant's orders, menu, and inventory.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <MainProvider>
          <Navbar />
          <Toaster />
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
