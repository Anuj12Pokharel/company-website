import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsEventName =
    | "page_view"
    | "contact_form_submit"
    | "project_click"
    | "service_view"
    | "boot_complete"
    | "scroll_engage"
    | "module_view"
    | "click_cta"
    | "form_start"
    | "form_submit"
    | "nav_click";

interface AnalyticsParams {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: string | number | boolean | undefined;
}

export const analytics = {
    track: (eventName: AnalyticsEventName, params?: AnalyticsParams) => {
        // Privacy: Strip PII if needed (placeholder)
        // Environment check
        if (typeof window !== 'undefined') {
            sendGAEvent('event', eventName, params || {});

            // Dev logging
            if (process.env.NODE_ENV === 'development') {
                console.debug(`[Analytics] ${eventName}`, params);
            }
        }
    },

    // Convenience methods
    trackContact: (method: string) => {
        analytics.track("contact_form_submit", { method, category: "Conversion" });
    },

    trackEngagement: (action: string, value?: number) => {
        analytics.track("scroll_engage", { label: action, value, category: "Engagement" });
    }
};
