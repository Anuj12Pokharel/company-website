"use client";

import Link from "next/link";
import { COMPANY_INFO } from "@/constants/content";
import Logo from "@/components/ui/neural/Logo";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-card/80 backdrop-blur-md relative z-10 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Node */}
                    <div className="md:col-span-2 pr-12">
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
                            <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                                <Logo />
                            </div>

                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-8">
                            {COMPANY_INFO.description}
                        </p>
                        <div className="flex gap-4">
                            <div className="px-3 py-1 border border-white/10 rounded-full text-[10px] text-muted-foreground uppercase tracking-widest">
                                ISO 27001 ALIGNED
                            </div>
                            <div className="px-3 py-1 border border-white/10 rounded-full text-[10px] text-muted-foreground uppercase tracking-widest">
                                CARBON NEUTRAL
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-foreground font-mono text-xs font-bold tracking-widest mb-8">NAVIGATION</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground font-mono">
                            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                            <li><Link href="/#services" className="hover:text-foreground transition-colors">Services</Link></li>
                            <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-foreground font-mono text-xs font-bold tracking-widest mb-8">TRANSMISSION</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground font-mono">
                            <li><a href={`mailto:contact@codexneural.com`} className="hover:text-foreground transition-colors">contact@codexneural.com</a></li>
                            <li className="pt-4 text-xs text-muted-foreground uppercase tracking-widest">
                                {/* Location */}
                                Global HQ<br />
                                {COMPANY_INFO.location}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} CODEX NEURAL
                    </p>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <p className="text-muted-foreground text-[10px] font-mono text-center max-w-md">
                            Built with deliberate constraint. Maintained with long-term responsibility.
                        </p>
                        <div className="flex gap-8">
                            <Link href="#" className="text-muted-foreground hover:text-foreground text-[10px] font-mono uppercase tracking-widest transition-colors">Privacy</Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground text-[10px] font-mono uppercase tracking-widest transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
