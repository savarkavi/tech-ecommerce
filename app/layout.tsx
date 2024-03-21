import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { ProductsProvider } from "@/hooks/useProducts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "techCart",
  description: "E-commerce app for tech products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            <ProductsProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </ProductsProvider>
          </CartProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
