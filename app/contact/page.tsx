"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    // ArrowUpRight,
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle2,
    AlertCircle,
    Upload,
    X,
    Linkedin,
    Twitter,
    Github,
    Facebook,
    Building2,
    User,
    MessageSquare,
    Calendar,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    subject: string;
    message: string;
    contactMethod: string;
    contactTime: string;
}

const SUBJECTS = [
    "General Inquiry",
    "Technical Support",
    "Partnership Opportunity",
    "Career Opportunities",
    "Project Consultation",
    "Other"
];

const CONTACT_METHODS = ["Email", "Phone", "Both"];
const CONTACT_TIMES = ["Morning (9AM-12PM)", "Afternoon (12PM-5PM)", "Evening (5PM-8PM)", "Anytime"];

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: SUBJECTS[0],
        message: "",
        contactMethod: CONTACT_METHODS[0],
        contactTime: CONTACT_TIMES[3]
    });
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    // Hide background animations
    useEffect(() => {
        document.body.classList.add("contact-page");
        const hideElements = () => {
            const elements = document.querySelectorAll(
                '.gradient-orb, [class*="gradient-orb"], canvas, .bg-noise, [data-engine]'
            );
            elements.forEach(el => {
                (el as HTMLElement).style.display = 'none';
            });
        };
        hideElements();
        const interval = setInterval(hideElements, 100);

        return () => {
            document.body.classList.remove("contact-page");
            clearInterval(interval);
        };
    }, []);

    const validateField = (name: keyof FormData, value: string) => {
        switch (name) {
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "Invalid email address";
                }
                break;
            case "phone":
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                    return "Invalid phone number";
                }
                break;
            case "name":
                if (value.length < 2) {
                    return "Name must be at least 2 characters";
                }
                break;
            case "message":
                if (value.length < 10) {
                    return "Message must be at least 10 characters";
                }
                break;
        }
        return "";
    };

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(file => file.size <= 5 * 1024 * 1024); // 5MB limit
        setAttachedFiles(prev => [...prev, ...validFiles].slice(0, 3)); // Max 3 files
    };

    const removeFile = (index: number) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMessage("");

        // Validate all fields
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
            if (error) newErrors[key as keyof FormData] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setStatus("error");
            setErrorMessage("Please fix the errors in the form");
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    files: attachedFiles.map(f => f.name)
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to send message");
            }

            setStatus("success");
            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                subject: SUBJECTS[0],
                message: "",
                contactMethod: CONTACT_METHODS[0],
                contactTime: CONTACT_TIMES[3]
            });
            setAttachedFiles([]);
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.");
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "codexneural2025@gmail.com",
            link: "mailto:codexneural2025@gmail.com"
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+977 9840327185",
            link: "tel:+9779840327185"
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Kathmandu, Nepal",
            link: "https://maps.google.com"
        },
        {
            icon: Clock,
            label: "Office Hours",
            value: "Mon-Fri: 9AM-6PM NPT",
            link: null
        }
    ];

    const socialLinks = [
        { icon: Linkedin, label: "LinkedIn", link: "#" },
        { icon: Twitter, label: "Twitter", link: "#" },
        { icon: Github, label: "GitHub", link: "#" },
        { icon: Facebook, label: "Facebook", link: "#" }
    ];

    return (
        <div className="min-h-screen pt-20 pb-20 relative z-10">
            <div className="container mx-auto px-4 md:px-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-amber font-bold font-mono text-sm tracking-widest block mb-4"
                    >
                        {"SIGNAL"}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
                    >
                        INITIATE<br />CONNECTION
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/70 max-w-2xl mx-auto"
                    >
                        Ready to build something extraordinary? Let&apos;s connect and discuss how we can help bring your vision to life.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 mb-16">
                    {/* Contact Information Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        target={info.link.startsWith('http') ? '_blank' : undefined}
                                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="block p-4 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 hover:bg-white/10 transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                                                <info.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs text-muted-foreground font-mono mb-1">{info.label}</div>
                                                <div className="text-sm font-semibold text-foreground">{info.value}</div>
                                            </div>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                <info.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-xs text-muted-foreground font-mono mb-1">{info.label}</div>
                                                <div className="text-sm font-semibold text-foreground">{info.value}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {/* Social Media Links */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="pt-6"
                        >
                            <h3 className="text-sm font-bold text-white mb-4 font-mono tracking-widest">FOLLOW US</h3>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all group"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-white/70 group-hover:text-black transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 border border-white/10 rounded-xl p-8"
                        >
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-primary" />
                                        </div>
                                        <h3 className="text-3xl font-extrabold text-white mb-3">SIGNAL RECEIVED</h3>
                                        <p className="text-white/70 mb-6 max-w-md mx-auto">
                                            We&apos;ve received your message and will analyze your transmission. Expect a response within 24 hours.
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                        >
                                            Send Another Message
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        {status === "error" && errorMessage && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3"
                                            >
                                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                <p className="text-red-500 text-sm">{errorMessage}</p>
                                            </motion.div>
                                        )}

                                        {/* Name and Email Row */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-bold font-mono tracking-widest text-white mb-3 flex items-center gap-2">
                                                    <User className="w-4 h-4" />
                                                    IDENTITY *
                                                </label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                                    className={cn(
                                                        "w-full bg-card/30 border-b-2 py-4 px-4 text-white font-semibold placeholder:text-white/50 focus:outline-none focus:bg-card/50 transition-all rounded-t",
                                                        errors.name ? "border-red-500" : "border-white/30 focus:border-primary"
                                                    )}
                                                    placeholder="Your Name"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-xs mt-2">{errors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-bold font-mono tracking-widest text-white mb-3 flex items-center gap-2">
                                                    <Mail className="w-4 h-4" />
                                                    EMAIL *
                                                </label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    className={cn(
                                                        "w-full bg-card/30 border-b-2 py-4 px-4 text-white font-semibold placeholder:text-white/50 focus:outline-none focus:bg-card/50 transition-all rounded-t",
                                                        errors.email ? "border-red-500" : "border-white/30 focus:border-primary"
                                                    )}
                                                    placeholder="your@email.com"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500 text-xs mt-2">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Phone and Company Row */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-bold font-mono tracking-widest text-white mb-3 flex items-center gap-2">
                                                    <Phone className="w-4 h-4" />
                                                    PHONE
                                                </label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                    className={cn(
                                                        "w-full bg-card/30 border-b-2 py-4 px-4 text-white font-semibold placeholder:text-white/50 focus:outline-none focus:bg-card/50 transition-all rounded-t",
                                                        errors.phone ? "border-red-500" : "border-white/30 focus:border-primary"
                                                    )}
                                                    placeholder="+977 9840327185"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500 text-xs mt-2">{errors.phone}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="company" className="block text-sm font-bold font-mono tracking-widest text-white mb-3 flex items-center gap-2">
                                                    <Building2 className="w-4 h-4" />
                                                    COMPANY
                                                </label>
                                                <input
                                                    id="company"
                                                    name="company"
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={(e) => handleInputChange("company", e.target.value)}
                                                    className="w-full bg-card/30 border-b-2 border-white/30 py-4 px-4 text-white font-semibold placeholder:text-white/50 focus:outline-none focus:border-primary focus:bg-card/50 transition-all rounded-t"
                                                    placeholder="Your Organization"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject */}
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-bold font-mono tracking-widest text-white mb-3 flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                SUBJECT *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={(e) => handleInputChange("subject", e.target.value)}
                                                className="w-full bg-card/30 border-b-2 border-white/30 py-4 px-4 text-white font-semibold focus:outline-none focus:border-primary focus:bg-card/50 transition-all rounded-t"
                                            >
                                                {SUBJECTS.map(subject => (
                                                    <option key={subject} value={subject} className="bg-card text-white">
                                                        {subject}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-bold font-mono tracking-widest text-white mb-3 flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4" />
                                                MESSAGE *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) => handleInputChange("message", e.target.value)}
                                                className={cn(
                                                    "w-full bg-card/30 border-b-2 py-4 px-4 text-white font-semibold placeholder:text-white/50 focus:outline-none focus:bg-card/50 transition-all resize-none rounded-t",
                                                    errors.message ? "border-red-500" : "border-white/30 focus:border-primary"
                                                )}
                                                placeholder="Tell us about your project or inquiry..."
                                            />
                                            <div className="flex justify-between items-center mt-2">
                                                {errors.message && (
                                                    <p className="text-red-500 text-xs">{errors.message}</p>
                                                )}
                                                <p className="text-xs text-white/50 ml-auto">
                                                    {formData.message.length} characters
                                                </p>
                                            </div>
                                        </div>

                                        {/* Contact Preferences */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="contactMethod" className="block text-sm font-bold font-mono tracking-widest text-white mb-3">
                                                    PREFERRED CONTACT METHOD
                                                </label>
                                                <select
                                                    id="contactMethod"
                                                    name="contactMethod"
                                                    value={formData.contactMethod}
                                                    onChange={(e) => handleInputChange("contactMethod", e.target.value)}
                                                    className="w-full bg-card/30 border-b-2 border-white/30 py-4 px-4 text-white font-semibold focus:outline-none focus:border-primary focus:bg-card/50 transition-all rounded-t"
                                                >
                                                    {CONTACT_METHODS.map(method => (
                                                        <option key={method} value={method} className="bg-card text-white">
                                                            {method}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label htmlFor="contactTime" className="block text-sm font-bold font-mono tracking-widest text-white mb-3 flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    PREFERRED TIME
                                                </label>
                                                <select
                                                    id="contactTime"
                                                    name="contactTime"
                                                    value={formData.contactTime}
                                                    onChange={(e) => handleInputChange("contactTime", e.target.value)}
                                                    className="w-full bg-card/30 border-b-2 border-white/30 py-4 px-4 text-white font-semibold focus:outline-none focus:border-primary focus:bg-card/50 transition-all rounded-t"
                                                >
                                                    {CONTACT_TIMES.map(time => (
                                                        <option key={time} value={time} className="bg-card text-white">
                                                            {time}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* File Upload */}
                                        <div>
                                            <label className="block text-sm font-bold font-mono tracking-widest text-white mb-3 flex items-center gap-2">
                                                <Upload className="w-4 h-4" />
                                                ATTACHMENTS (Optional, Max 3 files, 5MB each)
                                            </label>
                                            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 hover:border-primary/50 transition-colors">
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    multiple
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                                                />
                                                <label
                                                    htmlFor="file-upload"
                                                    className="cursor-pointer flex flex-col items-center gap-2"
                                                >
                                                    <Upload className="w-8 h-8 text-white/50" />
                                                    <span className="text-sm text-white/70">Click to upload files</span>
                                                    <span className="text-xs text-white/50">PDF, DOC, TXT, JPG, PNG</span>
                                                </label>
                                            </div>

                                            {attachedFiles.length > 0 && (
                                                <div className="mt-4 space-y-2">
                                                    {attachedFiles.map((file, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <FileText className="w-4 h-4 text-primary" />
                                                                <span className="text-sm text-white">{file.name}</span>
                                                                <span className="text-xs text-white/50">
                                                                    ({(file.size / 1024).toFixed(1)} KB)
                                                                </span>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeFile(index)}
                                                                className="text-white/50 hover:text-red-500 transition-colors"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={status === "sending"}
                                            className="group w-full md:w-auto flex items-center justify-center gap-4 px-8 py-4 bg-primary text-black rounded-lg font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span>
                                                {status === "sending" ? "TRANSMITTING..." : "SEND SIGNAL"}
                                            </span>
                                            <div className="w-10 h-10 rounded-full border-2 border-black/20 flex items-center justify-center group-hover:border-black/40 transition-all">
                                                <Send className="w-5 h-5" />
                                            </div>
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
