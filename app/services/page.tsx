"use client";

import ServicesModules from "@/components/sections/ServicesSection";

export default function ServicesPage() {
    return (
        <div className="min-h-screen pt-16 pb-20">
            <div className="container mx-auto px-4 md:px-12">
                <header className="mb-12">
                    <span className="text-primary font-mono text-xs tracking-widest block mb-4">{"MODULES"}</span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white max-w-4xl">
                        SYSTEM CAPABILITIES
                    </h1>
                    <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        Our stack is not fixed. It adapts to the problem. We deploy modular, scalable capabilities that integrate directly into your business logic.
                    </p>
                </header>

                {/* Reuse the modules component, but maybe we could add more detail here in V2 */}
                <ServicesModules />
            </div>
        </div>
    );
}
