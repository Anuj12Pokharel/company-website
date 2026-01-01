"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSend = async () => {
        if (!phoneNumber || !message) return;

        setStatus("sending");
        try {
            const response = await fetch("/api/whatsapp/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: phoneNumber,
                    message: `Hello! This is Codex Neural. ${message}`,
                }),
            });

            if (response.ok) {
                setStatus("success");
                setPhoneNumber("");
                setMessage("");
                setTimeout(() => {
                    setIsOpen(false);
                    setStatus("idle");
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-primary/30 transition-all group hover:bg-white/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    boxShadow: [
                        "0 2px 8px rgba(0, 255, 136, 0.3)",
                        "0 2px 12px rgba(0, 255, 136, 0.4)",
                        "0 2px 8px rgba(0, 255, 136, 0.3)",
                    ],
                }}
                transition={{
                    boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
                aria-label="WhatsApp Chat"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <MessageCircle className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors" />
                </motion.div>
                
                {/* Pulse effect */}
                <motion.div
                    className="absolute inset-0 rounded-full border border-primary/20"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                />
            </motion.button>

            {/* Chat Widget */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-20 right-6 z-50 w-80 bg-background border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                    >
                        <div className="bg-primary text-white p-4">
                            <h3 className="font-bold">Codex Neural</h3>
                            <p className="text-xs opacity-90">We typically reply within a few minutes</p>
                        </div>

                        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                            <div className="text-sm text-muted-foreground">
                                <p>👋 Hi! Start a conversation by sending a message to our WhatsApp number.</p>
                                <p className="mt-2 font-mono text-xs">
                                    Or send: <span className="text-primary">START</span> to begin
                                </p>
                            </div>

                            {status === "success" && (
                                <div className="p-2 bg-green-500/10 border border-green-500/20 rounded text-sm text-green-600">
                                    Message sent successfully!
                                </div>
                            )}

                            {status === "error" && (
                                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-600">
                                    Failed to send. Please check configuration.
                                </div>
                            )}

                            <div className="space-y-2">
                                <input
                                    type="tel"
                                    placeholder="Phone number (with country code)"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-3 py-2 border border-white/10 rounded text-sm bg-transparent text-foreground focus:outline-none focus:border-primary"
                                />
                                <textarea
                                    placeholder="Your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-white/10 rounded text-sm bg-transparent text-foreground focus:outline-none focus:border-primary resize-none"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={status === "sending" || !phoneNumber || !message}
                                    className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {status === "sending" ? "Sending..." : "Send via WhatsApp"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

