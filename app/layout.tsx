import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
// import { layoutAppearance } from "@/config/clerk";

import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

import { ThemeProvider } from "@/providers/theme-provider";

import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <SpeedInsights />
      {/* Set the HTML lang attribute to English */}
      <html lang="en">
        <body className={inter.className}>
          {/* Render the toast provider to display toast notifications */}
          <ToastProvider />
          {/* Render the modal provider to display modals */}
          <ModalProvider />
          {/* Render the child components */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

