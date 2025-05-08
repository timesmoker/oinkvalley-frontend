// src/app/board/[boardType]/[id]/page.tsx

import { notFound } from "next/navigation";
import {boardConfigs} from "@/data/boards/boardConfigs";
import {PostDetail} from "@/types/posts";
import dynamic from "next/dynamic";
import DeletePostButton from "@/components/boards/ui/DeletePostButton";

const Viewer = dynamic(() => import('@/components/boards/Viewer'), { ssr: false });

export default async function PostPage({ params }: { params: { boardType: string; id: string } }) {
    const config = boardConfigs[params.boardType as keyof typeof boardConfigs]
    if (!config) return notFound()

    const res = await fetch(
        `http://nginx/api/boards/${params.boardType}/posts/${params.id}`,
        { cache: 'no-store' }
    )

    if (!res.ok) return notFound()

    const post: PostDetail = await res.json()

    return (
        <div className="p-6">
            {/* 게시판 이름 */}
            <h1 className="text-2xl font-bold mb-4">{config.name}</h1>

            {/* 전체 박스 */}
            <div className="border border-gray-300 rounded-md overflow-hidden text-sm">
                {/* 제목 줄 */}
                <div className="border-b px-4 py-2 bg-gray-50 font-medium">
                    제목 : {post.title}
                </div>

                {/* 작성자 + 날짜 줄 */}
                <div className="border-b px-4 py-2 flex justify-between text-sm text-gray-700">
                    <span>작성자 : {post.authorName || '익명'}</span>

                    <span>작성일 :{' '}
                        {new Date(post.createdAt).toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                </div>


                {/* 본문 내용 줄 */}
                <div className="px-4 py-6 bg-white">
                    <div className="prose max-w-none">
                        <Viewer
                            content={post.content}
                        />
                    </div>
                </div>

            </div>
            <div className="flex gap-2 justify-end mt-4">
                <DeletePostButton boardType={params.boardType} postId={post.id} />
            </div>
        </div>
    )

}
