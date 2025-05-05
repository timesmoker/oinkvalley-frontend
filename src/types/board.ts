// src/types/board.ts
export type Entry = {
    id: number;
    title: string;
    authorName: string;
    createdAt: string;
    commentCount: number;
};

export type Comment = {
    id: number;
    content: string;
    author: string;
    createdAt: string;
};

export type BoardProps = {
    boardType:string;

};