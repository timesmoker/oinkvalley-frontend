// components/boards/BoardSelector.tsx
"use client";

import { useRouter } from "next/navigation";
import { boardConfigs, BoardKey } from "@/data/boards/boardConfigs";

export default function BoardSelector() {
    const router = useRouter();
    const boardList = Object.entries(boardConfigs) as [BoardKey, typeof boardConfigs[BoardKey]][];

    const handleSelect = (key: BoardKey) => {
        router.push(`/boards/${key}`);
    };

    return (
        <div className="w-full px-0 py-6 sm:px-6 sm:max-w-[950px] sm:mx-auto">
            <h2 className="text-2xl font-bold mb-4">게시판을 선택하세요</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {boardList.map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => handleSelect(key)}
                        className={`rounded-2xl border p-6 text-left shadow hover:shadow-lg transition duration-200 ${
                            config.color === "blue"
                                ? "border-blue-300"
                                : config.color === "red"
                                    ? "border-red-300"
                                    : config.color === "green"
                                        ? "border-green-300"
                                        : "border-gray-300"
                        }`}
                    >
                        <h3 className="text-xl font-semibold">{config.name}</h3>
                        <p className="text-sm text-gray-500">{key} 게시판으로 이동</p>
                        {config.showTags && (
                            <span className="text-xs text-gray-400">태그 사용 가능</span>
                        )}

                    </button>
                ))}
            </div>
        </div>
    );
}
