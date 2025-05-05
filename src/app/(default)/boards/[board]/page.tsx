// src/app/board/[board]/page.tsx
import { boardConfigs } from "@/data/board/boardConfigs";
import { notFound } from "next/navigation";
import EntryList from "@/components/boards/ui/EntryList";

export default function BoardPage({ params }: { params: { board: string } }) {
    const config = boardConfigs[params.board as keyof typeof boardConfigs];
    if (!config) return notFound();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{config.name}</h1>

            <EntryList boardType={params.board} />
        </div>
    );
}
