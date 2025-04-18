// 더미 게시글 데이터
import { JSONContent } from '@tiptap/core'

export const dummyPosts: { id: number; title: string; content: JSONContent }[] = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    title: `${i + 1}번째 글`,
    content: {
        type: 'doc',
        content: [
            { type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: `${i + 1}번째 제목입니다.` }] },
            { type: 'paragraph', content: [{ type: 'text', text: `이것은 ${i + 1}번째 글의 내용입니다.` }] },
        ],
    },
}))
