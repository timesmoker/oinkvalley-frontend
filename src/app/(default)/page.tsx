//src/app/page.tsx
import React from "react";
import HeroSection from "@/components/shared/ui/HeroSection";
import CardSection from "@/components/shared/ui/CardSection";

export default function HomePage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <HeroSection />
            <CardSection />
        </div>
    );
}
