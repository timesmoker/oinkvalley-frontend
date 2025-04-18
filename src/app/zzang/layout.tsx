// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "@/app/globals.css"
import Footer from "@/components/shared/Footer";
import React from "react";

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});

const fira = Fira_Code({
    variable: "--font-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: '짱 페이지',
    description: "장윤지의 공간",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function ZzangLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
        <body className="flex flex-col min-h-screen antialiased">
        <main className="flex-grow">{children}</main>
        <Footer />
        </body>
        </html>
    )
}