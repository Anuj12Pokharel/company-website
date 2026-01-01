"use client";

import { COMPANY_INFO, TEAM, TESTIMONIALS } from "@/constants/content";
import { SectionHeader } from "@/components/ui/neural/SectionHeader";
import { GlassCard } from "@/components/ui/neural/GlassCard";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-0 pb-20">
            {/* Team / Nodes */}
            <div className="container mx-auto px-4 mb-16">
                <SectionHeader
                    title="ACTIVE NODES"
                    subtitle="OPERATORS"
                    description="Each member is a specialist. We do not hire generalists to fill seats. We connect with experts to solve specific constraints."
                />

                <div className="grid md:grid-cols-3 gap-8">
                    {TEAM.map((member, i) => (
                        <GlassCard key={i} className="group text-center !p-0 overflow-hidden relative">
                            <div className="relative aspect-square w-full bg-gray-950 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                                />
                                {/* Tech Overlay */}
                                <div className="absolute inset-0 bg-grid-white/[0.05] opacity-50" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                                <h3 className="text-xl font-bold text-foreground font-mono">{member.name}</h3>
                                <p className="text-primary text-xs tracking-widest uppercase mb-1">{member.role}</p>
                                <p className="text-[10px] text-muted-foreground font-mono">STATUS: ONLINE</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>

            {/* Testimonials */}
            <div className="container mx-auto px-4 max-w-6xl">
                <SectionHeader
                    title="SIGNAL FEEDBACK"
                    subtitle="VALIDATION"
                    align="center"
                />
                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.id} className="bg-white/5 p-8 rounded-sm border-l-2 border-primary/20 relative hover:bg-white/10 transition-colors">
                            <p className="text-sm text-foreground/90 italic mb-8 relative z-10 leading-relaxed">
                                &quot;{t.text}&quot;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-primary">
                                    {t.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground text-sm">{t.name}</h4>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
