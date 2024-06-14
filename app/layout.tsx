/**
 * RootLayout is the root layout component for the admin dashboard. It wraps
 * the entire application with various providers and sets up the global
 * appearance of the application.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {React.ReactElement} The rendered component.
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
// import { layoutAppearance } from "@/config/clerk";

import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

/**
 * The root layout component for the admin dashboard.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {React.ReactElement} The rendered component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
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

