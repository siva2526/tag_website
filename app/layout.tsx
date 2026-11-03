import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from 'next/font/google';
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core';
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';

import KonamiCode from './components/KonamiCode';
import CursorTrail from './components/CursorTrail';
import ScrollProgress from './components/ScrollProgress';
import AFKDetector from './components/AFKDetector';
import { ToastProvider } from './components/Toast';

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TAG Club | Technology & Gaming Club VIT',
  description: 'The premier technology, game development, and esports collective at VIT Vellore.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <ScrollProgress />
          <KonamiCode />
          <CursorTrail />
          <AFKDetector />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
