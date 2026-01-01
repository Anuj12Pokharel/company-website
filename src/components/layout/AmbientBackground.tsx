"use client";

import { useEngagement } from "@/context/EngagementContext";
import { motion } from "framer-motion";

export default function AmbientBackground() {
    const { qualityMode } = useEngagement();

    if (qualityMode === "low") {
        return (
            <div className="fixed inset-0 z-0 pointer-events-none bg-background">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" suppressHydrationWarning>
            {/* Base gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
            
            {/* Animated gradient orbs */}
            <motion.div
                className="gradient-orb gradient-orb-1"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="gradient-orb gradient-orb-2"
                animate={{
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />
            <motion.div
                className="gradient-orb gradient-orb-3"
                animate={{
                    x: [0, 60, -60, 0],
                    y: [0, -60, 60, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 10,
                }}
            />
            <motion.div
                className="gradient-orb gradient-orb-4"
                animate={{
                    x: [0, -50, 50, 0],
                    y: [0, 50, -50, 0],
                    scale: [1, 1.2, 0.9, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 15,
                }}
            />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-white opacity-40" />
            
            {/* Subtle radial gradient overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-primary/5" 
                 style={{
                     backgroundImage: "radial-gradient(circle at center, transparent 0%, rgba(0, 255, 136, 0.08) 100%)"
                 }}
            />
        </div>
    );
}
