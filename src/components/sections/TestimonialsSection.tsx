"use client";

import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/constants/content";
import { SectionHeader } from "@/components/ui/neural/SectionHeader";
import { GlassCard } from "@/components/ui/neural/GlassCard";

export default function TestimonialsSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-transparent to-card/30">
            <div className="container mx-auto px-4 md:px-12">
                <SectionHeader
                    title="SIGNAL FEEDBACK"
                    subtitle="VALIDATION"
                    description="Transmission logs from our partners."
                    className="mb-16 text-center mx-auto max-w-2xl"
                />

                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t) => (
                        <GlassCard key={t.id} className="relative pt-12">
                            <div className="absolute top-8 left-8 text-foreground/10">
                                <Quote className="w-10 h-10" />
                            </div>
                            <p className="text-muted-foreground mb-8 relative z-10 italic leading-relaxed">
                                &quot;{t.text}&quot;
                            </p>
                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-card/50 to-card/70 border border-white/10" />
                                <div>
                                    <h4 className="text-foreground font-bold text-sm">{t.name}</h4>
                                    <p className="text-xs text-muted-foreground font-mono">{t.role}</p>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
