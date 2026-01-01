"use client";

import { motion } from "framer-motion";
import { Users, Code2, Globe, ShieldCheck } from "lucide-react";
import { COMPANY_INFO } from "@/constants/content";

const ICONS = [Users, Code2, ShieldCheck, Globe];

export default function StatsSection() {
    return (
        <section className="py-20 bg-card/30 border-y border-white/10 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {COMPANY_INFO.stats.map((stat, i) => {
                        const Icon = ICONS[i] || Users;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-card/50 border border-white/10 flex items-center justify-center mb-4 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                                    <Icon className="w-8 h-8 text-foreground/80 group-hover:text-primary transition-colors" />
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                                    {stat.value}
                                </h3>
                                <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
