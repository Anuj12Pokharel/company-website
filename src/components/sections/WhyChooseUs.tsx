"use client";

import { motion } from "framer-motion";
import { Layers, Cpu, Code2 } from "lucide-react";

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-black/20 relative overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-secondary/5 blur-[100px] pointer-events-none" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-6">
                            Why Partner with Codex Neural?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                            We define ourselves not just by the code we write, but by the business value we deliver.
                            Our unique blend of technical expertise and creative problem-solving sets us apart.
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    title: "Technical Excellence",
                                    desc: "We use the latest stable technologies (Next.js 14, React, Cloud Native) to ensure longevity.",
                                    icon: Code2
                                },
                                {
                                    title: "Scalable Architecture",
                                    desc: "Systems designed to grow with your user base, from 100 to 1 million users.",
                                    icon: Layers
                                },
                                {
                                    title: "AI-First Approach",
                                    desc: "We integrate AI capabilities into standard software to provide a competitive edge.",
                                    icon: Cpu
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1">
                                        <div className="p-2 rounded bg-primary/20 text-primary">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-1">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 mt-8">
                                <div className="h-40 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-white/5 p-6 flex flex-col justify-end">
                                    <span className="text-3xl font-bold text-primary">98%</span>
                                    <span className="text-sm text-muted-foreground">Client Retention</span>
                                </div>
                                <div className="h-56 rounded-2xl bg-gradient-to-br from-primary/20 to-card border border-white/5 p-6 flex flex-col justify-end">
                                    <span className="text-3xl font-bold text-white">24/7</span>
                                    <span className="text-sm text-muted-foreground">Support & Maintenance</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-56 rounded-2xl bg-gradient-to-br from-secondary/20 to-card border border-white/5 p-6 flex flex-col justify-end">
                                    <span className="text-3xl font-bold text-white">100%</span>
                                    <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                                </div>
                                <div className="h-40 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-white/5 p-6 flex flex-col justify-end">
                                    <span className="text-3xl font-bold text-accent">50+</span>
                                    <span className="text-sm text-muted-foreground">Experts</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
