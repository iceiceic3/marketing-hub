import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { LayoutShell } from "@/components/layout/layout-shell";
import { KeyboardShortcutsProvider } from "@/components/layout/keyboard-shortcuts-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarketingHub - All-in-One Marketing Tools",
  description: "Content AI, Analytics & Social Media Management for marketers",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <Providers>
          <KeyboardShortcutsProvider>
            <LayoutShell>{children}</LayoutShell>
          </KeyboardShortcutsProvider>
        </Providers>
      </body>
    </html>
  );
}
