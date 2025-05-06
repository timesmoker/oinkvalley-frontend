// src/app/board/[board]/page.tsx
import { boardConfigs } from "@/data/boards/boardConfigs";
import { notFound } from "next/navigation";
import EntryList from "@/components/boards/ui/EntryList";
import Link from "next/link";

export default function BoardPage({ params }: { params: { board: string } }) {
    const config = boardConfigs[params.board as keyof typeof boardConfigs];

    if (!config) return notFound();
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{config.name}</h1>

            <EntryList boardType={params.board} />
            <div className="mt-8 flex justify-end">
                <Link
                    href={`/boards/${params.board}/write`}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-500 transition"
                >
                    글쓰기
                </Link>
            </div>

        </div>
    );
}
