export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    detailedDescription?: string;
    tech: string[];
    year?: number;
    client?: string;
    liveUrl?: string;
    githubUrl?: string;
    tags?: string[];
    stats?: {
        users?: string;
        revenue?: string;
        performance?: string;
    };
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Nepal Cooperative Core",
        category: "SaaS",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        description: "A comprehensive banking SaaS for cooperative societies in Nepal.",
        detailedDescription: "A specialized SaaS platform developed for small cooperative banks in Nepal to digitize their daily operations. It streamlines monthly savings collection, loan disbursement, interest calculation, and member ledger management, ensuring transparency and operational efficiency across the cooperative network.",
        tech: ["Next.js", "PostgreSQL", "Node.js", "Prisma", "TailwindCSS"],
        year: 2024,
        client: "Confidential Cooperative",
        tags: ["FinTech", "SaaS", "Banking", "Nepal"],
        stats: {
            users: "50+ Cooperatives",
            performance: "100% Digital Records"
        }
    }
];

export const CATEGORIES = ["All", "Web Development", "Mobile App", "AI & ML", "SaaS", "Web3"];
