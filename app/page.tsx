import SystemBootHero from "@/components/sections/Hero";
import ServicesModules from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import MissionVision from "@/components/sections/MissionVision";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTAStrip from "@/components/sections/CTAStrip";
import { LogoTicker } from "@/components/sections/LogoTicker";
import TechStackSection from "@/components/sections/TechStackSection";
import ProcessPreviewSection from "@/components/sections/ProcessPreviewSection";
import IndustriesSection from "@/components/sections/IndustriesSection";

export default function Home() {
    return (
        <div className="flex flex-col">
            <SystemBootHero />
            <StatsSection />
            <ServicesModules /> {/* "Empowering Businesses" Grid */}
            <IndustriesSection /> {/* "We drive innovation in various key industries" */}
            <MissionVision />   {/* "Who We Are" */}
            <TechStackSection /> {/* "Technologies We Rely On" */}
            <ProcessPreviewSection /> {/* "Enjoy Seamless Service" */}
            <LogoTicker />      {/* "Trusted By" */}
            {/* <TestimonialsSection /> */}
            <CTAStrip />
        </div>
    );
}
