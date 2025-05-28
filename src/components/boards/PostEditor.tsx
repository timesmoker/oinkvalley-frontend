'use client'

import { useRef, useState } from 'react'
import {Box, Button, Stack,} from '@mui/material'
import { useRouter } from 'next/navigation'
import {
    LinkBubbleMenu,
    MenuButton,
    RichTextEditor,
    TableBubbleMenu,
    type RichTextEditorRef,
} from "mui-tiptap";
import Lock from "@mui/icons-material/Lock";
import LockOpen from "@mui/icons-material/LockOpen";
import TextFields from "@mui/icons-material/TextFields";
import apiClient from '@/lib/api/apiClient'
import axios from 'axios'
import EditorMenuControls from "./EditorMenuControls";
import useExtensions from "./useExtensions";


export default function PostEditor({
                                       boardType,
                                       disableStickyMenuBar,
                                       onSuccess,
                                   }: {
    boardType: string
    disableStickyMenuBar?: boolean
    onSuccess?: () => void

}) {
    const [isEditable, setIsEditable] = useState(true);
    const [showMenuBar, setShowMenuBar] = useState(true);

    const router = useRouter()
    const [title, setTitle] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const rteRef = useRef<RichTextEditorRef>(null);
    const extensions = useExtensions({
        placeholder: "Add your own content here...",
    });
    const isStickyDisabled = disableStickyMenuBar ?? false



    const handleSave = async () => {
        const editor = rteRef.current?.editor;
        if (!editor || submitting) return;

        setSubmitting(true);

        const content = editor.getJSON(); // 💾 에디터 상태 JSON 그대로 저장

        try {
            const res = await apiClient.post(`/boards/${boardType}/posts`, {
                title,
                content,
            });

            console.log("✅ 저장 완료:", res.data);
            onSuccess?.();
            router.push(`/boards/${boardType}?refresh=1`);
        } catch (err) {
            console.error("❌ 에러 발생:", err);
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                if (status === 401 || status === 403) {
                    alert("로그인이 필요합니다.");
                } else {
                    alert("저장 중 오류 발생");
                }
            } else {
                alert("저장 중 오류 발생");
            }
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <>
            <Box
                sx={{
                    minHeight: '60%',
                    "& .ProseMirror": {
                        minHeight: '50vh',
                        padding: '1rem',
                        overflowWrap: 'break-word',
                        wordBreak: 'break-word',

                        "& ol, & ul": {
                            paddingLeft: '1.5rem', // 들여쓰기
                            marginLeft: 0,
                        },

                        "& h1, & h2, & h3, & h4, & h5, & h6": {
                            scrollMarginTop: showMenuBar ? 50 : 0,
                        },
                    },
                }}
            >
                <input
                    className="text-2xl font-bold border-b p-2 outline-none w-full truncate"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <RichTextEditor
                    ref={rteRef}
                    extensions={extensions}
                    editable={isEditable}
                    editorProps={{}}
                    renderControls={() => <EditorMenuControls />}
                    RichTextFieldProps={{
                        // The "outlined" variant is the default (shown here only as
                        // example), but can be changed to "standard" to remove the outlined
                        // field border from the editor
                        variant: "outlined",
                        MenuBarProps: {
                            hide: !showMenuBar,
                            disableSticky: isStickyDisabled,
                        },

                        // Below is an example of adding a toggle within the outlined field
                        // for showing/hiding the editor menu bar, and a "submit" button for
                        // saving/viewing the HTML content
                        footer: (
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    borderTopStyle: "solid",
                                    borderTopWidth: 1,
                                    py: 1,
                                    px: 1.5,
                                }}
                            >
                                <MenuButton
                                    value="formatting"
                                    tooltipLabel={
                                        showMenuBar ? "Hide formatting" : "Show formatting"
                                    }
                                    size="small"
                                    onClick={() => {
                                        setShowMenuBar((currentState) => !currentState);
                                    }}
                                    selected={showMenuBar}
                                    IconComponent={TextFields}
                                />

                                <MenuButton
                                    value="formatting"
                                    tooltipLabel={
                                        isEditable
                                            ? "Prevent edits (use read-only mode)"
                                            : "Allow edits"
                                    }
                                    size="small"
                                    onClick={() => {
                                        setIsEditable((currentState) => !currentState);
                                    }}
                                    selected={!isEditable}
                                    IconComponent={isEditable ? Lock : LockOpen}
                                />

                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={handleSave} disabled={submitting}
                                >
                                    Save
                                </Button>
                            </Stack>
                        ),
                    }}
                >
                    {() => (
                        <>
                            <LinkBubbleMenu />
                            <TableBubbleMenu />
                        </>
                    )}
                </RichTextEditor>
            </Box>
        </>
    )
}

