// src/data/board/boardConfigs.ts
export const boardConfigs = {
    "office-of-architect": {
        name: "📚 오잉크 밸리 건축 사무소",
        color: "blue",
        showTags: true,
        isPublic: true,
    },
    "zzang": {
        name: "장윤지 게시판",
        color: "blue",
        showTags: true,
        isPublic: false,
    },
    "timesmoker": {
        name: "김태형 게시판",
        color: "blue",
        showTags: true,
        isPublic: true,
    },"bubblepal": {
        name: "나메코 머신 개발 일지",
        color: "blue",
        showTags: true,
        isPublic: false,
    },"coding-test": {
        name: "코테노트",
        color: "blue",
        showTags: true,
        isPublic: true,
    },
    "nameko-zone": {
        name: "나메코 게시판",
        color: "blue",
        showTags: true,
        isPublic: false,
    }
} as const;

export type BoardKey = keyof typeof boardConfigs;
