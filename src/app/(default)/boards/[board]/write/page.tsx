// src/app/office-of-architect/write/page.tsx
import dynamic from 'next/dynamic'
import {boardConfigs} from "@/data/boards/boardConfigs";
import {notFound} from "next/navigation";

const WriteEditor = dynamic(() => import('@/components/boards/WriteEditor'), {
    ssr: false,
})


export default function WritePage({ params }: { params: { board: string } }) {
    const config = boardConfigs[params.board as keyof typeof boardConfigs];
    if (!config) return notFound();

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">글쓰기</h1>
            <WriteEditor boardType={params.board} />
        </div>
    )
}
