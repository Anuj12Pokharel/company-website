import { Terminal, Cpu, Globe, Zap, Layers } from "lucide-react";

export const COMPANY_INFO = {
    name: "Codex Neural",
    tagline: "Systems, Not Just Software.",
    description: "A distributed collective of systems engineers and designers. We build durable, high-integrity digital infrastructure for long-term value, not short-term hype.",
    founded: "2023",
    location: "Distributed | HQ: Kathmandu",
    stats: [
        { label: "Engineering Nodes", value: "12" },
        { label: "Core Systems", value: "50+" },
        { label: "Retention Rate", value: "100%" },
        { label: "Deployment Zones", value: "Global" },
    ]
};

export const SERVICES_DETAILED = [
    {
        id: "website-dev",
        title: "Website Development",
        short: "Web Solutions",
        desc: "Highly functional & visually appealing website designed to meet your need.",
        detailedDesc: "We create modern, responsive websites that not only look stunning but also perform exceptionally. Our web development services include custom website design, e-commerce solutions, content management systems, and web applications. We use the latest technologies and best practices to ensure your website is fast, secure, and optimized for search engines.",
        icon: Terminal,
        features: ["Responsive Design", "SEO Optimized", "Fast Performance", "Mobile-First Approach", "Custom Functionality", "Content Management"],
        category: "technical"
    },
    {
        id: "app-dev",
        title: "App Development",
        short: "Mobile Apps",
        desc: "Innovative and user-friendly mobile application designed to engage users.",
        detailedDesc: "Transform your ideas into powerful mobile applications. We develop native and cross-platform mobile apps for iOS and Android that deliver exceptional user experiences. From concept to deployment, we handle every aspect of app development including UI/UX design, backend integration, testing, and app store submission.",
        icon: Cpu,
        features: ["iOS & Android", "Cross-Platform", "Native Performance", "App Store Optimization", "Push Notifications", "Offline Capabilities"],
        category: "technical"
    },
    {
        id: "system-software",
        title: "System/Software Development",
        short: "Custom Software",
        desc: "System/software developed according to your business needs.",
        detailedDesc: "Build custom software solutions tailored to your specific business requirements. We develop enterprise-grade applications, APIs, microservices, and system integrations that streamline your operations and drive efficiency. Our solutions are scalable, maintainable, and built with security as a top priority.",
        icon: Terminal,
        features: ["Custom Solutions", "Scalable Architecture", "Enterprise Grade", "API Development", "System Integration", "Cloud Deployment"],
        category: "technical"
    },
    {
        id: "ui-ux",
        title: "UI/UX",
        short: "Design",
        desc: "Design eye-catching UI/UX interfaces for effortless user interaction",
        detailedDesc: "Create intuitive and engaging user experiences that delight your customers. Our UI/UX design process involves thorough user research, information architecture, wireframing, prototyping, and usability testing. We design interfaces that are not only beautiful but also functional, accessible, and conversion-optimized.",
        icon: Layers,
        features: ["User Research", "Wireframing", "Prototyping", "User Testing", "Design Systems", "Accessibility"],
        category: "design"
    },
    {
        id: "seo",
        title: "Search Engine Optimization (SEO)",
        short: "SEO",
        desc: "Custom SEO solutions for enhanced search engine visibility and growth",
        detailedDesc: "Improve your search engine rankings and drive organic traffic to your website. Our SEO services include comprehensive keyword research, on-page optimization, technical SEO audits, link building strategies, and content optimization. We use data-driven approaches to improve your visibility and achieve sustainable growth in search results.",
        icon: Zap,
        features: ["Keyword Research", "On-Page SEO", "Link Building", "Technical SEO", "Content Optimization", "Analytics & Reporting"],
        category: "business"
    },
    {
        id: "smm",
        title: "Social Media Marketing (SMM)",
        short: "Social Media",
        desc: "Build a strong online presence and engage with your targeted audience",
        detailedDesc: "Grow your brand presence across social media platforms with strategic content and engagement. We develop comprehensive social media strategies, create engaging content, manage your social accounts, run targeted ad campaigns, and analyze performance metrics. Our goal is to build a loyal community and drive meaningful engagement with your audience.",
        icon: Globe,
        features: ["Content Strategy", "Community Management", "Analytics", "Paid Advertising", "Influencer Partnerships", "Crisis Management"],
        category: "business"
    },
    {
        id: "graphic-design",
        title: "Graphic Design",
        short: "Graphics",
        desc: "Designs that Speak Your Brand's Narrative and Connect with Your Audience",
        detailedDesc: "Create compelling visual identities and marketing materials that communicate your brand's story effectively. Our graphic design services include logo design, brand identity development, marketing collateral, digital graphics, and print design. We ensure consistency across all touchpoints to strengthen your brand recognition.",
        icon: Layers,
        features: ["Brand Identity", "Marketing Materials", "Digital Assets", "Logo Design", "Print Design", "Brand Guidelines"],
        category: "design"
    },
    {
        id: "content-writing",
        title: "Content Writing",
        short: "Content",
        desc: "Engaging and meaningful content to connect with your audience",
        detailedDesc: "Produce high-quality content that resonates with your audience and drives action. Our content writing services cover blog posts, website copy, social media content, technical documentation, email campaigns, and more. We craft content that is not only engaging but also optimized for search engines and aligned with your brand voice.",
        icon: Terminal,
        features: ["Blog Posts", "Copywriting", "Technical Writing", "SEO Content", "Email Marketing", "Content Strategy"],
        category: "business"
    }
];

