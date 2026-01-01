"use client";

import dynamic from "next/dynamic";

const AmbientBackground = dynamic(() => import("@/components/layout/AmbientBackground"), { ssr: false });
const NeuralPulse = dynamic(() => import("@/components/ui/neural/NeuralPulse"), { ssr: false });
const StarsConstellation = dynamic(() => import("@/components/layout/StarsConstellation"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/whatsapp/WhatsAppButton"), { ssr: false });

export default function ClientDynamicComponents() {
    return (
        <>
            <StarsConstellation />
            <AmbientBackground />
            <NeuralPulse />
            <WhatsAppButton />
        </>
    );
}
