// src/app/(default)/boards/[boardType]/page.tsx

import { boardConfigs } from "@/data/boards/boardConfigs";
import { notFound } from "next/navigation";
import EntryList from "@/components/boards/EntryList";
import Link from "next/link";
import { PostEntries } from "@/types/board/postEntries";
import { PageResponse } from "@/types/pagination";

export default async function BoardPage({
                                            params,
                                            searchParams,
                                        }: {
    params: { boardType: string };
    searchParams: { page?: string };
}) {
    const config = boardConfigs[params.boardType as keyof typeof boardConfigs];
    if (!config) return notFound();

    const page = parseInt(searchParams.page || '0', 10);

    const res = await fetch(
        `http://nginx/api/boards/${params.boardType}/posts?page=${page}&size=20`,
        { cache: 'no-store' }
    );

    if (!res.ok) return notFound();

    const data: PageResponse<PostEntries> = await res.json();

    return (
        <div className="w-full px-0 py-6 sm:px-6 sm:max-w-[950px] sm:mx-auto">
            <h1 className="text-2xl font-bold mb-4">{config.name}</h1>

            <EntryList
                posts={data.content}
                boardType={params.boardType}
                page={page}
                totalPages={data.totalPages}
            />

            <div className="mt-8 flex justify-end">
                <Link
                    href={`/boards/${params.boardType}/write`}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-500 transition"
                >
                    글쓰기
                </Link>
            </div>
        </div>
    );
}
