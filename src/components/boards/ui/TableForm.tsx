'use client'

import { useState } from 'react'
import { Editor } from '@tiptap/react'
import EditorButton from '@/components/board/ui/EditorButton'


export default function InsertTableForm({ editor }: { editor: Editor | null }) {
    const [open, setOpen] = useState(false)
    const [rows, setRows] = useState(3)
    const [cols, setCols] = useState(3)

    const insert = () => {
        editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
        setOpen(false) // 삽입 후 닫기
    }

    return (
        <div className="relative">
            <EditorButton onClick={() => setOpen(!open)}>▦ 표</EditorButton>

            {open && (
                <div className="absolute z-10 top-full mt-2 bg-white border rounded p-3 shadow-md flex gap-2 items-center">
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={rows}
                        onChange={(e) => setRows(+e.target.value)}
                        className="w-16 border p-1 text-sm rounded"
                        placeholder="행"
                    />
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={cols}
                        onChange={(e) => setCols(+e.target.value)}
                        className="w-16 border p-1 text-sm rounded"
                        placeholder="열"
                    />
                    <EditorButton
                        onClick={insert}
                        className="whitespace-nowrap min-w-[48px] px-2 py-1"
                    >삽입</EditorButton>
                </div>
            )}
        </div>
    )
}
