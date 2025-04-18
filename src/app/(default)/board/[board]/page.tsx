// src/app/board/[board]/page.tsx
import { boardConfigs } from "@/data/board/boardConfigs";
import { notFound } from "next/navigation";
import EntryList from "@/components/board/ui/EntryList";

import posts from "@/data/board/mock-posts.json"; // ✅ JSON import

export default function BoardPage({ params }: { params: { board: string } }) {
    const config = boardConfigs[params.board as keyof typeof boardConfigs];
    if (!config) return notFound();

    const page = 0;
    const pageSize = 20;
    const totalCount = posts.entries.length;
    const entries = posts.entries.slice(page * pageSize, (page + 1) * pageSize);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{config.name}</h1>

            <EntryList
                entries={entries}
                totalCount={totalCount}
                baseHref={`/board/${params.board}`}
            />
        </div>
    );
}
