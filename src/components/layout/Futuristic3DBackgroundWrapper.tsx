"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Futuristic3DBackground = dynamic(() => import("@/components/three/Futuristic3DBackground"), {
    ssr: false,
    loading: () => null
});

export default function Futuristic3DBackgroundWrapper() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return <Futuristic3DBackground />;
}

