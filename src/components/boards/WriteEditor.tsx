'use client'

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
    'prose',
    'max-w-none',
    'border',
    'p-6',
    'rounded',
    'bg-white',
    'relative',
    'cursor-text',
    'min-h-[500px]',
    'focus:outline-none',

    // placeholder 스타일
    '[&_.is-empty]:text-gray-400',
    '[&_.is-empty]:before:content-[attr(data-placeholder)]',
    '[&_.is-empty]:before:float-left',
    '[&_.is-empty]:before:text-gray-400',
    '[&_.is-empty]:before:pointer-events-none',
    '[&_.is-empty]:before:h-0',

    // 콘텐츠 wrapper 높이 확보
    '[&>div]:min-h-[400px]',

    // 표 스타일 - 너비 제한 + 가운데 정렬 + table-layout 고정
    '[&_table]:mx-auto',
    '[&_table]:w-[700px]',
    '[&_table]:min-w-[400px]',
    '[&_table]:max-w-full',
    '[&_table]:table-fixed',

    // 셀 스타일 - 줄바꿈 + 정렬 + 기본 너비
    '[&_th]:border',
    '[&_td]:border',
    '[&_td]:px-2',
    '[&_td]:py-1',
    '[&_td]:break-words',
    '[&_td]:align-top',
    '[&_td]:min-w-[100px]',

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


export default function WriteEditor({ boardType }: { boardType: string }) {
    const [title, setTitle] = useState('')

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
                placeholder: '오잉크 밸리 에디터 테스트 중, 표 안됨! 피드백 환영!',
                showOnlyCurrent: false,
            }),
        ],
        content: '',
    })

    const handleSave = async () => {
        if (!editor) return;

        const json = editor.getJSON();
        const token = localStorage.getItem('token');

        try {
            const res = await fetch(`/api/boards/${boardType}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    content: json,
                }),
            });

            if (!res.ok) throw new Error('저장 실패');

            const result = await res.json();
            console.log('✅ 저장 완료:', result);

            window.location.href = `/boards/${boardType}`;
        } catch (err) {
            console.error('❌ 에러 발생:', err);
            alert('저장 중 오류 발생');
        }
    };




    return (
        <div className="flex flex-col gap-4">
            {/* 제목 입력 */}
            <input
                className="text-2xl font-bold border-b p-2 outline-none"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* 툴바 */}
            <EditorToolbar editor={editor} />
            {/* 에디터 */}
            <EditorContent editor={editor} className={editorClass} />


            {/* 저장 및 미리보기 */}
            <div className="flex gap-2 justify-end">
                <button
                    className="px-4 py-2 border rounded bg-gray-100"
                    onClick={handleSave}
                >
                    💾 저장
                </button>
                <button
                    className="px-4 py-2 border rounded bg-blue-500 text-white"
                    onClick={() => {
                        const html = editor?.getHTML()
                        console.log('미리보기:', html)
                    }}
                >
                    👀 미리보기
                </button>
            </div>

            <style jsx>{`
                .btn {
                    padding: 4px 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    background: white;
                    cursor: pointer;
                }

                .btn:hover {
                    background: #f0f0f0;
                }
            `}</style>
        </div>
    )
}

