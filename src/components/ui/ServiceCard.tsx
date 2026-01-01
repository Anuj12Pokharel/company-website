"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    features: string[];
    index: number;
}

export default function ServiceCard({ title, description, icon: Icon, features, index }: ServiceCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors h-full flex flex-col overflow-hidden"
        >
            {/* Background Glow */}
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500",
                    isHovered ? "opacity-100" : ""
                )}
            />

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {description}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-start text-muted-foreground">
                            <Check className="w-3 h-3 text-primary" />
                            {feature}
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center text-primary text-sm font-medium gap-2 group-hover:gap-3 transition-all mt-auto cursor-pointer">
                    Learn More <ArrowRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    );
}
