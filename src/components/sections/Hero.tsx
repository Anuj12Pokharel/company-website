"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
    "INITIALIZING KERNEL...",
    "LOADING NEURAL MESH...",
    "ESTABLISHING CONNECTION...",
    "ACCESS GRANTED."
];

export default function SystemBootHero() {
    const [bootStep, setBootStep] = useState(0);
    const [isBooted, setIsBooted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    useEffect(() => {
        if (bootStep < BOOT_SEQUENCE.length) {
            const timeout = setTimeout(() => setBootStep(prev => prev + 1), 200);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => setIsBooted(true), 300);
            return () => clearTimeout(timeout);
        }
    }, [bootStep]);

    return (
        <>
            <section ref={ref} className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden font-mono">
                {!isBooted && (
                    <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center text-xs tracking-widest text-white/80">
                        <div className="w-64 max-w-[80vw] flex flex-col gap-2">
                            {BOOT_SEQUENCE.slice(0, bootStep).map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="text-green-400">{">"}</span>
                                    <span className="text-white">{log}</span>
                                </motion.div>
                            ))}
                            {bootStep < BOOT_SEQUENCE.length && (
                                <motion.div
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="h-4 w-2 bg-green-400 mt-2"
                                />
                            )}
                        </div>
                    </div>
                )}

                <motion.div
                    style={{ y }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isBooted ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 container mx-auto px-4 md:px-12 flex flex-col items-start"
                >
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: isBooted ? 1 : 0, scaleX: isBooted ? 1 : 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="flex items-center gap-4 mb-12 origin-left"
                        >
                            <div className="w-full h-px bg-white/10" />
                            <span className="text-xs text-gray-400 whitespace-nowrap tracking-[0.2em]">
                                SYSTEM_ONLINE
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-12"
                            style={{
                                perspective: "1000px",
                                transformStyle: "preserve-3d"
                            }}
                        >
                            <motion.span
                                className="block text-white"
                                initial={{ rotateX: 0, z: 0 }}
                                animate={{
                                    rotateX: isBooted ? [0, -2, 0] : 0,
                                    z: isBooted ? [0, 50, 0] : 0
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                }}
                                style={{
                                    transformStyle: "preserve-3d",
                                    display: "block"
                                }}
                            >
                                Engineering the
                            </motion.span>
                            <motion.span
                                className="block text-white"
                                initial={{ rotateX: 0, z: 0 }}
                                animate={{
                                    rotateX: isBooted ? [0, 2, 0] : 0,
                                    z: isBooted ? [0, -50, 0] : 0
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    delay: 0.2
                                }}
                                style={{
                                    transformStyle: "preserve-3d",
                                    display: "block"
                                }}
                            >
                                invisible system
                            </motion.span>
                        </motion.h1>

                        <div className="space-y-4 max-w-2xl mb-12">
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: isBooted ? 1 : 0, x: isBooted ? 0 : -20 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l-2 border-green-500/20 pl-6"
                            >
                                We build infrastructure that survives growth.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: isBooted ? 1 : 0, x: isBooted ? 0 : -20 }}
                                transition={{ delay: 0.3 }}
                                className="text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l-2 border-green-500/20 pl-6"
                            >
                                Complexity is not a feature; clarity is the only metric.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: isBooted ? 1 : 0, x: isBooted ? 0 : -20 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l-2 border-green-500/20 pl-6"
                            >
                                Intelligence requires architecture, not just code.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isBooted ? 1 : 0, y: isBooted ? 0 : 20 }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-green-500 text-black font-semibold text-lg rounded-full overflow-hidden transition-all duration-300"
                            >
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Background Ambience */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-0 pointer-events-none" />

                {/* Neural network pattern */}
                {isBooted && (
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
                        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
                            <defs>
                                <pattern id="neural-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <circle cx="50" cy="50" r="2" fill="currentColor" className="text-green-500" />
                                    <line x1="50" y1="50" x2="150" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-green-500/30" />
                                    <line x1="50" y1="50" x2="50" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-green-500/30" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#neural-grid)" />
                            <path d="M100,200 Q300,100 500,200 T900,200" stroke="currentColor" strokeWidth="1" fill="none" className="text-green-500/20" />
                            <path d="M200,400 Q400,300 600,400 T1000,400" stroke="currentColor" strokeWidth="1" fill="none" className="text-green-500/20" />
                        </svg>
                    </div>
                )}
            </section>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="absolute top-6 right-6 z-10 w-12 h-12 bg-gray-900 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors"
                                >
                                    <span className="text-2xl">×</span>
                                </button>

                                <div className="grid md:grid-cols-2 gap-0">
                                    {/* Left Column - Form */}
                                    <div className="p-8 md:p-12">
                                        <div className="mb-8">
                                            <p className="text-gray-600 text-sm mb-2">Have a Project in Mind?</p>
                                            <h2 className="text-4xl font-bold text-gray-900 mb-2">Get In Touch</h2>
                                            <p className="text-gray-500 text-sm">Fill out the form below and we'll get back to you shortly.</p>
                                        </div>

                                        <form className="space-y-4">
                                            {/* Name */}
                                            <div>
                                                <label htmlFor="modal-name" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Full Name *
                                                </label>
                                                <input
                                                    id="modal-name"
                                                    type="text"
                                                    required
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                                />
                                            </div>

                                            {/* Contact Number */}
                                            <div>
                                                <label htmlFor="modal-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Contact Number *
                                                </label>
                                                <div className="flex gap-0 border border-gray-300 rounded-lg overflow-hidden">
                                                    <div className="flex items-center gap-2 px-4 bg-gray-50 border-r border-gray-300">
                                                        <span className="text-gray-700 text-sm">+977</span>
                                                    </div>
                                                    <input
                                                        id="modal-phone"
                                                        type="tel"
                                                        required
                                                        placeholder="9800000000"
                                                        className="flex-1 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <div>
                                                <label htmlFor="modal-address" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Address *
                                                </label>
                                                <input
                                                    id="modal-address"
                                                    type="text"
                                                    required
                                                    placeholder="City, Country"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                                />
                                            </div>

                                            {/* Company Name (Optional) */}
                                            <div>
                                                <label htmlFor="modal-company" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Company Name <span className="text-gray-400 font-normal">(Optional)</span>
                                                </label>
                                                <input
                                                    id="modal-company"
                                                    type="text"
                                                    placeholder="Your Company"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                                                />
                                            </div>

                                            {/* Service Category */}
                                            <div>
                                                <label htmlFor="modal-service" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Service Category *
                                                </label>
                                                <select
                                                    id="modal-service"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-gray-700"
                                                >
                                                    <option value="">-- Select a Service --</option>
                                                    <option value="web-development">Web Development</option>
                                                    <option value="mobile-development">Mobile Development</option>
                                                    <option value="ai-ml">AI/ML Solutions</option>
                                                    <option value="cloud-infrastructure">Cloud Infrastructure</option>
                                                    <option value="blockchain">Blockchain Development</option>
                                                    <option value="system-architecture">System Architecture</option>
                                                    <option value="consulting">Consulting</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            {/* Description */}
                                            <div>
                                                <label htmlFor="modal-description" className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Project Description *
                                                </label>
                                                <textarea
                                                    id="modal-description"
                                                    required
                                                    placeholder="Tell us about your project, requirements, timeline, and any specific needs..."
                                                    rows={4}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                                                />
                                            </div>

                                            {/* Submit Button */}
                                            <button
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    alert('Thank you for your interest! We will contact you soon.');
                                                    setIsModalOpen(false);
                                                }}
                                                className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                                            >
                                                Submit Request
                                            </button>
                                        </form>
                                    </div>

                                    {/* Right Column - Contact Info */}
                                    <div className="relative bg-gradient-to-br from-green-400 via-green-500 to-emerald-500 p-8 md:p-12 text-white overflow-hidden">
                                        {/* Decorative elements */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
                                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full translate-y-48 -translate-x-48" />

                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-semibold mb-2">We would love to hear from you</h3>
                                            <h2 className="text-3xl font-bold mb-8">Let's Build Something Amazing</h2>
                                            <p className="text-white/90 mb-12 text-sm leading-relaxed">
                                                Whether you have a project in mind or just want to explore possibilities,
                                                we're here to help turn your vision into reality.
                                            </p>

                                            <div className="space-y-8">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-white/90 text-sm mb-1">Our Phone Number</p>
                                                        <p className="text-xl font-semibold">+977 9800000000</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-white/90 text-sm mb-1">Our Email</p>
                                                        <p className="text-xl font-semibold break-all">contact@codexneural.com</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-start gap-4">
                                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-white/90 text-sm mb-1">Office Address</p>
                                                        <p className="text-xl font-semibold">Kathmandu, Nepal</p>
                                                    </div>
                                                </div>

                                                <div className="pt-8 border-t border-white/20">
                                                    <p className="text-sm text-white/80 mb-3">Follow us on social media</p>
                                                    <div className="flex gap-3">
                                                        <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                            </svg>
                                                        </a>
                                                        <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                                            </svg>
                                                        </a>
                                                        <a href="#" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors">
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}