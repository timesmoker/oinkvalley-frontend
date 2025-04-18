export type CardProps = {
    name: string;
    description: string;         // 데이터 설명 (순수 텍스트)
    imageUrl: string;            // 프로필 이미지 경로
    href: string;                // 클릭 시 이동할 링크
    label: string;               // 아래 표시할 설명 (보통 고정 텍스트)
    center: boolean;             // 가운데 카드 여부 (스타일용)
};

export default function ProfileCard({ name, description, imageUrl, href, label, center }: CardProps) {
    const cardClass = center
        ? "absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/5 z-20"
        : "";

    const sizeClass = center
        ? "w-36 sm:w-40 md:w-44"
        : "w-48 sm:w-60 md:w-72";

    return (
        <div className={`flex flex-col items-center ${cardClass}`}>
            <a
                href={href}
                className={`
                    group relative ${sizeClass} aspect-[4/4]
                    rounded-xl overflow-hidden shadow-lg border cursor-pointer
                    transform transition-all duration-300
                    hover:scale-105 hover:-translate-y-1
                `}
            >
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="text-sm">{description}</p>
                </div>
            </a>
            <p className="mt-3 text-xs text-muted-foreground text-center">{label}</p>
        </div>
    );
}
