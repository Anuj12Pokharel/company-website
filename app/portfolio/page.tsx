"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, CATEGORIES, type Project } from "@/constants/projects";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Search, X, ExternalLink, Github, Calendar, Users, TrendingUp, Filter, Grid, List } from "lucide-react";
import { useEngagement } from "@/context/EngagementContext";

type SortOption = "newest" | "oldest" | "name";

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("newest");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const { primaryIntent } = useEngagement();

    // Categorize intent to Portfolio categories
    const intentToCategory: Record<string, string> = {
        'technical': 'Web3',
        'design': 'AI & ML',
        'business': 'SaaS',
    };

    const recommendedCategory = primaryIntent ? intentToCategory[primaryIntent] : null;

    const filteredAndSortedProjects = useMemo(() => {
        const filtered = PROJECTS.filter(project => {
            const matchesCategory = activeCategory === "All" || project.category === activeCategory;
            const matchesSearch = searchQuery === "" ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });

        // Sort projects
        filtered.sort((a, b) => {
            if (sortBy === "newest") {
                return (b.year || 0) - (a.year || 0);
            } else if (sortBy === "oldest") {
                return (a.year || 0) - (b.year || 0);
            } else {
                return a.title.localeCompare(b.title);
            }
        });

        // Bubble recommended category to top if applicable
        if (recommendedCategory) {
            filtered.sort((a, b) => {
                if (a.category === recommendedCategory && b.category !== recommendedCategory) return -1;
                if (a.category !== recommendedCategory && b.category === recommendedCategory) return 1;
                return 0;
            });
        }

        return filtered;
    }, [activeCategory, searchQuery, sortBy, recommendedCategory]);

    // Close modal on ESC
    useEffect(() => {
        if (!selectedProject) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedProject(null);
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    return (
        <>
            <div className="min-h-screen pt-12 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-secondary mb-4">
                            Our Work
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            A showcase of technical excellence and creative problem-solving. Explore how we turn complex challenges into elegant digital solutions.
                        </p>
                    </div>

                    {/* Search and Controls */}
                    <div className="mb-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search projects..."
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

                        {/* Sort and View Controls */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="name">Name A-Z</option>
                                </select>
                            </div>
                            <div className="flex gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={cn(
                                        "p-2 rounded transition-colors",
                                        viewMode === "grid" ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={cn(
                                        "p-2 rounded transition-colors",
                                        viewMode === "list" ? "bg-primary text-black" : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all border",
                                    activeCategory === cat
                                        ? "bg-primary text-white border-primary shadow-[0_0_15px_var(--primary)]"
                                        : "bg-white/5 text-muted-foreground border-white/10 hover:border-white/20 hover:bg-white/10"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-center text-muted-foreground text-sm">
                        Showing {filteredAndSortedProjects.length} of {PROJECTS.length} projects
                    </div>

                    {/* Grid/List View */}
                    {viewMode === "grid" ? (
                        <motion.div
                            layout
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredAndSortedProjects.map((project) => (
                                    <motion.div
                                        layout
                                        key={project.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="group relative rounded-xl overflow-hidden bg-card border border-white/5 hover:border-primary/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        {/* Image */}
                                        <div className="aspect-video bg-card group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                                                <div className="px-6 py-3 rounded-full bg-primary text-black font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                    View Details <ArrowUpRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                            {project.year && (
                                                <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs text-white font-medium flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {project.year}
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex-1">
                                                    <span className="text-xs text-primary font-medium tracking-wider uppercase mb-1 block">
                                                        {project.category}
                                                    </span>
                                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                                                        {project.title}
                                                    </h3>
                                                    {project.client && (
                                                        <p className="text-xs text-muted-foreground">Client: {project.client}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tech.slice(0, 3).map(tech => (
                                                    <span key={tech} className="px-2 py-1 rounded text-xs bg-white/5 text-muted-foreground border border-white/5">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 3 && (
                                                    <span className="px-2 py-1 rounded text-xs bg-white/5 text-muted-foreground border border-white/5">
                                                        +{project.tech.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                            {project.stats && (
                                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                                    {project.stats.users && (
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                            <Users className="w-3 h-3" />
                                                            {project.stats.users}
                                                        </div>
                                                    )}
                                                    {project.stats.performance && (
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                            <TrendingUp className="w-3 h-3" />
                                                            {project.stats.performance}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence>
                                {filteredAndSortedProjects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="group bg-card border border-white/5 hover:border-primary/50 rounded-xl overflow-hidden transition-colors cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 p-6">
                                            <div className="md:w-64 h-48 rounded-lg overflow-hidden relative flex-shrink-0">
                                                <Image
                                                    src={project.image}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <span className="text-xs text-primary font-medium tracking-wider uppercase mb-1 block">
                                                            {project.category}
                                                        </span>
                                                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                                                            {project.title}
                                                        </h3>
                                                        {project.client && (
                                                            <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                                                        )}
                                                    </div>
                                                    {project.year && (
                                                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                            <Calendar className="w-4 h-4" />
                                                            {project.year}
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-muted-foreground mb-4">{project.description}</p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {project.tech.map(tech => (
                                                        <span key={tech} className="px-3 py-1 rounded text-xs bg-white/5 text-muted-foreground border border-white/5">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                                {project.stats && (
                                                    <div className="flex gap-6 pt-4 border-t border-white/10">
                                                        {project.stats.users && (
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Users className="w-4 h-4" />
                                                                {project.stats.users}
                                                            </div>
                                                        )}
                                                        {project.stats.performance && (
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <TrendingUp className="w-4 h-4" />
                                                                {project.stats.performance}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                    {filteredAndSortedProjects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setActiveCategory("All");
                                }}
                                className="mt-4 px-6 py-2 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-5xl bg-gradient-to-br from-card via-card/95 to-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-colors border border-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Hero Image */}
                                <div className="relative h-64 md:h-96 overflow-hidden">
                                    <Image
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <span className="text-xs text-primary font-medium tracking-wider uppercase mb-2 block">
                                            {selectedProject.category}
                                        </span>
                                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                                            {selectedProject.title}
                                        </h2>
                                        {selectedProject.client && (
                                            <p className="text-muted-foreground">Client: {selectedProject.client}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    {/* Stats */}
                                    {selectedProject.stats && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                            {selectedProject.stats.users && (
                                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                    <Users className="w-5 h-5 text-primary mb-2" />
                                                    <p className="text-xs text-muted-foreground mb-1">Users</p>
                                                    <p className="text-lg font-bold text-foreground">{selectedProject.stats.users}</p>
                                                </div>
                                            )}
                                            {selectedProject.stats.performance && (
                                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                    <TrendingUp className="w-5 h-5 text-primary mb-2" />
                                                    <p className="text-xs text-muted-foreground mb-1">Performance</p>
                                                    <p className="text-lg font-bold text-foreground">{selectedProject.stats.performance}</p>
                                                </div>
                                            )}
                                            {selectedProject.year && (
                                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                    <Calendar className="w-5 h-5 text-primary mb-2" />
                                                    <p className="text-xs text-muted-foreground mb-1">Year</p>
                                                    <p className="text-lg font-bold text-foreground">{selectedProject.year}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Description */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-foreground mb-4">Overview</h3>
                                        <p className="text-muted-foreground leading-relaxed text-base">
                                            {selectedProject.detailedDescription || selectedProject.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-foreground mb-4">Technology Stack</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedProject.tech.map(tech => (
                                                <span key={tech} className="px-4 py-2 rounded-lg text-sm bg-primary/20 text-primary border border-primary/30 font-medium">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {selectedProject.tags && selectedProject.tags.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-xl font-bold text-foreground mb-4">Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.tags.map(tag => (
                                                    <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/10">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Links */}
                                    <div className="flex flex-wrap gap-4 pt-8 border-t border-white/10">
                                        {selectedProject.liveUrl && (
                                            <a
                                                href={selectedProject.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                View Live Project
                                            </a>
                                        )}
                                        {selectedProject.githubUrl && (
                                            <a
                                                href={selectedProject.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground rounded-lg font-semibold transition-colors border border-white/10"
                                            >
                                                <Github className="w-4 h-4" />
                                                View Code
                                            </a>
                                        )}
                                        <a
                                            href="/contact"
                                            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-foreground rounded-lg font-semibold transition-colors border border-white/10"
                                        >
                                            Get Similar Project
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
