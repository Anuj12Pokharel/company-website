"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/neural/SectionHeader";

const INDUSTRIES = [
    {
        title: "Enterprise & SaaS",
        applications: [
            "Scalable cloud infrastructure",
            "Microservices architecture",
            "API-first development"
        ]
    },
    {
        title: "Finance & Banking",
        applications: [
            "Secure payment systems",
            "Real-time transaction processing",
            "Compliance automation"
        ]
    },
    {
        title: "Healthcare & Biotech",
        applications: [
            "HIPAA-compliant systems",
            "Medical data analytics",
            "Telemedicine platforms"
        ]
    },
    {
        title: "E-commerce & Retail",
        applications: [
            "High-performance storefronts",
            "Inventory management",
            "Personalization engines"
        ]
    },
    {
        title: "Education & EdTech",
        applications: [
            "Learning management systems",
            "Student analytics platforms",
            "Virtual classroom solutions"
        ]
    },
    {
        title: "Government & Public Sector",
        applications: [
            "Citizen portals",
            "Data governance systems",
            "Public service automation"
        ]
    }
];

export default function IndustriesSection() {
    return (
        <section className="py-32 relative overflow-hidden bg-card/20">
            <div className="container mx-auto px-4 md:px-12">
                <SectionHeader
                    title="We drive innovation in various key industries"
                    subtitle="INDUSTRIES"
                    description="Specialized solutions tailored to industry-specific challenges and requirements."
                    className="mb-16 text-center mx-auto max-w-2xl"
                    align="center"
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {INDUSTRIES.map((industry, i) => (
                        <motion.div
                            key={industry.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="group"
                        >
                            <div className="bg-card/50 border border-white/10 rounded-xl p-6 h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                                <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                    {industry.title}
                                </h3>
                                <ul className="space-y-2">
                                    {industry.applications.map((app, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                            <span className="text-primary mt-1">•</span>
                                            <span>{app}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-12"
                >
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                        Talk to our experts
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

