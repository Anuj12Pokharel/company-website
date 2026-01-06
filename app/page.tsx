import SystemBootHero from "@/components/sections/Hero";
import ServicesModules from "@/components/sections/ServicesSection";

import AboutTeamSection from "@/components/sections/AboutTeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTAStrip from "@/components/sections/CTAStrip";

import TechStackSection from "@/components/sections/TechStackSection";
import ProcessPreviewSection from "@/components/sections/ProcessPreviewSection";
import IndustriesSection from "@/components/sections/IndustriesSection";

export default function Home() {
    return (
        <div className="flex flex-col">
            <SystemBootHero />

            <ServicesModules /> {/* "Empowering Businesses" Grid */}
            <IndustriesSection /> {/* "We drive innovation in various key industries" */}
            <AboutTeamSection />
            <TechStackSection /> {/* "Technologies We Rely On" */}
            <ProcessPreviewSection /> {/* "Enjoy Seamless Service" */}
            {/* <TestimonialsSection /> */}
            <CTAStrip />
        </div>
    );
}
