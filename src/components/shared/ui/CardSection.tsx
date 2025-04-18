import ProfileCard from "@/components/shared/ui/ProfileCard";
import { profileCards } from "@/data/shared/cards";

export default function CardSection() {
    return (
        <section className="relative flex justify-center gap-4 sm:gap-20 py-16 px-4">
            {profileCards.map((card) => (
                <ProfileCard key={card.name} {...card} />
            ))}
        </section>
    );
}
