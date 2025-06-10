import { JSONContent } from '@tiptap/core'

export type PostComment = {
    id: number;
    content: JSONContent;
    username: string;
    createdAt: string;
};