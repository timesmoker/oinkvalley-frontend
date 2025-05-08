// src/app/office-of-architect/write/page.tsx
import dynamic from 'next/dynamic'
import {boardConfigs} from "@/data/boards/boardConfigs";
import {notFound} from "next/navigation";

const WriteEditor = dynamic(() => import('@/components/boards/WriteEditor'), {
    ssr: false,
})


export default function WritePage({ params }: { params: { boardType: string } }) {
    const config = boardConfigs[params.boardType as keyof typeof boardConfigs];
    if (!config) return notFound();

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">글쓰기</h1>
            <WriteEditor boardType={params.boardType} />
        </div>
    )
}
