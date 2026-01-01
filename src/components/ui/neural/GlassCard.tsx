"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
    onClick?: () => void;
}

export function GlassCard({ children, className, hoverEffect = true, onClick }: GlassCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "relative overflow-hidden rounded-lg border border-white/10 bg-card/50 backdrop-blur-sm p-6 transition-colors duration-200",
                hoverEffect && "hover:border-primary/50 hover:bg-card/70",
                onClick && "cursor-pointer",
                className
            )}
        >
            {children}
        </div>
    );
}
