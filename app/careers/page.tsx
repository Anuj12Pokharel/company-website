"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/ui/neural/SectionHeader";
import { ArrowUpRight, Search, X, MapPin, Clock, DollarSign, Briefcase, Filter, CheckCircle2, Users, Zap, Shield, TrendingUp, Calendar, Send } from "lucide-react";
import { JOBS, DEPARTMENTS, JOB_TYPES, LOCATIONS, type Job } from "@/constants/jobs";
import { cn } from "@/lib/utils";

export default function CareersPage() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [showApplicationForm, setShowApplicationForm] = useState(false);

    const filteredJobs = useMemo(() => {
        return JOBS.filter(job => {
            const matchesSearch = searchQuery === "" ||
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesDepartment = selectedDepartment === "All" || job.department === selectedDepartment;
            const matchesType = selectedType === "All" || job.type === selectedType;
            const matchesLocation = selectedLocation === "All" || job.location === selectedLocation;
            const isOpen = job.status === "Open";

            return matchesSearch && matchesDepartment && matchesType && matchesLocation && isOpen;
        });
    }, [searchQuery, selectedDepartment, selectedType, selectedLocation]);

    const openJobDetails = (job: Job) => {
        setSelectedJob(job);
        setShowApplicationForm(false);
    };

    const openApplicationForm = () => {
        setShowApplicationForm(true);
    };


    return (
        <>
            <div className="min-h-screen pt-8 pb-16 careers-page-content relative z-10">
                <div className="container mx-auto px-4 md:px-12 relative z-10">
                    <SectionHeader
                        title="JOIN THE NETWORK"
                        subtitle="NODE ADMITTANCE"
                        description="We are a remote-first distributed collective. We do not offer ping-pong tables or free snacks. We offer autonomy, complex problems, and the ability to work from anywhere in the world."
                    />

                    {/* Search and Filters */}
                    <div className="mt-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative mb-4">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search jobs by title, skills, or keywords..."
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

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-3">
                            {/* Department Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <select
                                    value={selectedDepartment}
                                    onChange={(e) => setSelectedDepartment(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                                >
                                    {DEPARTMENTS.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                            >
                                {JOB_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>

                            {/* Location Filter */}
                            <select
                                value={selectedLocation}
                                onChange={(e) => setSelectedLocation(e.target.value)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-foreground text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                            >
                                {LOCATIONS.map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>

                            {/* Results Count */}
                            <div className="ml-auto flex items-center text-sm text-muted-foreground">
                                {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} available
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Job Listings */}
                        <div className="md:col-span-2 space-y-4">
                            {filteredJobs.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground mb-4">No positions match your criteria.</p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedDepartment("All");
                                            setSelectedType("All");
                                            setSelectedLocation("All");
                                        }}
                                        className="px-4 py-2 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                filteredJobs.map((job) => (
                                    <motion.div
                                        key={job.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-primary/50 hover:bg-white/10 transition-all cursor-pointer group"
                                        onClick={() => openJobDetails(job)}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                    {job.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <Briefcase className="w-4 h-4" />
                                                        {job.department}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {job.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {job.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {job.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {job.skills.slice(0, 4).map((skill, i) => (
                                                <span key={i} className="px-2 py-1 rounded text-xs bg-white/5 text-muted-foreground border border-white/10">
                                                    {skill}
                                                </span>
                                            ))}
                                            {job.skills.length > 4 && (
                                                <span className="px-2 py-1 rounded text-xs bg-white/5 text-muted-foreground border border-white/10">
                                                    +{job.skills.length - 4}
                                                </span>
                                            )}
                                        </div>
                                        {job.salary && (
                                            <div className="flex items-center gap-1 text-sm text-primary font-semibold">
                                                <DollarSign className="w-4 h-4" />
                                                {job.salary}
                                            </div>
                                        )}
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Sidebar - Culture & Benefits */}
                        <div className="space-y-6">
                            {/* Operating Principles */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-xl font-bold text-foreground mb-4 border-b border-white/10 pb-3">OPERATING PRINCIPLES</h3>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Autonomy", desc: "You are the CEO of your domain. We value output, not hours.", icon: Users },
                                        { title: "Deep Work", desc: "We protect your focus. Async communication is the default.", icon: Zap },
                                        { title: "Mastery", desc: "We solve hard problems. If you want easy wins, this is not for you.", icon: TrendingUp }
                                    ].map((item, i) => (
                                        <li key={i} className="group">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                                                    <item.icon className="w-4 h-4 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="text-primary font-bold font-mono text-sm mb-1">{item.title}</h4>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Benefits */}
                            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                                <h3 className="text-xl font-bold text-foreground mb-4 border-b border-white/10 pb-3">BENEFITS</h3>
                                <ul className="space-y-2">
                                    {[
                                        "Remote work flexibility",
                                        "Competitive compensation",
                                        "Health & dental insurance",
                                        "Professional development",
                                        "Unlimited PTO",
                                        "Equipment stipend",
                                        "Learning budget"
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* General Application */}
                            <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-xl">
                                <Shield className="w-6 h-6 text-primary mb-3" />
                                <h4 className="text-sm font-bold text-foreground mb-2">Don't see your role?</h4>
                                <p className="text-xs text-muted-foreground mb-4">
                                    We're always looking for exceptional talent. Send us your profile.
                                </p>
                                <a
                                    href="mailto:network@codexneural.com"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                                >
                                    Contact Us <Send className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job Detail Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedJob(null)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-4xl bg-gradient-to-br from-card via-card/95 to-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors border border-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Header */}
                                <div className="p-8 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <span className="text-xs text-primary font-medium tracking-wider uppercase mb-2 block">
                                                {selectedJob.department}
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                                                {selectedJob.title}
                                            </h2>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    {selectedJob.location}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {selectedJob.type}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Briefcase className="w-4 h-4" />
                                                    {selectedJob.experience}
                                                </span>
                                                {selectedJob.salary && (
                                                    <span className="flex items-center gap-1 text-primary font-semibold">
                                                        <DollarSign className="w-4 h-4" />
                                                        {selectedJob.salary}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 overflow-y-auto max-h-[60vh]">
                                    {/* Description */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-foreground mb-3">Job Description</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedJob.description}
                                        </p>
                                    </div>

                                    {/* Responsibilities */}
                                    {selectedJob.responsibilities.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-foreground mb-3">Key Responsibilities</h3>
                                            <ul className="space-y-2">
                                                {selectedJob.responsibilities.map((resp, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                        <span>{resp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Requirements */}
                                    {selectedJob.requirements.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-foreground mb-3">Requirements</h3>
                                            <ul className="space-y-2">
                                                {selectedJob.requirements.map((req, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Skills */}
                                    {selectedJob.skills.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-foreground mb-3">Required Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedJob.skills.map((skill, idx) => (
                                                    <span key={idx} className="px-3 py-1.5 rounded-lg text-sm bg-primary/20 text-primary border border-primary/30 font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Benefits */}
                                    {selectedJob.benefits.length > 0 && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-foreground mb-3">Benefits</h3>
                                            <div className="grid md:grid-cols-2 gap-2">
                                                {selectedJob.benefits.map((benefit, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                                                        <span>{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Posted Date */}
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-white/10">
                                        <Calendar className="w-4 h-4" />
                                        <span>Posted: {new Date(selectedJob.postedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="p-8 border-t border-white/10 bg-gradient-to-r from-transparent to-primary/5">
                                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                                        <button
                                            onClick={() => setSelectedJob(null)}
                                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground rounded-lg transition-colors border border-white/10"
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={openApplicationForm}
                                            className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Apply Now <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Application Form Modal */}
            <AnimatePresence>
                {showApplicationForm && selectedJob && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowApplicationForm(false)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-2xl bg-gradient-to-br from-card via-card/95 to-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
                            >
                                <button
                                    onClick={() => setShowApplicationForm(false)}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors border border-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Apply for {selectedJob.title}</h2>
                                    <p className="text-sm text-muted-foreground mb-6">Fill out the form below and we'll get back to you soon.</p>

                                    <form className="space-y-4" onSubmit={(e) => {
                                        e.preventDefault();
                                        alert("Application submitted! We'll contact you soon.");
                                        setShowApplicationForm(false);
                                        setSelectedJob(null);
                                    }}>
                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-2">LinkedIn Profile</label>
                                            <input
                                                type="url"
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                                placeholder="https://linkedin.com/in/johndoe"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-2">Cover Letter *</label>
                                            <textarea
                                                required
                                                rows={4}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                                                placeholder="Tell us why you're interested in this position..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-foreground mb-2">Resume/CV *</label>
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-primary/90"
                                            />
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowApplicationForm(false)}
                                                className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground rounded-lg transition-colors border border-white/10"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                                            >
                                                Submit Application <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
