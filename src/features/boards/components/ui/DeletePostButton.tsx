// src/components/boards/ui/DeletePostButton.tsx

'use client'

import { useRouter } from 'next/navigation'
import apiClient from '@/lib/api/apiClient'
import { Button } from '@/components/ui/Button'

interface DeletePostButtonProps {
    postId: number
    boardType: string
}

export default function DeletePostButton({ postId, boardType }: DeletePostButtonProps) {
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('정말 삭제하시겠습니까?')) return

        try {
            await apiClient.delete(`/boards/${boardType}/posts/${postId}`)
            alert('삭제되었습니다.')
            router.push(`/boards/${boardType}`)
        } catch (err) {
            console.error('❌ 삭제 오류:', err)
            alert('삭제 중 문제가 발생했습니다.')
        }
    }

    return (
        <Button
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={handleDelete}
        >
            🗑 삭제
        </Button>

    )
}
