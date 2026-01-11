"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { TEAM } from "@/constants/content";
import { SectionHeader } from "@/components/ui/neural/SectionHeader";

export default function AboutTeamSection() {
    return (
        <section className="py-32 relative overflow-hidden bg-background">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-12">

                {/* Header & Mission */}
                <div className="mb-24 md:mb-32 max-w-4xl mx-auto text-center space-y-8">
                    <SectionHeader
                        title="THE NEURAL NETWORK"
                        subtitle="ABOUT US"
                        description=""
                        className="items-center text-center"
                    />
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light leading-tight text-foreground"
                    >
                        We architect the <span className="text-primary font-medium">invisible systems</span> that power the visible world.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground/80 font-mono tracking-tight"
                    >
                         // ORCHESTRATING DIGITAL RESILIENCE
                    </motion.p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {TEAM.map((member, i) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            className={`group relative ${member.isFounder ? "lg:-mt-12" : ""}`}
                        >
                            {/* Card Container */}
                            <div className="relative overflow-hidden rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-all duration-500 ease-out group-hover:-translate-y-2">

                                {/* Image Wrapper */}
                                <div className="aspect-[4/5] relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 mb-4 absolute top-6 left-6 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {member.badges?.map((badge, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 text-[10px] uppercase tracking-wider font-mono text-primary bg-primary/10 border border-primary/20 rounded-md backdrop-blur-sm"
                                            >
                                                {badge}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Text Content */}
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-xl font-bold text-foreground mb-1 flex items-center gap-2">
                                            {member.name}
                                            {member.isFounder && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                                        </h3>
                                        <p className="text-sm font-mono text-primary/80 mb-3 uppercase tracking-wider">
                                            {member.role}
                                        </p>
                                        <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                            <p className="text-xs text-muted-foreground/90 leading-relaxed mb-4 border-t border-white/10 pt-3">
                                                {member.bio}
                                            </p>

                                            {/* Socials */}
                                            <div className="flex gap-4">
                                                {Object.entries(member.socials).map(([platform, link]) => (
                                                    <a
                                                        key={platform}
                                                        href={link as string}
                                                        className="text-muted-foreground hover:text-primary transition-colors"
                                                        aria-label={`${member.name}'s ${platform}`}
                                                    >
                                                        {renderSocialIcon(platform)}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function renderSocialIcon(platform: string) {
    switch (platform) {
        case 'linkedin': return <Linkedin className="w-4 h-4" />;
        case 'github': return <Github className="w-4 h-4" />;
        case 'twitter': return <Twitter className="w-4 h-4" />;
        default: return <ArrowUpRight className="w-4 h-4" />;
    }
}
// ORCHESTRATING DIGITAL RESILIENCE