"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/neural/SectionHeader";
import { Search, X, ChevronDown, ChevronUp, HelpCircle, MessageSquare, TrendingUp, Eye, ThumbsUp, Filter, Send, Mail } from "lucide-react";
import { FAQS, FAQ_CATEGORIES, getCategoryIcon, type FAQ } from "@/constants/faqs";
import { cn } from "@/lib/utils";

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
    const [helpfulFAQs, setHelpfulFAQs] = useState<Set<string>>(new Set());
    const [showContactForm, setShowContactForm] = useState(false);
    const [contactFormData, setContactFormData] = useState({
        name: "",
        email: "",
        question: ""
    });

    const filteredFAQs = useMemo(() => {
        return FAQS.filter(faq => {
            const matchesSearch = searchQuery === "" ||
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    // Hide all background elements on FAQ page
    // Hide all background elements on FAQ page
    useEffect(() => {
        document.body.classList.add("faq-page");

        return () => {
            document.body.classList.remove("faq-page");
        };
    }, []);

    const toggleFAQ = (id: string) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    const handleHelpful = (id: string) => {
        setHelpfulFAQs(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your question! We'll get back to you soon.");
        setContactFormData({ name: "", email: "", question: "" });
        setShowContactForm(false);
    };

    const stats = useMemo(() => {
        const totalViews = FAQS.reduce((sum, faq) => sum + faq.views, 0);
        const totalHelpful = FAQS.reduce((sum, faq) => sum + faq.helpful, 0);
        return { totalFAQs: FAQS.length, totalViews, totalHelpful };
    }, []);

    const getRelatedFAQs = (faq: FAQ) => {
        if (!faq.related) return [];
        return FAQS.filter(f => faq.related?.includes(f.id)).slice(0, 3);
    };

    return (
        <div className="min-h-screen pt-8 pb-16 relative z-10">
            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <SectionHeader
                    title="INDEX / FAQ"
                    subtitle="QUERY RESPONSE"
                    description="Direct answers to common signals. Search, filter, and explore our knowledge base."
                />

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-6">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                            <HelpCircle className="w-8 h-8 text-primary" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.totalFAQs}</div>
                                <div className="text-xs text-muted-foreground">Total FAQs</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Eye className="w-8 h-8 text-primary" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Total Views</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                            <ThumbsUp className="w-8 h-8 text-primary" />
                            <div>
                                <div className="text-2xl font-bold text-foreground">{stats.totalHelpful.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Helpful Votes</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mt-6 mb-8">
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search FAQs by question, answer, or tags..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 items-center">
                        <Filter className="w-4 h-4 text-muted-foreground" />
                        {FAQ_CATEGORIES.map(category => {
                            const Icon = category === "All" ? HelpCircle : getCategoryIcon(category);
                            return (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2",
                                        selectedCategory === category
                                            ? "bg-primary text-black"
                                            : "bg-white/5 text-foreground border border-white/10 hover:bg-white/10"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {category}
                                </button>
                            );
                        })}
                        <div className="ml-auto text-sm text-muted-foreground">
                            {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'}
                        </div>
                    </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {filteredFAQs.length === 0 ? (
                        <div className="text-center py-12">
                            <HelpCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground mb-4">No FAQs match your search criteria.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All");
                                }}
                                className="px-4 py-2 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        filteredFAQs.map((faq, index) => {
                            const isExpanded = expandedFAQ === faq.id;
                            const isHelpful = helpfulFAQs.has(faq.id);
                            const Icon = getCategoryIcon(faq.category);
                            const relatedFAQs = getRelatedFAQs(faq);

                            return (
                                <div
                                    id={`faq-${faq.id}`}
                                    key={faq.id}
                                    className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                                >
                                    {/* FAQ Header */}
                                    <button
                                        onClick={() => toggleFAQ(faq.id)}
                                        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-white/5 transition-colors"
                                    >
                                        <div className="flex-1 flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary font-medium">
                                                        {faq.category}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {faq.views} views
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-foreground mb-2">
                                                    {faq.question}
                                                </h3>
                                                {!isExpanded && (
                                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                                        {faq.answer}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {isExpanded ? (
                                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-6 pt-2 border-t border-white/10">
                                                    <div className="prose prose-invert max-w-none">
                                                        <p className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">
                                                            {faq.answer}
                                                        </p>

                                                        {/* Tags */}
                                                        {faq.tags.length > 0 && (
                                                            <div className="flex flex-wrap gap-2 mb-4">
                                                                {faq.tags.map((tag, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="px-2 py-1 rounded text-xs bg-white/5 text-muted-foreground border border-white/10"
                                                                    >
                                                                        #{tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Related FAQs */}
                                                        {relatedFAQs.length > 0 && (
                                                            <div className="mt-6 pt-4 border-t border-white/10">
                                                                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                                                    <TrendingUp className="w-4 h-4" />
                                                                    Related FAQs
                                                                </h4>
                                                                <div className="space-y-2">
                                                                    {relatedFAQs.map(related => (
                                                                        <button
                                                                            key={related.id}
                                                                            onClick={() => {
                                                                                setExpandedFAQ(null);
                                                                                setTimeout(() => {
                                                                                    setExpandedFAQ(related.id);
                                                                                    document.getElementById(`faq-${related.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                                                                                }, 100);
                                                                            }}
                                                                            className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
                                                                        >
                                                                            <div className="font-medium text-foreground">{related.question}</div>
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Actions */}
                                                        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleHelpful(faq.id);
                                                                }}
                                                                className={cn(
                                                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                                                    isHelpful
                                                                        ? "bg-primary/20 text-primary border border-primary/30"
                                                                        : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"
                                                                )}
                                                            >
                                                                <ThumbsUp className={cn("w-4 h-4", isHelpful && "fill-current")} />
                                                                {isHelpful ? "Helpful" : "Mark as Helpful"} ({faq.helpful})
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Contact Form Section */}
                <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl">
                    <div className="flex items-start gap-4">
                        <MessageSquare className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-2">Still have questions?</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Can't find what you're looking for? Send us your question and we'll get back to you within 24 hours.
                            </p>
                            {!showContactForm ? (
                                <button
                                    onClick={() => setShowContactForm(true)}
                                    className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    Ask a Question
                                </button>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onSubmit={handleContactSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={contactFormData.name}
                                            onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={contactFormData.email}
                                            onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-foreground mb-2">Your Question *</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={contactFormData.question}
                                            onChange={(e) => setContactFormData({ ...contactFormData, question: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                                            placeholder="What would you like to know?"
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowContactForm(false);
                                                setContactFormData({ name: "", email: "", question: "" });
                                            }}
                                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground rounded-lg transition-colors border border-white/10"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                                        >
                                            <Send className="w-4 h-4" />
                                            Send Question
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
