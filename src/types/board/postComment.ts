import { JSONContent } from '@tiptap/core'

export type PostComment = {
    id: number;
    content: JSONContent;
    authorName: string;
    createdAt: string;
};