// src/app/office-of-architect/write/page.tsx
import dynamic from 'next/dynamic'
import {boardConfigs} from "@/data/boards/boardConfigs";
import {notFound} from "next/navigation";

const PostEditor = dynamic(() => import('@/components/boards/PostEditor'), {
    ssr: false,
})


export default function WritePage({ params }: { params: { boardType: string } }) {
    const config = boardConfigs[params.boardType as keyof typeof boardConfigs];
    if (!config) return notFound();

    return (
        <div className="w-full px-0 py-6 sm:px-6 sm:max-w-[950px] sm:mx-auto">
            <h1 className="text-xl font-bold mb-4">글쓰기</h1>
            <PostEditor boardType={params.boardType} />
        </div>
    )
}
