import { cn } from "@/lib/utils";
import React from "react";

type Variant = "default" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
}

export function Button({ variant = "default", className, ...props }: ButtonProps) {
    const base = "px-4 py-1 text-sm rounded-md font-medium";
    const variants = {
        default: "bg-gray-800 text-white",
        outline: "border text-gray-800",
    };

    return (
        <button className={cn(base, variants[variant], className)} {...props} />
    );
}