export interface ProcessStep {
    step: string;
    title: string;
    desc: string;
    image?: string;
    detailedDesc?: string;
    deliverables?: string[];
    duration?: string;
    tools?: string[];
    icon?: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
    {
        step: "01",
        title: "Signal Detection",
        desc: "Discovery. We analyze your problem space, map constraints, and identify the core technical challenge.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        detailedDesc: "In this initial phase, we conduct comprehensive discovery sessions to understand your business objectives, technical requirements, and constraints. We perform stakeholder interviews, technical audits, competitive analysis, and risk assessment to build a complete picture of the challenge ahead.",
        deliverables: [
            "Requirements Documentation",
            "Technical Architecture Proposal",
            "Risk Assessment Report",
            "Project Timeline & Budget"
        ],
        duration: "1-2 Weeks",
        tools: ["Figma", "Miro", "Jira", "Confluence"],
        icon: "🔍"
    },
    {
        step: "02",
        title: "System Formation",
        desc: "Synthesis. We architect a Proof of Concept (POC) to validate technical and business logic before scaling.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        detailedDesc: "We transform insights into actionable architecture. Our team designs and develops a working prototype that validates core assumptions, demonstrates technical feasibility, and provides early user feedback. This phase includes iterative development, testing, and refinement.",
        deliverables: [
            "Working Prototype",
            "Technical Documentation",
            "User Testing Results",
            "Performance Benchmarks"
        ],
        duration: "2-4 Weeks",
        tools: ["React", "Node.js", "PostgreSQL", "Docker"],
        icon: "⚙️"
    },
    {
        step: "03",
        title: "Stabilization & Scale",
        desc: "Evolution. We harden the MVP into a production-grade system, implementing monitoring, security, and automated scaling.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
        detailedDesc: "The final phase focuses on production readiness. We implement comprehensive security measures, set up monitoring and analytics, optimize performance, and establish CI/CD pipelines. The system is deployed with full documentation, training, and ongoing support infrastructure.",
        deliverables: [
            "Production-Ready System",
            "Deployment Documentation",
            "Monitoring Dashboard",
            "Team Training Materials"
        ],
        duration: "4-8 Weeks",
        tools: ["AWS", "Kubernetes", "GitHub Actions", "Datadog"],
        icon: "🚀"
    }
];

export const TESTIMONIALS = [
    {
        id: 1,
        name: "Client",
        role: "CTO, FinTech Global",
        text: "They refused to build what we asked for. Instead, they built what we actually needed. One year later, that decision saved us millions."
    },
    {
        id: 2,
        name: "Client",
        role: "Founder, ArtStream",
        text: "Zero ego. Pure engineering. The system they designed handles our 10x growth without a single hiccup."
    },
    {
        id: 3,
        name: "Client",
        role: "Director, NexaCorp",
        text: "Most agencies sell you hours. Codex Neural solves problems. Their approach to technical debt is refreshing."
    }
];

export const CLIENTS = [
    { name: "TechFlow", logo: "TF" },
    { name: "Nebula", logo: "NB" },
    { name: "Quant", logo: "QT" },
    { name: "Vertex", logo: "VX" },
    { name: "Orbit", logo: "OB" },
    { name: "Horizon", logo: "HZ" },
];

export const TEAM = [
    { name: "Aman Yadav", role: "System Architect", image: "/team/1.jpg" },
    { name: "Manohar Singh", role: "Interface Engineer", image: "/team/2.jpg" },
    { name: "Aman Yadav", role: "Backend Specialist", image: "/team/3.jpg" },
];
