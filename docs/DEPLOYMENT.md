# Codex Neural: Deployment Guide

## Vercel Deployment (Recommended)

1.  **Push to Git**: Ensure your code is pushed to a GitHub/GitLab repository.
2.  **Import Project**:
    *   Go to [Vercel Dashboard](https://vercel.com/new).
    *   Import your `codex-neural` repository.
3.  **Build Settings**:
    *   Framework Preset: `Next.js` (Auto-detected).
    *   Root Directory: `./codex-neural` (if monorepo) or `./`.
    *   Build Command: `npm run build`.
    *   Output Directory: `.next`.
4.  **Environment Variables**:
    *   `NEXT_PUBLIC_GA_ID`: Your Google Analytics ID (e.g., `G-XXXXXXX`).
    *   `NEXT_PUBLIC_ENABLE_PREDICTIONS`: `true`.
5.  **Deploy**: Click **Deploy**.

## Optimization Checklist
*   ✅ **Image Optimization**: Proxied via `via.placeholder.com` (Configured in `next.config.ts`).
*   ✅ **Static Generation**: Critical pages are statically optimized.
*   ✅ **Analytics**: GA4 script is lazy-loaded.

## Verification
Once deployed, verify:
*   [ ] **Home**: 3D Background loads.
*   [ ] **Services**: Hover intent tracking works in console.
*   [ ] **Contact**: Form submission triggers "Transmission Received".
