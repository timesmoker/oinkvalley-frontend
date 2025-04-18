// src/lib/boardConfigs.ts
export const boardConfigs = {
    "office-of-architect": {
        name: "📚 사무소 서류",
        color: "blue",
        showTags: true,
    },
    notice: {
        name: "공지사항",
        color: "red",
        showTags: false,
    },
    qa: {
        name: "질문과 답변",
        color: "green",
        showTags: true,
    },
} as const;

export type BoardKey = keyof typeof boardConfigs;
