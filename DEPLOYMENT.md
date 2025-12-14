# Deployment Guide

## Prerequisites

- **Node.js**: Version 20.x or higher.
- **Package Manager**: NPM.

## Environment Variables

Ensure the following environment variables are set in your deployment platform (e.g., Vercel, Netlify):

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics Measurement ID | No | - |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of the site | No | http://localhost:3000 |
| `NODE_ENV` | Environment mode | Yes | production |

## Build Process

The build process enforces strict type checking and environment validation.

```bash
npm run build
```

If any environment variable is missing or invalid, the build will fail immediately with a descriptive error.

## Production Checklist

- [ ] **Security Headers**: Verified in `next.config.ts`.
- [ ] **Dynamic Components**: 3D elements verified to load client-side only.
- [ ] **Analytics**: Google Analytics ID provided.
- [ ] **Assets**: All static assets in `public/`.
- [ ] **Sitemap**: Generated automatically at `/sitemap.xml`.

## Vercel Deployment

1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Add Environment Variables in Vercel Settings.
4.  Deploy.
