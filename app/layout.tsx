import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/navs/Navbar";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import "./globals.css";
import "@uploadthing/react/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixelCart",
  description: "Your Destination for Pixel Perfect Design Assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Navbar />
          {children}
          <Toaster position="top-center" expand={true} richColors theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
