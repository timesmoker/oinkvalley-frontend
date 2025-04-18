// src/components/board/ui/EntryList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

type Entry = { id: string; title: string };

type Props = {
    entries: Entry[];
    totalCount: number;
    baseHref: string;
};

export default function EntryList({ entries, totalCount, baseHref }: Props) {
    const pageSize = 20;
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(totalCount / pageSize);
    const currentEntries = entries.slice(page * pageSize, (page + 1) * pageSize);

    return (
        <div className="border rounded-md overflow-hidden">
            <ul>
                {currentEntries.map((entry, i) => (
                    <li
                        key={entry.id}
                        className={`flex items-center gap-3 px-4 py-3 ${
                            i < currentEntries.length - 1 ? "border-b" : ""
                        }`}
                    >
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <Link href="#" as={`${baseHref}/${entry.id}`}
                              className="text-base font-medium hover:underline">
                            {entry.title}
                        </Link>

                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-center px-4 py-3 border-t bg-muted">
                <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="text-sm hover:underline disabled:opacity-50"
                >
                    이전
                </button>
                <span className="text-sm text-muted-foreground">
          {page + 1} / {totalPages}
        </span>
                <button
                    onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page >= totalPages - 1}
                    className="text-sm hover:underline disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
}
