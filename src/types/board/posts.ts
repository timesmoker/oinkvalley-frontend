// src/types/posts.ts
import { JSONContent } from '@tiptap/core'
export type PostDetail = {
    id: number;
    title: string;
    content: JSONContent;
    username: string;
    createdAt: string;
    updatedAt: string;

};