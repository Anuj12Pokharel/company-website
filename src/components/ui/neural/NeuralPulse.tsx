"use client";

import { motion } from "framer-motion";

const NeuralPulse = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Horizontal Data Streams */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`h-${i}`}
                    className="absolute h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent w-full"
                    style={{ top: `${20 + i * 15}%` }}
                    animate={{
                        x: ["-100%", "100%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5
                    }}
                />
            ))}

            {/* Vertical Pulse */}
            <motion.div
                className="absolute top-0 bottom-0 w-px bg-primary/30 left-1/2"
                animate={{ opacity: [0.1, 0.5, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </div>
    );
};
export default NeuralPulse;
