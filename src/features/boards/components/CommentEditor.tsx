'use client'

import { useRef, useState } from 'react'
import { Box, Button } from '@mui/material'
import {
    RichTextEditor,
    type RichTextEditorRef,
} from 'mui-tiptap'
import apiClient from '@/lib/api/apiClient'
import axios from 'axios'
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";

export default function CommentEditor({
                                          boardType,
                                          postId,
                                          onSuccess,
                                      }: {
    boardType: string
    postId: string
    onSuccess?: () => void
}) {
    const editorRef = useRef<RichTextEditorRef>(null)
    const [submitting, setSubmitting] = useState(false)
    const extensions = useExtensions({
        placeholder: "댓글을 입력하세요...",
    });

    const handleSave = async () => {
        const editor = editorRef.current?.editor
        if (!editor || submitting) return
        setSubmitting(true)

        const content = editor.getJSON()

        try {
            const res = await apiClient.post(
                `/boards/${boardType}/posts/${postId}/comments`,
                { content }
            )
            console.log('✅ 저장 완료:', res.data)
            editor.commands.clearContent()
            onSuccess?.()
        } catch (err) {
            console.error('❌ 댓글 작성 실패:', err)
            if (axios.isAxiosError(err)) {
                const status = err.response?.status
                if (status === 401 || status === 403) {
                    alert('로그인이 필요합니다.')
                } else {
                    alert('댓글 작성 중 오류가 발생했습니다.')
                }
            } else {
                alert('알 수 없는 오류가 발생했습니다.')
            }
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Box
            className="space-y-4 mt-6"
            sx={{
                "& .ProseMirror": {
                    minHeight: '5vh',
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',

                    "& ol, & ul": {
                        paddingLeft: '1.5rem',
                        marginLeft: 0,
                    },
                },
            }}
        >
            <RichTextEditor
                ref={editorRef}
                extensions={extensions}
                renderControls={() => <EditorMenuControls />}
            />

            <div className="flex justify-end">
                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={submitting}
                >
                    댓글 달기
                </Button>
            </div>
        </Box>
    )
}
