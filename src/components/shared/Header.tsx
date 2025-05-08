'use client'

import { useAuthStore } from '@/store/useAuthStore';
import { Button } from "@/components/shared/ui/Button";
import Link from "next/link";

export default function Header() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const logout = useAuthStore((state) => state.logout);
    const hasHydrated = useAuthStore((state) => state.hasHydrated);

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

            <div className="flex gap-2 min-w-[200px] h-9 items-center justify-end">
                {hasHydrated ? (
                    isLoggedIn ? (
                        <Button
                            variant="default"
                            onClick={logout}
                            className="transition-all duration-200 hover:scale-110 hover:opacity-80"
                        >
                            로그아웃
                        </Button>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button
                                    variant="outline"
                                    className="transition-all duration-200 hover:scale-110 hover:text-black"
                                >
                                    Sign in
                                </Button>
                            </Link>

                            <Link href="/signup">
                                <Button
                                    variant="default"
                                    className="transition-all duration-200 hover:scale-110 hover:opacity-90"
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </>
                    )
                ) : (
                    <>
                        <div className="w-[80px] h-9 invisible" />
                        <div className="w-[80px] h-9 invisible" />
                    </>
                )}
            </div>
        </header>
    );
}
