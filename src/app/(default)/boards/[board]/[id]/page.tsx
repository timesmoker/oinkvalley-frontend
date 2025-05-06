// src/app/board/[board]/[id]/page.tsx

import { notFound } from "next/navigation";
import {boardConfigs} from "@/data/boards/boardConfigs";
import {PostDetail} from "@/types/posts";
import dynamic from "next/dynamic";

const Viewer = dynamic(() => import('@/components/boards/Viewer'), { ssr: false });

export default async function PostPage({ params }: {params: { board: string; id: string; } }) {
    const config = boardConfigs[params.board as keyof typeof boardConfigs];
    if (!config) return notFound();

    const res = await fetch(
        `http://nginx/api/boards/${params.board}/posts/${params.id}`,
        { cache: 'no-store' }
    );

    if (!res.ok) {
        return notFound();
    }

    const post: PostDetail = await res.json();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div className="prose">{/* JSON content 렌더링 */}</div>
            <Viewer content={post.content} />
        </div>
    );
}
