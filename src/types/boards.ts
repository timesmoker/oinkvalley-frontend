// src/types/board.ts
export type Entry = {
    id: number;
    title: string;
    authorName: string;
    createdAt: string;
    commentCount: number;
};

export type BoardComment = {
    id: number;
    content: string;
    authorName: string;
    createdAt: string;
};

export type BoardProps = {
    boardType:string;
};