'use client'

import { Editor } from '@tiptap/react'
import EditorButton from '@/features/boards/components/ui/EditorButton'
import TableForm from '@/features/boards/components/ui/TableForm'

export default function EditorToolbar({ editor }: { editor: Editor | null }) {
    const insertImage = () => {
        const url = prompt("이미지 URL을 입력하세요")
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run()
        }
    }

    return (
        <div className="flex gap-2 flex-wrap border-b pb-3 mb-4">
            <EditorButton onClick={() => editor?.chain().focus().toggleBold().run()} isActive={editor?.isActive('bold')}>Bold</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleItalic().run()} isActive={editor?.isActive('italic')}>Italic</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleUnderline().run()} isActive={editor?.isActive('underline')}>Underline</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor?.isActive('heading', { level: 1 })}>H1</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor?.isActive('heading', { level: 2 })}>H2</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleBulletList().run()} isActive={editor?.isActive('bulletList')}>• List</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} isActive={editor?.isActive('orderedList')}>1. List</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleTaskList().run()} isActive={editor?.isActive('taskList')}>☑ 체크박스</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} isActive={editor?.isActive('blockquote')}>Quote</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().toggleCodeBlock().run()} isActive={editor?.isActive('codeBlock')}>Code</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().setHorizontalRule().run()}>― HR</EditorButton>
            <TableForm editor={editor} />
            <EditorButton onClick={insertImage}>🖼 이미지</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().undo().run()}>⎌ Undo</EditorButton>
            <EditorButton onClick={() => editor?.chain().focus().redo().run()}>↻ Redo</EditorButton>
        </div>
    )
}
