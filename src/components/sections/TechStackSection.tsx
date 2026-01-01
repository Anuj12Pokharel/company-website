"use client";

import { SectionHeader } from "@/components/ui/neural/SectionHeader";
import { GlassCard } from "@/components/ui/neural/GlassCard";

const TECH_CATEGORIES = [
    {
        title: "LANGUAGES",
        stack: ["Python", "TypeScript", "Go", "Rust"]
    },
    {
        title: "FRAMEWORKS",
        stack: ["Next.js", "React", "Torch", "TensorFlow"]
    },
    {
        title: "INFRASTRUCTURE",
        stack: ["AWS", "Vercel", "Docker", "Kubernetes"]
    },
    {
        title: "DATABASE",
        stack: ["PostgreSQL", "Redis", "VectorDB", "GraphDB"]
    }
];

export default function TechStackSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-card/30 border-y border-white/10">
            <div className="container mx-auto px-4 md:px-12">
                <SectionHeader
                    title="TECHNOLOGIES WE RELY ON"
                    subtitle="CORE STACK"
                    description="We choose stability over hype. Our stack is built for decades, not days."
                    className="mb-16 text-center mx-auto max-w-2xl"
                />

                <div className="grid md:grid-cols-4 gap-6">
                    {TECH_CATEGORIES.map((cat) => (
                        <GlassCard key={cat.title} className="h-full bg-card/50 hover:bg-card/70 transition-colors">
                            <h3 className="text-foreground font-mono text-xs tracking-widest uppercase mb-6 border-b border-white/10 pb-4">
                                {cat.title}
                            </h3>
                            <div className="space-y-3">
                                {cat.stack.map(tech => (
                                    <div key={tech} className="flex items-center gap-2 group">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
                                        <span className="text-muted-foreground group-hover:text-foreground transition-colors font-mono text-sm">
                                            {tech}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
