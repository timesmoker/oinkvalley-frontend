// src/types/posts.ts
export type PostDetail = {
    id: number;
    title: string;
    content: Record<string, unknown>;
    authorName: string;
    createdAt: string;
    updatedAt: string;

};