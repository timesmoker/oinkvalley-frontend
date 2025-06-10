//src/components/board/Viewer.tsx
'use client'

import type { JSONContent } from '@tiptap/core'
import {
    RichTextReadOnly,
} from 'mui-tiptap';
import {Box} from '@mui/material'
import useExtensions from "./useExtensions"

export default function Viewer({
                                   content,
                                   proseminHeight, // ← 기본값은 유지하되, 외부에서 조절 가능
                               }: {
    content: JSONContent
    proseminHeight?: string }) {
    const extensions = useExtensions()

    return (
        <Box
            sx={{
                minHeight: '5vh',
                "& .ProseMirror": {
                    ...(proseminHeight ? { minHeight: proseminHeight } : {}),
                    padding: '1rem',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',

                    "& ol, & ul": {
                        paddingLeft: '1.5rem', // 들여쓰기
                        marginLeft: 0,
                    },

                    "& h1, & h2, & h3, & h4, & h5, & h6": {
                        scrollMarginTop : 0,
                    },
                },
            }}
        >
        <RichTextReadOnly
            content={content}
            extensions={extensions}
        />
        </Box>
    )
}


