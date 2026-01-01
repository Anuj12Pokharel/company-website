"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SERVICES_DETAILED } from "@/constants/content";

type ServiceType = typeof SERVICES_DETAILED[0] & {
    detailedDesc?: string;
};

export default function ServicesModules() {
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

    const handleServiceClick = (service: ServiceType) => {
        setSelectedService(service);
    };

    const closeModal = () => {
        setSelectedService(null);
    };

    // Close modal on ESC key and prevent body scroll
    useEffect(() => {
        if (!selectedService) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedService(null);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [selectedService]);

    return (
        <>
            <section className="relative pt-8 pb-32 container mx-auto px-4 md:px-12" id="services">
                {/* Custom Header matching reference */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px w-16 bg-white/20" />
                        <span className="text-sm text-muted-foreground uppercase tracking-wider">Our Services</span>
                        <div className="h-px w-16 bg-white/20" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Exceptional Services For Your <span className="text-primary">Business Growth</span>
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Stay ahead in the digital race. Your partner in technology strategy and tailored solutions.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <span>Discover our wide range of digital solutions to enhance your online presence.</span>
                        <button className="text-foreground hover:underline flex items-center gap-1 ml-2">
                            <span className="w-2 h-2 bg-foreground rounded-full" />
                            See All
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES_DETAILED.map((service, i) => {
                        const Icon = service.icon;
                        const backgroundVariants = [
                            "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
                            "bg-gradient-to-br from-card/30 via-card/50 to-card/30",
                            "bg-gradient-to-br from-primary/5 via-card/30 to-primary/10",
                            "bg-gradient-to-br from-card/40 via-primary/5 to-card/40"
                        ];
                        const bgClass = backgroundVariants[i % backgroundVariants.length];

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group relative overflow-hidden cursor-pointer"
                                onClick={() => handleServiceClick(service)}
                            >
                                <div className={`${bgClass} border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full flex flex-col relative`}>
                                    {/* Abstract pattern overlay */}
                                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary rounded-full blur-2xl" />
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-xl bg-card/50 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                                            <Icon className="w-8 h-8 text-foreground group-hover:text-primary transition-colors" />
                                        </div>

                                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {service.desc}
                                        </p>
                                        
                                        {/* Arrow indicator */}
                                        <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-medium">Learn more</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        >
                            {/* Modal Content */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-3xl bg-gradient-to-br from-card via-card/95 to-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors border border-white/10"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Modal Header */}
                                <div className="p-8 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                                            {selectedService.icon && (
                                                <selectedService.icon className="w-8 h-8 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-foreground mb-2">
                                                {selectedService.title}
                                            </h2>
                                            <p className="text-muted-foreground text-sm uppercase tracking-wider">
                                                {selectedService.short}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-8">
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
                                        <p className="text-muted-foreground leading-relaxed text-base">
                                            {selectedService.detailedDesc || selectedService.desc}
                                        </p>
                                    </div>

                                    {/* Features */}
                                    {selectedService.features && selectedService.features.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-foreground mb-4">Key Features</h3>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {selectedService.features.map((feature, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                                                    >
                                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                                        <span className="text-muted-foreground text-sm">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Category:</span>
                                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium uppercase">
                                            {selectedService.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Modal Footer */}
                                <div className="p-8 border-t border-white/10 bg-gradient-to-r from-transparent to-primary/5">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                        <button
                                            onClick={closeModal}
                                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground rounded-lg transition-colors border border-white/10"
                                        >
                                            Close
                                        </button>
                                        <a
                                            href="/contact"
                                            onClick={closeModal}
                                            className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                                        >
                                            Get Started
                                        </a>
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
