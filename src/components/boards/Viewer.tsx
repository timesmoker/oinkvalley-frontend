//src/components/board/Viewer.tsx
'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { JSONContent } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
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

export default function Viewer({ content }: { content: JSONContent }) {
    const editor = useEditor({
        editable: false,
        content,
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: true }),
            Image,
            Heading.configure({ levels: [1, 2] }),
            TextStyle,
            Color,
            TaskList,
            TaskItem.configure({ nested: true }),
            HorizontalRule,
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
        ],
    })

    return (
        <div className="prose max-w-none border p-6 bg-white rounded shadow">
            <EditorContent editor={editor} />
        </div>
    )
}
