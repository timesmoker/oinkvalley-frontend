// src/components/boards/Comments.tsx
'use client'

import { useState } from 'react'
import CommentEditor from './CommentEditor'
import CommentList from './CommentList'

export default function Comments({ boardType, postId }: { boardType: string; postId: string }) {
    const [refreshKey, setRefreshKey] = useState(0)

    return (
        <div className="w-full space-y-6">
            <CommentEditor
                boardType={boardType}
                postId={postId}
                onSuccess={() => setRefreshKey((k) => k + 1)}
            />
            <CommentList
                boardType={boardType}
                postId={postId}
                refreshKey={refreshKey}
            />
        </div>
    )
}
