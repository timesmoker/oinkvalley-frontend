// src/components/boards/CommentEditor.tsx

'use client'

import apiClient from '@/lib/api/apiClient'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'

import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import HorizontalRule from '@tiptap/extension-horizontal-rule'

import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import {Placeholder} from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from '@tiptap/react'
import { useState } from 'react'
import EditorToolbar from '@/components/boards/ui/Toolbar'
import clsx from 'clsx'


export const editorClass = clsx(
    'text-sm',
    'leading-snug',
    'w-full',
    'max-w-none',
    'min-h-[50px]',
    'max-h-none',
    'bg-white',
    'border',
    'rounded',
    'px-3',
    'py-2',
    'cursor-text',
    'focus:outline-none',
    'mx-auto',
    // placeholder
    '[&_.is-empty]:text-gray-400',
    '[&_.is-empty]:before:content-[attr(data-placeholder)]',
    '[&_.is-empty]:before:float-left',
    '[&_.is-empty]:before:text-gray-400',
    '[&_.is-empty]:before:pointer-events-none',
    '[&_.is-empty]:before:h-0',

    // 콘텐츠 wrapper 높이 확보
    '[&>div]:min-h-[50px]',

    // 문단/헤딩 등 기본 블록 스타일
    '[&_p]:my-2',
    '[&_p]:text-base',
    '[&_h1]:my-6',
    '[&_h2]:my-5',
    '[&_ul]:my-4',
    '[&_ol]:my-4',
    '[&_blockquote]:my-4',
    '[&_pre]:my-4',


)


export default function CommentEditor({
                                          boardType,
                                          postId,
                                          onSuccess,
                                      }: {
    boardType: string
    postId: string
    onSuccess?: () => void
}) {

    const [submitting, setSubmitting] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
            }),
            Underline,
            Image,
            Link.configure({ openOnClick: false }),
            Heading.configure({ levels: [1, 2] }),

            TextStyle,
            Color,
            TaskList,
            TaskItem.configure({ nested: true }),
            HorizontalRule,

            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Placeholder.configure({
                placeholder: '댓글을 입력하세요!',
                showOnlyCurrent: false,
            }),
        ],
        content: '',
    })

    const handleSave = async () => {

        if (!editor || submitting) return;
        setSubmitting(true)

        const json = editor.getJSON();
        const token = localStorage.getItem('token');

        if (!token) {
            alert('로그인이 필요합니다.');
            setSubmitting(false)
            return;
        }

        try {
            const res = await apiClient.post(`/boards/${boardType}/posts/${postId}/comments`, {
                content: json,
            })

            console.log('✅ 저장 완료:', res.data);
            editor.commands.clearContent()
            onSuccess?.()
        } catch (err) {
            console.error('❌ 댓글 작성 실패:', err)
            alert('댓글 작성 중 오류가 발생했습니다.')
        } finally {
            setSubmitting(false)
        }
    }

    return (<div className="mt-6 space-y-2 w-full mx-auto">
            {/* 에디터 박스 */}
            <div className="border rounded-md p-2 bg-white space-y-1">
                <EditorToolbar editor={editor} />
                <EditorContent
                    editor={editor}
                    className={clsx(
                        editorClass
                    )}
                />
            </div>


            {/* 버튼 */}
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white px-3 py-1.5 text-sm rounded hover:bg-blue-500 disabled:opacity-50"
                    onClick={handleSave}
                    disabled={submitting}
                >
                    댓글 달기
                </button>
            </div>
        </div>



    )
}
