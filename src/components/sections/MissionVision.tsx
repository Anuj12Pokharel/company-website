"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";
import { SectionHeader } from "@/components/ui/neural/SectionHeader";

export default function MissionVision() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    {/* Left: Manifesto */}
                    <div>
                        <SectionHeader
                            title="THE COLLECTIVE"
                            subtitle="WHO WE ARE"
                            description=""
                            className="mb-8"
                        />
                        <h3 className="text-3xl md:text-4xl font-light leading-tight text-foreground mb-8">
                            We are not just a dev shop. We are a <span className="text-foreground">neural network</span> of systems engineers.
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            Codex Neural creates the digital backbone for enterprises that demand precision.
                            We bypass the bloat of traditional agencies to deliver raw engineering power.
                            Our topology is distributed, our code is immutable, and our focus is absolute.
                        </p>
                    </div>

                    {/* Right: Mission/Vision Cards */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 rounded-2xl bg-card/50 border border-white/10 hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-card/70 text-foreground mt-1">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-foreground mb-2">Our Mission</h4>
                                    <p className="text-muted-foreground">
                                        To architect the invisible systems that power the visible world.
                                        We approach every project as a critical infrastructure challenge.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="p-8 rounded-2xl bg-card/50 border border-white/10 hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-card/70 text-foreground mt-1">
                                    <Lightbulb className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-foreground mb-2">Our Vision</h4>
                                    <p className="text-muted-foreground">
                                        A future where software is organic, resilient, and intelligent.
                                        We are building the standards for the next generation of the web.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
