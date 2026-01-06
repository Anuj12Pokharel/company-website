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


export const JOBS: Job[] = [];


export const DEPARTMENTS = ["All", "Engineering", "Design", "Blockchain", "Infrastructure"];
export const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract", "Internship"];
export const LOCATIONS = ["All", "Remote", "Hybrid", "On-site"];

