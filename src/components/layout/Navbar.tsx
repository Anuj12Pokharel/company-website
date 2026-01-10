"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
];

// Simple Logo Component
const Logo = () => (
    <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
            <span className="text-black font-bold text-lg">C</span>
        </div>
        <div className="flex flex-col leading-none">
            <span className="text-white font-bold text-sm">CODEX</span>
            <span className="text-green-500 text-xs">NEURAL</span>
        </div>
    </div>
);

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Get active item based on current pathname
    const activeItem = pathname || "/";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleNavClick = (href: string, e?: React.MouseEvent) => {
        // Handle hash links (e.g., /#services)
        if (href.startsWith("/#")) {
            e?.preventDefault();
            const hash = href.substring(1);
            if (pathname === "/") {
                // If already on home page, just scroll
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            } else {
                // Navigate to home then scroll
                router.push("/");
                setTimeout(() => {
                    const element = document.querySelector(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
            }
        }
        setMobileOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-mono text-xs tracking-widest ${scrolled
                ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10 shadow-lg shadow-green-500/5"
                : "bg-transparent py-6 md:py-8"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative z-50">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Logo />
                    </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            prefetch={true}
                            onClick={(e) => handleNavClick(item.href, e)}
                            className="relative px-4 py-2 text-gray-400 transition-colors duration-300 group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Hover background effect */}
                                <motion.span
                                    className="absolute inset-0 bg-green-500/10 rounded-lg"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Text */}
                                <span className="relative z-10 group-hover:text-green-400 transition-colors duration-300">
                                    {item.label}
                                </span>

                                {/* Active indicator */}
                                {activeItem === item.href && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}

                                {/* Hover underline */}
                                <motion.span
                                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-green-400/50"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: activeItem !== item.href ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </Link>
                    ))}

                    {/* CTA Button */}
                    <Link href="/contact" prefetch={true} className="relative ml-4 px-6 py-2.5 bg-green-500 text-black rounded-full text-sm font-semibold overflow-hidden group">
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <span className="relative z-10 flex items-center gap-2">
                                Get in touch
                                <motion.span
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </span>
                        </motion.div>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                    className="lg:hidden text-white p-2 relative z-50"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <motion.span
                            className="w-full h-0.5 bg-current"
                            animate={mobileOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="w-full h-0.5 bg-current"
                            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="w-full h-0.5 bg-current"
                            animate={mobileOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-20 left-4 right-4 bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-2xl shadow-2xl shadow-green-500/10 overflow-hidden"
                        >
                            <div className="p-6 flex flex-col gap-2">
                                {NAV_ITEMS.map((item, index) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        prefetch={true}
                                        onClick={(e) => handleNavClick(item.href, e)}
                                        className={`relative px-6 py-4 rounded-lg text-lg font-medium transition-all duration-300 ${activeItem === item.href
                                            ? "bg-green-500/20 text-green-400"
                                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="relative z-10">{item.label}</span>
                                            {activeItem === item.href && (
                                                <motion.span
                                                    layoutId="activeMobile"
                                                    className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-green-500 rounded-full"
                                                    initial={false}
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                        </motion.div>
                                    </Link>
                                ))}

                                {/* Mobile CTA */}
                                <Link
                                    href="/contact"
                                    prefetch={true}
                                    onClick={(e) => handleNavClick("/contact", e)}
                                    className="mt-4 px-6 py-4 bg-green-500 text-black rounded-lg text-center text-lg font-semibold"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: NAV_ITEMS.length * 0.05 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Get in touch →
                                    </motion.div>
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}