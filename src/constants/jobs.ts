export interface Job {
    id: number;
    title: string;
    department: string;
    type: "Full-time" | "Part-time" | "Contract" | "Internship";
    location: "Remote" | "Hybrid" | "On-site";
    experience: string;
    salary?: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits: string[];
    skills: string[];
    postedDate: string;
    status: "Open" | "Closed";
}


export const JOBS: Job[] = [
    {
        id: 1,
        title: "Frontend Development Intern",
        department: "Engineering",
        type: "Internship",
        location: "Remote",
        experience: "0-1 years",
        salary: "NPR 15,000 - 25,000/month",
        description: "Join our engineering team as a Frontend Development Intern and gain hands-on experience building modern web applications. You'll work alongside senior engineers on real projects, learning industry best practices and cutting-edge technologies.",
        requirements: [
            "Currently pursuing or recently completed a degree in Computer Science or related field",
            "Basic understanding of HTML, CSS, and JavaScript",
            "Familiarity with React or similar frontend frameworks",
            "Good problem-solving skills and attention to detail",
            "Ability to work independently and in a team",
            "Strong communication skills"
        ],
        responsibilities: [
            "Develop and maintain user-facing features using React and TypeScript",
            "Collaborate with designers to implement responsive UI components",
            "Write clean, maintainable, and well-documented code",
            "Participate in code reviews and learn from senior developers",
            "Debug and fix issues reported by QA team",
            "Contribute to improving development processes and tools"
        ],
        benefits: [
            "Mentorship from senior engineers",
            "Flexible remote work",
            "Learning and development budget",
            "Real-world project experience",
            "Certificate upon completion",
            "Potential for full-time conversion"
        ],
        skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Git", "Responsive Design"],
        postedDate: "2026-01-01",
        status: "Open"
    },
    {
        id: 2,
        title: "AI/ML Research Intern",
        department: "Engineering",
        type: "Internship",
        location: "Hybrid",
        experience: "0-1 years",
        salary: "NPR 20,000 - 30,000/month",
        description: "Work with our AI/ML team to research and develop intelligent solutions. This internship offers exposure to cutting-edge machine learning techniques, data analysis, and real-world AI applications in production systems.",
        requirements: [
            "Pursuing or completed degree in Computer Science, Data Science, or related field",
            "Strong foundation in mathematics (linear algebra, statistics, calculus)",
            "Experience with Python and ML libraries (TensorFlow, PyTorch, or scikit-learn)",
            "Understanding of machine learning fundamentals",
            "Passion for AI and continuous learning",
            "Good analytical and research skills"
        ],
        responsibilities: [
            "Assist in developing and training machine learning models",
            "Conduct research on latest AI/ML techniques and papers",
            "Prepare and preprocess datasets for model training",
            "Evaluate model performance and suggest improvements",
            "Document research findings and experimental results",
            "Collaborate with team on AI integration projects"
        ],
        benefits: [
            "Exposure to production AI systems",
            "Access to GPU resources",
            "Mentorship from ML experts",
            "Flexible work schedule",
            "Research paper collaboration opportunities",
            "Conference attendance support"
        ],
        skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Data Analysis", "NumPy", "Pandas"],
        postedDate: "2026-01-01",
        status: "Open"
    },
    {
        id: 3,
        title: "DevOps Engineering Intern",
        department: "Infrastructure",
        type: "Internship",
        location: "Remote",
        experience: "0-1 years",
        salary: "NPR 18,000 - 28,000/month",
        description: "Learn the fundamentals of DevOps and cloud infrastructure while working on real deployment pipelines. You'll gain experience with containerization, CI/CD, monitoring, and cloud platforms under the guidance of experienced DevOps engineers.",
        requirements: [
            "Basic understanding of Linux/Unix systems",
            "Familiarity with command line and shell scripting",
            "Interest in automation and infrastructure",
            "Knowledge of Git and version control",
            "Willingness to learn new technologies quickly",
            "Good troubleshooting and debugging skills"
        ],
        responsibilities: [
            "Assist in setting up and maintaining CI/CD pipelines",
            "Help with containerization using Docker and Kubernetes",
            "Monitor system performance and assist with troubleshooting",
            "Write automation scripts for deployment tasks",
            "Document infrastructure setup and procedures",
            "Support cloud infrastructure management (AWS/Azure/GCP)"
        ],
        benefits: [
            "Hands-on cloud platform experience",
            "DevOps certification support",
            "Flexible remote work",
            "Mentorship program",
            "Access to cloud resources for learning",
            "Opportunity for permanent position"
        ],
        skills: ["Linux", "Docker", "Git", "Bash/Shell", "CI/CD", "AWS/Azure", "Kubernetes"],
        postedDate: "2026-01-01",
        status: "Open"
    }
];


export const DEPARTMENTS = ["All", "Engineering", "Design", "Blockchain", "Infrastructure"];
export const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract", "Internship"];
export const LOCATIONS = ["All", "Remote", "Hybrid", "On-site"];

