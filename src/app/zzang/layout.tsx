// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "@/app/globals.css"
import Footer from "@/components/layout/Footer";
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
        <div className="flex flex-col min-h-screen antialiased">
            <header className="fixed w-full bg-white z-10 text-black p-4 flex items-center">
                <nav>
                    <a href="#" className="px-3 font-bold hover:text-gray-300">Menu</a>
                    <a href="#" className="px-3 font-bold hover:text-gray-300">About</a>
                    <a href="#" className="px-3 font-bold hover:text-gray-300">Schedule</a>
                </nav>
                <p className="text-xl absolute left-1/2 -translate-x-1/2 font-bold">
                    d0.ZZang
                </p>
            </header>

            <main className="flex-grow pt-[70px]">
                {children}
            </main>
        </div>
    );
}