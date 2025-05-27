'use client'

import { useEffect, useState } from "react"
import { PostComment } from "@/types/board/postComment"
import { PageResponse } from "@/types/pagination"
import apiClient from "@/lib/api/apiClient"
import Viewer from '@/components/boards/Viewer'

export default function CommentList({
                                        boardType,
                                        postId,
                                        refreshKey,
                                    }: {
    boardType: string
    postId: string
    refreshKey?: number
}) {
    const [comments, setComments] = useState<PostComment[]>([])
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        void (async () => {
            try {
                const res = await apiClient.get<PageResponse<PostComment>>(
                    `/boards/${boardType}/posts/${postId}/comments`,
                    {
                        params: {
                            page,
                            size: 10,
                        },
                    }
                )

                setComments(res.data.content)
                setTotalPages(res.data.totalPages)
            } catch (err) {
                console.error('❌ 댓글 불러오기 실패:', err)
            }
        })()
    }, [boardType, postId, page, refreshKey])


    return (
        <div className="mt-6 w-full mx-auto">
            <h2 className="text-lg font-semibold mb-4">댓글 {comments.length}</h2>

            <ul className="space-y-4">
                {comments.map((comment) => (
                    <li
                        key={comment.id}
                        className="border rounded-md p-3 bg-gray-50 shadow-sm"
                    >
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>{comment.username}</span>
                            <span>{new Date(comment.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="text-sm leading-normal min-h-[25px]">
                        <Viewer content={comment.content} />
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-center mt-6">
                <button
                    disabled={page <= 0}
                    onClick={() => setPage((p) => Math.max(p - 1, 0))}
                    className="text-sm hover:underline disabled:opacity-40"
                >
                    이전
                </button>
                <span className="text-sm text-muted-foreground">
        {page + 1} / {totalPages}
      </span>
                <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
                    className="text-sm hover:underline disabled:opacity-40"
                >
                    다음
                </button>
            </div>
        </div>
    )
}
