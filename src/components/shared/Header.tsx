//src/components/shared/Header.tsx
'use client'

import { useAuthStore } from '@/store/useAuthStore';
import { Button } from "@/components/shared/ui/Button";
import Link from "next/link";

export default function Header() {
    const { logout } = useAuthStore();
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return (
        <header className="w-full px-6 py-4 flex justify-between items-center border-b bg-white/60 backdrop-blur-md fixed top-0 z-50">
            <Link href="/" className="font-bold text-xl hover:opacity-80 transition">
                🐽 오잉크밸리
            </Link>
            <nav className="hidden md:flex justify-end gap-6 text-sm text-gray-600">
                <Link href="#">달력</Link>
                <Link href="/boards/office-of-architect">건축 사무소</Link>
                <Link href="#">게시판</Link>
                <Link href="#">칭찬 스티커</Link>
            </nav>

            <div className="flex gap-2">
                {isLoggedIn ? (
                    <Button variant="outline" onClick={logout}>
                        로그아웃
                    </Button>
                ) : (
                    <>
                        <Link href="/login">
                            <Button variant="outline" asChild>Sign in</Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="default" asChild>Sign up</Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
