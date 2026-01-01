"use client";

export type IntentCategory = 'technical' | 'design' | 'business';

interface UserProfile {
    visitCount: number;
    lastVisit: number;
    intentScores: Record<IntentCategory, number>;
}

const STORAGE_KEY = 'codex_user_profile';

const DEFAULT_PROFILE: UserProfile = {
    visitCount: 1,
    lastVisit: Date.now(),
    intentScores: {
        technical: 0,
        design: 0,
        business: 0,
    },
};

export class PredictiveEngine {
    private profile: UserProfile;

    constructor() {
        this.profile = this.loadProfile();
    }

    private loadProfile(): UserProfile {
        if (typeof window === 'undefined') return DEFAULT_PROFILE;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                // Increment visit if session expired (30 mins)
                if (Date.now() - data.lastVisit > 30 * 60 * 1000) {
                    data.visitCount++;
                    data.lastVisit = Date.now();
                }
                return data;
            }
        } catch (e) {
            console.error("Failed to load profile", e);
        }

        // Save new profile
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
        }
        return DEFAULT_PROFILE;
    }

    private save() {
        if (typeof window === 'undefined') return;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profile));
    }

    public trackInteraction(category: IntentCategory, weight: number = 1) {
        this.profile.intentScores[category] += weight;
        this.save();
    }

    public getPrimaryIntent(): IntentCategory | null {
        const scores = this.profile.intentScores;
        const max = Math.max(scores.technical, scores.design, scores.business);

        if (max === 0) return null; // No sufficient data

        if (scores.technical === max) return 'technical';
        if (scores.design === max) return 'design';
        return 'business';
    }

    public isReturningVisitor(): boolean {
        return this.profile.visitCount > 1;
    }

    public getProfile(): UserProfile {
        return { ...this.profile };
    }
}

// Singleton instance
export const predictiveEngine = new PredictiveEngine();
