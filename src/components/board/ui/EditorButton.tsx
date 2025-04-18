// src/components/board/ui/EditorButton.tsx
'use client'

import { cn } from '@/lib/utils'
import React from "react"; // tailwind 클래스 병합용 함수 (없으면 그냥 clsx 써도 됨)

interface EditorButtonProps {
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode
    className?: string
}

export default function EditorButton({ onClick, isActive, children, className }: EditorButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "px-2 py-1 border text-sm rounded transition-all",
                "hover:bg-gray-100 hover:text-black",
                isActive ? "bg-gray-200 font-semibold" : "bg-white text-gray-600",
                className
            )}
        >
            {children}
        </button>
    )
}
