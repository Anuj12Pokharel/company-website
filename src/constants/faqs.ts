import { HelpCircle, Code, Users, DollarSign, Clock, Shield, Zap, Globe, FileText, Settings } from "lucide-react";

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: "General" | "Services" | "Pricing" | "Technical" | "Company" | "Support";
    tags: string[];
    helpful: number;
    views: number;
    related?: string[];
}

export const FAQ_CATEGORIES = ["All", "General", "Services", "Pricing", "Technical", "Company", "Support"];

export const FAQS: FAQ[] = [
    {
        id: "1",
        question: "How large is the team?",
        answer: "We are a lean collective of ~12 senior engineers. We simulate the output of a 50-person agency by removing middle management and bureaucratic latency. Our distributed model allows us to work asynchronously across time zones, ensuring 24/7 coverage for critical systems.",
        category: "Company",
        tags: ["team", "size", "structure"],
        helpful: 124,
        views: 856,
        related: ["2", "3"]
    },
    {
        id: "2",
        question: "What is your stack philosophy?",
        answer: "We are not dogmatic, but we are opinionated. We prefer TypeScript for safety, Rust for performance, and simple modular architectures over complex monoliths. Our philosophy centers on: (1) Type safety over runtime errors, (2) Performance by default, (3) Modularity over monoliths, (4) Developer experience as a first-class concern. We choose tools that amplify human capability, not replace it.",
        category: "Technical",
        tags: ["technology", "stack", "philosophy", "typescript", "rust"],
        helpful: 98,
        views: 723,
        related: ["1", "4"]
    },
    {
        id: "3",
        question: "Do you hire juniors?",
        answer: "Rarely. Our model relies on high-autonomy individuals who can manage entire subsystems. We do, however, mentor exceptional talent who demonstrate unusual velocity. If you can ship production-grade code independently and communicate clearly, we're interested regardless of years of experience.",
        category: "Company",
        tags: ["hiring", "juniors", "careers"],
        helpful: 156,
        views: 1024,
        related: ["1", "5"]
    },
    {
        id: "4",
        question: "Is this a full-time role?",
        answer: "We operate on a project-based retainer model for clients, and a mix of full-time and contract nodes for our network. This allows flexibility for deep work. Full-time nodes receive equity, benefits, and long-term project ownership. Contract nodes work on specific deliverables with clear scope and timeline.",
        category: "General",
        tags: ["employment", "full-time", "contract"],
        helpful: 87,
        views: 645,
        related: ["3", "6"]
    },
    {
        id: "5",
        question: "Where is the office?",
        answer: "The network is distributed. We have a physical HQ/Server Room in Kathmandu for hardware operations, but our intellect is global. Our team spans multiple continents and time zones. We meet in person quarterly for strategic planning and team building, but day-to-day operations are fully remote.",
        category: "Company",
        tags: ["location", "remote", "office"],
        helpful: 112,
        views: 789,
        related: ["1", "4"]
    },
    {
        id: "6",
        question: "What services do you offer?",
        answer: "We specialize in: (1) Enterprise Web Development - Scalable applications built with modern frameworks, (2) AI/ML Solutions - Custom models, data pipelines, and intelligent automation, (3) Cloud Infrastructure - Architecture, migration, and DevOps, (4) Blockchain Development - Smart contracts, DeFi protocols, and Web3 applications, (5) System Architecture - Design and implementation of distributed systems. Each service is delivered by senior engineers with domain expertise.",
        category: "Services",
        tags: ["services", "web development", "AI", "cloud", "blockchain"],
        helpful: 203,
        views: 1456,
        related: ["7", "8", "9"]
    },
    {
        id: "7",
        question: "How do you handle project pricing?",
        answer: "We use a transparent pricing model: (1) Fixed-price for well-defined scopes, (2) Retainer for ongoing work, (3) Time-and-materials for exploratory projects. All pricing is discussed upfront with no hidden fees. We provide detailed estimates and work in sprints with regular checkpoints. Payment terms are flexible and can be structured monthly, milestone-based, or project-completion.",
        category: "Pricing",
        tags: ["pricing", "cost", "payment"],
        helpful: 178,
        views: 1123,
        related: ["6", "10"]
    },
    {
        id: "8",
        question: "What technologies do you specialize in?",
        answer: "Our core stack includes: Frontend - React, Next.js, TypeScript, WebGL/Three.js; Backend - Node.js, Python, Rust, Go; Databases - PostgreSQL, MongoDB, Redis; Cloud - AWS, Azure, GCP; DevOps - Docker, Kubernetes, Terraform; AI/ML - TensorFlow, PyTorch, LangChain; Blockchain - Solidity, Web3.js, Hardhat. We're always evaluating new tools and adopt them when they provide clear advantages.",
        category: "Technical",
        tags: ["technologies", "stack", "tools", "frameworks"],
        helpful: 145,
        views: 987,
        related: ["2", "6"]
    },
    {
        id: "9",
        question: "How long does a typical project take?",
        answer: "Project timelines vary based on scope: MVP development typically takes 6-12 weeks, Full-scale applications range from 3-6 months, Enterprise systems can take 6-12 months with iterative delivery. We break projects into phases and deliver working software early and often. We provide detailed timelines during the discovery phase and update them transparently as requirements evolve.",
        category: "Services",
        tags: ["timeline", "duration", "project"],
        helpful: 134,
        views: 876,
        related: ["6", "7"]
    },
    {
        id: "10",
        question: "Do you provide ongoing support and maintenance?",
        answer: "Yes. We offer three tiers: (1) Essential - Bug fixes and critical updates, (2) Standard - Regular updates, security patches, and performance monitoring, (3) Premium - Feature enhancements, 24/7 support, and dedicated engineering time. All projects include a 90-day warranty period. We also offer retainer agreements for long-term partnerships.",
        category: "Support",
        tags: ["support", "maintenance", "updates"],
        helpful: 167,
        views: 1034,
        related: ["6", "7"]
    },
    {
        id: "11",
        question: "What is your development process?",
        answer: "We follow an agile, async-first process: (1) Discovery - Deep dive into requirements and constraints, (2) Architecture - System design and technical specification, (3) Development - Iterative sprints with regular demos, (4) Testing - Automated testing at every level, (5) Deployment - CI/CD pipelines with zero-downtime releases, (6) Monitoring - Real-time observability and performance tracking. We communicate asynchronously by default, with sync meetings only when necessary.",
        category: "General",
        tags: ["process", "development", "methodology"],
        helpful: 189,
        views: 1234,
        related: ["2", "6"]
    },
    {
        id: "12",
        question: "How do you ensure code quality?",
        answer: "Quality is non-negotiable: (1) Code reviews by at least two senior engineers, (2) Automated testing - unit, integration, and E2E tests, (3) Static analysis and linting, (4) Type safety with TypeScript, (5) Documentation for all public APIs, (6) Performance benchmarking, (7) Security audits for sensitive systems. We maintain high test coverage and use tools like ESLint, Prettier, and SonarQube.",
        category: "Technical",
        tags: ["quality", "testing", "code review"],
        helpful: 156,
        views: 945,
        related: ["2", "8"]
    },
    {
        id: "13",
        question: "Can you work with our existing team?",
        answer: "Absolutely. We excel at integrating with existing teams and workflows. We can: (1) Augment your team with senior engineers, (2) Lead technical initiatives while your team learns, (3) Provide code reviews and mentorship, (4) Integrate with your existing tools and processes. We're comfortable working in any collaboration model - embedded, co-located, or fully remote.",
        category: "Services",
        tags: ["collaboration", "team", "integration"],
        helpful: 98,
        views: 678,
        related: ["6", "11"]
    },
    {
        id: "14",
        question: "What makes you different from other agencies?",
        answer: "Three core differentiators: (1) Senior-only team - No juniors learning on your project, (2) Distributed model - 24/7 coverage without timezone constraints, (3) Technical depth - We solve hard problems, not just build features. We're not a body shop. We're a technical partner that thinks strategically about your systems. Our engineers have built systems at scale and understand the full stack from infrastructure to UX.",
        category: "Company",
        tags: ["differentiators", "advantages", "why us"],
        helpful: 234,
        views: 1567,
        related: ["1", "2", "3"]
    },
    {
        id: "15",
        question: "How do you handle data security and privacy?",
        answer: "Security is fundamental: (1) SOC 2 compliant processes, (2) End-to-end encryption for sensitive data, (3) Regular security audits and penetration testing, (4) GDPR and CCPA compliance, (5) Secure development practices (OWASP Top 10), (6) Access controls and audit logs, (7) Data backup and disaster recovery. We sign NDAs and can work with your security team to meet specific compliance requirements.",
        category: "Support",
        tags: ["security", "privacy", "compliance"],
        helpful: 201,
        views: 1345,
        related: ["10", "12"]
    },
    {
        id: "16",
        question: "Do you offer consulting services?",
        answer: "Yes. We provide technical consulting for: (1) Architecture reviews and optimization, (2) Technology selection and migration strategies, (3) Performance optimization, (4) Security assessments, (5) Team training and workshops, (6) Technical due diligence. Consulting engagements can be short-term (days) or ongoing (retainer). We provide actionable recommendations, not just reports.",
        category: "Services",
        tags: ["consulting", "advisory", "strategy"],
        helpful: 112,
        views: 789,
        related: ["6", "8"]
    },
    {
        id: "17",
        question: "What is your response time for support requests?",
        answer: "Response times depend on severity: (1) Critical (system down) - 1 hour, (2) High (major feature broken) - 4 hours, (3) Medium (minor issues) - 24 hours, (4) Low (enhancements) - 48 hours. Premium support includes 24/7 coverage. We use a ticketing system for tracking and provide regular status updates. All support requests are triaged by senior engineers.",
        category: "Support",
        tags: ["support", "response time", "SLA"],
        helpful: 145,
        views: 923,
        related: ["10", "15"]
    },
    {
        id: "18",
        question: "Can you help with legacy system modernization?",
        answer: "Absolutely. Legacy modernization is one of our specialties. We: (1) Assess current systems and identify technical debt, (2) Create migration strategies that minimize risk, (3) Modernize incrementally without disrupting operations, (4) Refactor code while maintaining functionality, (5) Migrate to modern architectures and cloud platforms. We've successfully modernized systems built on technologies from the 90s to current standards.",
        category: "Services",
        tags: ["legacy", "modernization", "migration"],
        helpful: 178,
        views: 1123,
        related: ["6", "8", "11"]
    },
    {
        id: "19",
        question: "What industries do you serve?",
        answer: "We work across industries: (1) FinTech - Payment systems, trading platforms, blockchain, (2) Healthcare - HIPAA-compliant systems, telemedicine, (3) E-commerce - Marketplaces, inventory systems, (4) SaaS - B2B platforms, productivity tools, (5) Media - Content platforms, streaming, (6) Enterprise - Internal tools, automation. Our technical expertise is industry-agnostic, but we understand domain-specific requirements.",
        category: "General",
        tags: ["industries", "sectors", "clients"],
        helpful: 123,
        views: 856,
        related: ["6", "14"]
    },
    {
        id: "20",
        question: "How do you handle intellectual property?",
        answer: "IP ownership is clearly defined in our contracts: (1) Client owns all code and deliverables, (2) We retain rights to general knowledge and methodologies, (3) Open-source components remain under their respective licenses, (4) Custom solutions are fully owned by the client. We're happy to sign IP assignment agreements and work with your legal team to ensure clarity.",
        category: "General",
        tags: ["IP", "ownership", "legal"],
        helpful: 89,
        views: 634,
        related: ["7", "15"]
    }
];

export const getCategoryIcon = (category: string) => {
    const icons: Record<string, typeof HelpCircle> = {
        "General": HelpCircle,
        "Services": Code,
        "Pricing": DollarSign,
        "Technical": Settings,
        "Company": Users,
        "Support": Shield
    };
    return icons[category] || HelpCircle;
};

