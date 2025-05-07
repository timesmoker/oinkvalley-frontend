// src/components/board/ui/EntryList.tsx
import Link from "next/link";
import { FileText } from "lucide-react";
import { Entry } from "@/types/boards";

export default function EntryList({
                                      entries,
                                      boardType,
                                      page,
                                      totalPages,
                                  }: {
    entries: Entry[];
    boardType: string;
    page: number;
    totalPages: number;
}) {
    const baseHref = `/boards/${boardType}`;

    return (
        <div className="border rounded-md overflow-hidden">
            <ul>
                {entries.map((entry, i) => (
                    <li
                        key={entry.id}
                        className={`flex items-center gap-3 px-4 py-3 ${
                            i < entries.length - 1 ? "border-b" : ""
                        }`}
                    >
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <Link href={`${baseHref}/${entry.id}`} className="text-base font-medium hover:underline">
                            {entry.title}
                        </Link>
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
