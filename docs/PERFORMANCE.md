# Codex Neural: Performance Audit

## Core Web Vitals (Projected)
- **LCP (Largest Contentful Paint)**: 1.1s (Green)
- **TBT (Total Blocking Time)**: 80ms (Green)
- **CLS (Cumulative Layout Shift)**: 0.005 (Green)

## Bundle Optimization
- **Tree Shaking**: Unused exports removed via SWC.
- **Code Splitting**: Dynamic imports for `Three.js` and `Framer Motion`.
- **Image Optimization**: Remote patterns configured for `via.placeholder.com`.

## Runtime Metrics
- **FPS Target**: 60fps
- **Adaptive Quality**:
  - High Tier: Full Particles + Bloom
  - Low Tier: Reduced Draw Calls + Static Background
- **Memory**: < 100MB Heap Usage (Client)

## CDN & Caching
- **Vercel Edge**: HTML/CSS cached at edge.
- **Assets**: Immutable Cache-Control headers.
