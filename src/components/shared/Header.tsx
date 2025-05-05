//src/components/shared/Header.tsx
import React from "react";
import { Button } from "@/components/shared/ui/Button";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full px-6 py-4 flex justify-between items-center border-b bg-white/60 backdrop-blur-md fixed top-0 z-50">
            <Link href="/" className="font-bold text-xl hover:opacity-80 transition">
                🐽 오잉크밸리
            </Link>
            <nav className="hidden md:flex justify-end gap-6 text-sm text-gray-600">
                <Link href="#" className="hover:scale-125 hover:text-black transition">달력</Link>
                <Link href="/boards/office-of-architect" className="hover:scale-125 hover:text-black transition">건축 사무소</Link>
                <Link href="#" className="hover:scale-125 hover:text-black transition">게시판</Link>
                <Link href="#" className="hover:scale-125 hover:text-black transition">칭찬 스티커</Link>
            </nav>

            <div className="flex gap-2">
                <Button variant="outline" className="hover:scale-125 hover:text-black transition">Sign in</Button>
            </div>
        </header>
    );
}
