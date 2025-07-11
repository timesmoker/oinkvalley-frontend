// src/app/board/[boardType]/[postId]/page.tsx

import { notFound } from "next/navigation";
import {boardConfigs} from "@/features/boards/data/boardConfigs";
import {PostDetail} from "@/features/boards/types/posts";
import dynamic from "next/dynamic";
import DeletePostButton from "@/features/boards/components/ui/DeletePostButton";

const Viewer = dynamic(() => import('@/features/boards/components/Viewer'), { ssr: false });
const Comments = dynamic(() => import('@/features/boards/components/Comments'), { ssr: false })


export default async function PostPage({ params }: { params: { boardType: string; postId: string } }) {
    const config = boardConfigs[params.boardType as keyof typeof boardConfigs]
    if (!config) return notFound()

    const postRes = await fetch(
        `http://nginx/api/boards/${params.boardType}/posts/${params.postId}`,
        { cache: 'no-store' }
    )

    if (!postRes.ok) return notFound()

    const post: PostDetail = await postRes.json()


    return (
        <div className="w-full px-0 py-6 sm:px-6 sm:max-w-[950px] sm:mx-auto">
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
                    <span>작성자 : {post.username || '익명'}</span>

                    <span>작성시각 :{' '}
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
                    <div className="prose min-h-[200px]">
                        <Viewer
                            content={post.content}
                            proseminHeight="50vh"
                        />
                    </div>
                </div>

            </div>
            <div className="flex gap-2 justify-end mt-4">
                <DeletePostButton boardType={params.boardType} postId={post.id} />
            </div>
            <div className="w-full mx-auto space-y-6">
                <Comments boardType={params.boardType} postId={params.postId} />
            </div>
        </div>
    )

}
