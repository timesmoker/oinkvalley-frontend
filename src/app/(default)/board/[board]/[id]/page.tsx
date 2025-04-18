// src/app/board/[board]/[id]/page.tsx

import { notFound } from "next/navigation";
import posts from "@/data/board/mock-posts.json"; // ✅ mock 데이터 import

export default function PostPage({
                                     params,
                                 }: {
    params: { board: string; id: string };
}) {
    const post = posts.entries.find((entry) => entry.id === params.id);
    if (!post) return notFound();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

            {/* 간단히 content 내용 표시 */}
            <div className="text-muted-foreground">
                {post.content?.content?.[0]?.content?.[0]?.text}
            </div>
        </div>
    );
}
