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
        title: "FinTech Dashboard",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        description: "Real-time financial analytics dashboard for a leading Nepal bank.",
        detailedDescription: "A comprehensive financial analytics platform that provides real-time insights into banking operations, customer behavior, and market trends. Features include interactive charts, predictive analytics, and automated reporting systems.",
        tech: ["Next.js", "TypeScript", "Recharts", "PostgreSQL", "Redis"],
        year: 2024,
        client: "Nepal Bank",
        liveUrl: "https://example.com",
        tags: ["Finance", "Analytics", "Dashboard"],
        stats: {
            users: "10K+",
            performance: "99.9% Uptime"
        }
    },
    {
        id: 2,
        title: "HealthCare AI",
        category: "AI & ML",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        description: "AI-powered diagnostic assistant for rural clinics.",
        detailedDescription: "An intelligent diagnostic system that helps healthcare professionals in remote areas make accurate diagnoses. Uses machine learning to analyze symptoms, medical history, and lab results to suggest potential conditions and treatment options.",
        tech: ["Python", "TensorFlow", "React", "FastAPI", "Docker"],
        year: 2024,
        client: "Rural Health Initiative",
        tags: ["Healthcare", "AI", "Diagnostics"],
        stats: {
            users: "500+ Clinics",
            performance: "92% Accuracy"
        }
    },
    {
        id: 3,
        title: "E-Commerce Superapp",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        description: "Multi-vendor marketplace app with 100k+ downloads.",
        detailedDescription: "A comprehensive e-commerce platform that combines shopping, payments, delivery tracking, and customer support in one seamless mobile experience. Supports multiple vendors, real-time inventory, and secure payment processing.",
        tech: ["React Native", "Node.js", "MongoDB", "Stripe", "AWS"],
        year: 2023,
        liveUrl: "https://example.com",
        tags: ["E-Commerce", "Marketplace", "Mobile"],
        stats: {
            users: "100K+ Downloads",
            revenue: "$2M+ GMV"
        }
    },
    {
        id: 4,
        title: "SaaS CRM Platform",
        category: "SaaS",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        description: "Customer relationship management tool for real estate agencies.",
        detailedDescription: "A cloud-based CRM solution designed specifically for real estate professionals. Features include lead management, property listings, automated follow-ups, document management, and analytics dashboards.",
        tech: ["Vue.js", "Laravel", "MySQL", "AWS S3", "Twilio"],
        year: 2023,
        client: "RealEstate Pro",
        liveUrl: "https://example.com",
        tags: ["CRM", "Real Estate", "SaaS"],
        stats: {
            users: "5K+ Agents",
            performance: "40% Conversion"
        }
    },
    {
        id: 5,
        title: "Corporate Portal",
        category: "Web Development",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        description: "Internal communication portal for a multinational conglomerate.",
        detailedDescription: "An enterprise-grade internal communication and collaboration platform. Includes employee directories, project management tools, document sharing, video conferencing integration, and company-wide announcements.",
        tech: ["Next.js", "PostgreSQL", "Tailwind", "WebRTC", "Redis"],
        year: 2024,
        client: "Global Corp",
        tags: ["Enterprise", "Internal Tools", "Collaboration"],
        stats: {
            users: "50K+ Employees",
            performance: "99.5% Uptime"
        }
    },
    {
        id: 6,
        title: "Crypto Exchange",
        category: "Web3",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
        description: "Secure and fast cryptocurrency exchange platform.",
        detailedDescription: "A decentralized cryptocurrency exchange with advanced security features, low latency trading, and support for multiple blockchain networks. Includes wallet integration, staking capabilities, and comprehensive trading analytics.",
        tech: ["Solidity", "React", "Web3.js", "Ethereum", "IPFS"],
        year: 2024,
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
        tags: ["Blockchain", "DeFi", "Crypto"],
        stats: {
            users: "25K+ Traders",
            performance: "<100ms Latency"
        }
    },
    {
        id: 7,
        title: "AI Content Generator",
        category: "AI & ML",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        description: "Advanced AI-powered content creation platform.",
        detailedDescription: "An intelligent content generation system that creates high-quality articles, blog posts, and marketing copy using advanced language models. Features include tone adjustment, SEO optimization, and multi-language support.",
        tech: ["Python", "OpenAI API", "Next.js", "PostgreSQL"],
        year: 2024,
        tags: ["AI", "Content", "NLP"],
        stats: {
            users: "2K+ Writers",
            performance: "10M+ Words Generated"
        }
    },
    {
        id: 8,
        title: "Fitness Tracking App",
        category: "Mobile App",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
        description: "Comprehensive fitness and health tracking mobile application.",
        detailedDescription: "A feature-rich fitness app that tracks workouts, nutrition, sleep, and health metrics. Includes social features, workout plans, progress analytics, and integration with wearable devices.",
        tech: ["React Native", "Node.js", "MongoDB", "Firebase"],
        year: 2023,
        tags: ["Health", "Fitness", "Mobile"],
        stats: {
            users: "50K+ Active Users",
            performance: "4.8★ Rating"
        }
    },
    {
        id: 9,
        title: "Cloud Infrastructure",
        category: "SaaS",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        description: "Scalable cloud infrastructure management platform.",
        detailedDescription: "A comprehensive cloud management solution that helps businesses deploy, monitor, and scale their infrastructure. Features include automated scaling, cost optimization, security monitoring, and multi-cloud support.",
        tech: ["Kubernetes", "Docker", "Terraform", "AWS", "React"],
        year: 2024,
        tags: ["DevOps", "Cloud", "Infrastructure"],
        stats: {
            users: "500+ Companies",
            performance: "50% Cost Reduction"
        }
    }
];

export const CATEGORIES = ["All", "Web Development", "Mobile App", "AI & ML", "SaaS", "Web3"];
