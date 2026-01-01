"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTAStrip() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            
            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-6 tracking-tight leading-tight">
                        Build <span className="text-primary">Smarter.</span> Scale{" "}
                        <span className="text-primary">Faster.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        Your partner for <span className="font-semibold text-foreground">custom digital solutions</span>, 
                        including web, mobile, and intelligent software development tailored to your business growth.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold transition-all duration-200 hover:scale-105 shadow-xl shadow-primary/30"
                    >
                        Book a Free Consultation
                        <ArrowRight className="w-5 h-5" />
                    </Link>

                </div>
            </div>
        </section>
    );
}
