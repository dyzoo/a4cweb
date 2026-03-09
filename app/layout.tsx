// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from './providers/ThemeProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aid 4 Children Tanzania",
  description: "Empowering children through education, healthcare, and social support in Tanzania",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Explicit favicon links */}
        <link rel="icon" href="/A4C logo2.png" type="image/png" />
        <link rel="shortcut icon" href="/A4C logo2.png" type="image/png" />
        <link rel="apple-touch-icon" href="/A4C logo2.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}