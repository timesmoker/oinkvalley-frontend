// src/data/credits.tsx
// 실제로는 tsx가 아니라 ts로 작성되어야 함, eslint가 자꾸 뭐라고 해서 바꿈 ㅠㅠ
// 설정하면 되는데 귀찮아서 못하겠음...
type Credit = {
    id: string;
    content: React.ReactNode;
};


export const iconCredits: Credit[] = [
    {
        id: "pig-icon",
        content: (
            <>
                <strong>favicon:</strong>{" "}
                <a
                    target="_blank"
                    href="https://icons8.com/icon/vPFwrtJspSQM/%EB%8F%BC%EC%A7%80"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    돼지
                </a>{" "}
                작가:{" "}
                <a
                    target="_blank"
                    href="https://icons8.com"
                    rel="noopener noreferrer"
                    className="underline"
                >
                    Icons8
                </a>
            </>
        ),
},
];
