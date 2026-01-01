"use client";

import { SectionHeader } from "@/components/ui/neural/SectionHeader";
import { PROCESS_STEPS } from "@/constants/content";

export default function ProcessPreviewSection() {
    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-4 md:px-12">
                <SectionHeader
                    title="ENJOY SEAMLESS SERVICE"
                    subtitle="OUR PROCESS"
                    description="A calibrated workflow reducing friction and maximizing output."
                    className="mb-16 text-center mx-auto max-w-2xl"
                />

                <div className="max-w-4xl mx-auto space-y-8">
                    {PROCESS_STEPS.map((step) => (
                        <div
                            key={step.step}
                            className="flex gap-8 md:gap-12 group"
                        >
                            <div className="flex-shrink-0 w-16 md:w-20 text-4xl md:text-5xl font-bold text-white/10 font-mono group-hover:text-primary/30 transition-colors">
                                {step.step}
                            </div>
                            <div className="flex-grow pb-8 border-b border-white/10 last:border-0">
                                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-foreground transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
