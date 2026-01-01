"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}

export function SectionHeader({ title, subtitle, description, align = "left", className }: SectionHeaderProps) {
    return (
        <div className={cn("mb-4", align === "center" ? "text-center mx-auto max-w-3xl" : "text-left", className)}>
            <span className="text-white font-bold font-mono text-sm tracking-[0.3em] uppercase mb-1 block">
                {subtitle}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight">
                {title}
            </h2>
            {description && (
                <p className="text-lg text-white/90 font-semibold leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
}
