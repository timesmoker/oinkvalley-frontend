// src/components/boards/ui/EntryList.tsx

import Link from "next/link";
import { FileText } from "lucide-react";
import { PostEntries } from "@/types/board/postEntries";

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const within24Hours = diff < 24 * 60 * 60 * 1000;
    if (within24Hours) {
        return date.toTimeString().slice(0, 5); // "hh:mm"
    } else {
        return date.toISOString().slice(2, 10).replace(/-/g, "."); // "yy.mm.dd"
    }
}

export default function EntryList({
                                      posts,
                                      boardType,
                                      page,
                                      totalPages,
                                  }: {
    posts: PostEntries[];
    boardType: string;
    page: number;
    totalPages: number;
}) {
    const baseHref = `/boards/${boardType}`;


    return (
        <div className="border rounded-md overflow-hidden">
            <ul>
                <li className="flex items-center px-4 py-2 border-b bg-muted text-sm font-semibold text-muted-foreground">
                    <div className="flex-1 truncate">제목</div>
                    <div className="flex items-center gap-4 ml-4">
                        <div className="w-24 text-center">작성자</div>
                        <div className="w-20 text-center">작성시각</div>
                    </div>
                </li>

                {posts.map((entry, i) => (
                    <li
                        key={entry.id}
                        className={`flex items-center px-4 py-3 text-sm ${
                            i < posts.length - 1 ? "border-b" : ""
                        }`}
                    >
                        <FileText className="w-4 h-4 text-muted-foreground mr-2 flex-shrink-0" />
                        <Link
                            href={`${baseHref}/${entry.id}`}
                            className="flex-1 min-w-0 truncate hover:underline"
                            title={entry.title}
                        >
                            {entry.title} [{entry.commentCount}]
                        </Link>
                        <div className="flex items-center gap-4 ml-4">
                            <div className="w-24 text-center truncate">{entry.authorName}</div>
                            <div className="w-20 text-center text-muted-foreground">{formatDate(entry.createdAt)}</div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-center px-4 py-3 border-t bg-muted">
                <Link
                    href={`${baseHref}?page=${Math.max(0, page - 1)}`}
                    className="text-sm hover:underline"
                    aria-disabled={page === 0}
                >
                    이전
                </Link>
                <span className="text-sm text-muted-foreground">{page + 1} / {totalPages}</span>
                <Link
                    href={`${baseHref}?page=${Math.min(totalPages - 1, page + 1)}`}
                    className="text-sm hover:underline"
                    aria-disabled={page >= totalPages - 1}
                >
                    다음
                </Link>
            </div>
        </div>
    );
}
