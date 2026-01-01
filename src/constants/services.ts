import { Smartphone, Brain, Globe, Cloud, Database, Layout } from "lucide-react";

export const SERVICES = [
    {
        id: "web-dev",
        title: "Enterprise Web Development",
        description: "Scalable, high-performance web applications built with Next.js and modern architecture.",
        icon: Globe,
        features: ["PWA Development", "E-commerce Solutions", "Custom CMS", "API Integration"],
    },
    {
        id: "mobile-app",
        title: "Mobile App Development",
        description: "Native and Cross-platform mobile solutions that deliver seamless user experiences.",
        icon: Smartphone,
        features: ["React Native", "iOS & Android", "App Store Optimization", "Real-time updates"],
    },
    {
        id: "ai-ml",
        title: "AI & Machine Learning",
        description: "Intelligent solutions that automate processes and provide deep business insights.",
        icon: Brain,
        features: ["Predictive Analytics", "NLP / Chatbots", "Computer Vision", "Data Mining"],
    },
    {
        id: "saas",
        title: "SaaS Product Engineering",
        description: "End-to-end development of Software-as-a-Service platforms for global markets.",
        icon: Cloud,
        features: ["Multi-tenancy", "Subscription Billing", "Scalable Infrastructure", "Secure Auth"],
    },
    {
        id: "ui-ux",
        title: "UI/UX Design",
        description: "Human-centered design that creates intuitive and engaging digital experiences.",
        icon: Layout,
        features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
    },
    {
        id: "cloud-devops",
        title: "Cloud & DevOps",
        description: "Reliable cloud infrastructure and CI/CD pipelines for continuous delivery.",
        icon: Database,
        features: ["AWS / Azure / GCP", "Docker & Kubernetes", "Automated Testing", "Security Audits"],
    },
];
