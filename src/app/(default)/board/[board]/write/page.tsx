// src/app/office-of-architect/write/page.tsx
import dynamic from 'next/dynamic'

const WriteEditor = dynamic(() => import('@/components/board/WriteEditor'), {
    ssr: false,
})


export default function WritePage() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">글쓰기</h1>
            <WriteEditor />
        </div>
    )
}
