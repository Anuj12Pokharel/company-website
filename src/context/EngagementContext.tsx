"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { predictiveEngine, IntentCategory } from "@/lib/predictive";

interface EngagementState {
    intensity: number;
    isHighEngagement: boolean;
    qualityMode: "high" | "low";
    primaryIntent: IntentCategory | null;
    isReturning: boolean;
    trackIntent: (category: IntentCategory, weight?: number) => void;
}

const EngagementContext = createContext<EngagementState>({
    intensity: 0,
    isHighEngagement: false,
    qualityMode: "high",
    primaryIntent: null,
    isReturning: false,
    trackIntent: () => {}
});

export function EngagementProvider({ children }: { children: React.ReactNode }) {
    const [intensity, setIntensity] = useState(0);
    const [qualityMode, setQualityMode] = useState<"high" | "low">("high");
    const [primaryIntent, setPrimaryIntent] = useState<IntentCategory | null>(() => {
        if (typeof window !== 'undefined') return predictiveEngine.getPrimaryIntent();
        return null;
    });
    const [isReturning] = useState(() => {
        if (typeof window !== 'undefined') return predictiveEngine.isReturningVisitor();
        return false;
    });
    // isReturning is kept for potential future use

    const frameCountRef = useRef(0);
    const lastFrameTimeRef = useRef(0);
    const velocityRef = useRef(0);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);
    const rafIdRef = useRef<number | undefined>(undefined);

    const trackIntent = useCallback((category: IntentCategory, weight = 1) => {
        predictiveEngine.trackInteraction(category, weight);
        setPrimaryIntent(predictiveEngine.getPrimaryIntent());
    }, []);

    useEffect(() => {
        let frameId: number;
        const loop = () => {
            const now = Date.now();
            frameCountRef.current++;

            if (now - lastFrameTimeRef.current >= 2000) {
                const fps = frameCountRef.current / 2;
                if (fps < 45 && qualityMode === "high") {
                    setQualityMode("low");
                } else if (fps > 55 && qualityMode === "low") {
                    setQualityMode("high");
                }
                lastFrameTimeRef.current = now;
                frameCountRef.current = 0;
            }
            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop);
        rafIdRef.current = frameId;
        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [qualityMode]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            const dt = now - lastTime.current;
            if (dt < 16) return;

            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const v = Math.min(dist / dt, 3);

            velocityRef.current = velocityRef.current * 0.92 + v * 0.08;

            if (Math.abs(velocityRef.current - intensity) > 0.03) {
                setIntensity(velocityRef.current);
            }

            lastMousePos.current = { x: e.clientX, y: e.clientY };
            lastTime.current = now;
        };

        const interval = setInterval(() => {
            velocityRef.current *= 0.96;
            if (velocityRef.current < 0.01) velocityRef.current = 0;
            setIntensity(prev => (Math.abs(prev - velocityRef.current) > 0.01 ? velocityRef.current : prev));
        }, 100);

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(interval);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [intensity]);

    const isHighEngagement = intensity > 0.5;

    const contextValue = useMemo<EngagementState>(() => ({
        intensity,
        isHighEngagement,
        qualityMode,
        primaryIntent,
        isReturning,
        trackIntent
    }), [intensity, isHighEngagement, qualityMode, primaryIntent, isReturning, trackIntent]);

    return (
        <EngagementContext.Provider value={contextValue}>
            {children}
        </EngagementContext.Provider>
    );
}

export const useEngagement = () => useContext(EngagementContext);
