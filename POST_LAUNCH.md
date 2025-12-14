# Post-Launch Monitoring Checklist

**Codex Neural | Systems Integrity & Performance**

> This is not vanity analytics—this is **engineering signal**, stability, and long-term health.

---

## 1️⃣ Runtime Stability (First 24–72 Hours)

### Server / App Health

- [ ] No unexpected restarts or crashes
- [ ] No spike in 5xx errors
- [ ] Cold start time acceptable (especially on first request)
- [ ] Memory usage stable over time (no gradual increase)

**Monitoring:**
- Check Vercel/Deployment platform logs for error spikes
- Monitor serverless function cold starts
- Track memory usage over 24-hour periods

### Client Runtime

- [ ] Zero console errors in production
- [ ] No hydration warnings
- [ ] No WebGL context loss on scroll or tab switch
- [ ] No layout shift during initial load or section snaps

**Critical Components to Monitor:**
- `src/components/three/ParticleNetwork.tsx` - WebGL context stability
- `src/components/sections/Hero.tsx` - Boot sequence hydration
- `src/context/EngagementContext.tsx` - State initialization

**Test:**
```bash
# Open browser console, check for:
# - React hydration warnings
# - WebGL context lost errors
# - Uncaught exceptions
```

---

## 2️⃣ Performance Metrics (Real Signals Only)

### Core Web Vitals (Monitor Daily)

- **LCP**: < 2.5s (Hero section should load quickly)
- **CLS**: ~0 (No layout shift during boot sequence)
- **INP / TBT**: Minimal interaction delay (Navbar, CTA buttons)

**Components Affecting Metrics:**
- `src/components/sections/Hero.tsx` - LCP critical
- `src/components/layout/Navbar.tsx` - INP critical
- `src/components/three/ParticleNetwork.tsx` - TBT impact

### Animation & Rendering

- [ ] Stable ~60 FPS on desktop
- [ ] Graceful degradation on low-end devices
- [ ] No dropped frames during section transitions
- [ ] Particle system adapts correctly by device class

**Quality Mode System:**
- `src/context/EngagementContext.tsx` automatically switches to "low" quality mode when FPS < 45
- Verify this works: Open DevTools → Performance → Record → Scroll
- Check that `qualityMode` state transitions correctly

### Resource Use

- [ ] JS bundle size unchanged post-launch
- [ ] No unexpected network requests
- [ ] No unused chunks being loaded

**Check:**
```bash
npm run build
# Verify bundle sizes in .next/analyze or build output
```

**Expected Bundle Sizes (approximate):**
- Main bundle: ~200-300KB (gzipped)
- Three.js chunks: Lazy loaded, should not block initial render

---

## 3️⃣ WebGL & GPU Health (Critical for This Site)

- [ ] GPU usage plateaus (no steady increase)
- [ ] No memory leaks after prolonged scrolling
- [ ] Materials, geometries, buffers disposed correctly
- [ ] Tab switching does not duplicate WebGL contexts

**Component Under Test:**
- `src/components/three/ParticleNetwork.tsx`
  - Uses 3000 particles (reduced from 5000)
  - Should dispose on unmount
  - DPR adapts based on `qualityMode`

**Test Procedure:**
1. Open site in Chrome
2. Open DevTools → Performance Monitor
3. Leave site open for **10–15 minutes**
4. Scroll continuously
5. Resize window multiple times
6. Switch tabs and return
7. Check GPU memory: Should stabilize, not grow

**Expected Behavior:**
- GPU memory should plateau after initial load
- No WebGL context errors in console
- Particle system should pause/resume correctly on tab switch

**Red Flags:**
- GPU memory steadily increasing
- Console errors: "WebGL context lost"
- Multiple Canvas elements in DOM (should be 1)

---

## 4️⃣ UX Reality Check (Human, Not Analytics)

Perform this manually with fresh eyes:

- [ ] First impression feels calm, not overwhelming
- [ ] Motion supports reading, never interrupts it
- [ ] Stillness feels intentional
- [ ] Typography hierarchy reads effortlessly
- [ ] Nothing feels "trying too hard"

**Specific Elements to Evaluate:**

1. **Hero Section** (`src/components/sections/Hero.tsx`)
   - Boot sequence: Does it feel necessary or gimmicky?
   - Text animation: Subtle or distracting?
   - Particle background: Enhances or competes with content?

2. **NeuralPulse** (`src/components/ui/neural/NeuralPulse.tsx`)
   - Rotating circle: Too slow to notice or appropriately subtle?
   - Should be barely perceptible

3. **Section Transitions**
   - No scroll-triggered animations (removed for restraint)
   - Content should appear naturally

4. **Logo** (`src/components/ui/neural/Logo.tsx`)
   - Static now (animations removed)
   - Should feel confident, not flashy

**Decision Rule:**
> If anything feels *slightly annoying*, remove it.

---

## 5️⃣ Cross-Environment Validation

### Devices

- [ ] Desktop (high DPI) - 4K/Retina displays
- [ ] Laptop (integrated GPU) - Intel Iris, AMD APU
- [ ] Mobile (mid-range Android / iOS) - Pixel 6a, iPhone 12

**Test Matrix:**

| Device | Browser | Expected Behavior |
|--------|---------|-------------------|
| Desktop (Chrome) | Chrome 120+ | Full quality mode, 60 FPS |
| MacBook (Safari) | Safari 17+ | Full quality mode, 60 FPS |
| Mobile (Android) | Chrome Mobile | Low quality mode, 30+ FPS |
| Mobile (iOS) | Safari Mobile | Low quality mode, 30+ FPS |

### Browsers

- [ ] Chrome (120+)
- [ ] Safari (17+)
- [ ] Firefox (120+)

**Browser-Specific Checks:**

**Chrome:**
- WebGL 2.0 support
- Performance Monitor shows stable GPU usage

**Safari:**
- WebGL context not lost on tab switch
- Backdrop blur renders correctly (Navbar, Footer)

**Firefox:**
- Particle system renders correctly
- No console warnings about deprecated APIs

**Look for:**
- Scroll snapping consistency
- Touch input behavior (mobile menu)
- Orientation changes (mobile)
- Reduced motion preference respected (if implemented)

---

## 6️⃣ Error & Log Discipline

- [ ] No noisy logs
- [ ] No debug statements left behind
- [ ] Errors (if any) are:
  - rare
  - actionable
  - traceable

**Code Audit:**

```bash
# Search for console statements
grep -r "console\." src/
# Should only find:
# - analytics.ts (dev logging, gated by NODE_ENV)
# - GlobalErrorBoundary.tsx (error logging)
```

**Expected Console Output in Production:**
- Silent (no output)
- Only errors from GlobalErrorBoundary (should be rare)

**Analytics Logging:**
- `src/services/analytics.ts` - Only logs in development
- Verify: `process.env.NODE_ENV === 'development'` guard works

**Silence is success.**

---

## 7️⃣ Security & Config Sanity

- [ ] Environment variables scoped correctly
- [ ] No secrets exposed to client
- [ ] Security headers present and correct
- [ ] No unused env keys lingering

**Environment Variables:**
- `src/config/env.ts` - Validated with Zod schema
- `NEXT_PUBLIC_GA_ID` - Optional, only used if present
- `NEXT_PUBLIC_SITE_URL` - Public, safe to expose

**Security Headers:**
- `next.config.ts` - Configured with:
  - HSTS
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy

**Verify:**
```bash
curl -I https://www.codexneural.com
# Check response headers match next.config.ts
```

**Client-Side Exposure Check:**
```bash
npm run build
# Check .next/static files for any env vars
# Should only see NEXT_PUBLIC_* vars
```

---

## 8️⃣ Regression Guard (Lightweight)

Before any future change:

1. **Build Verification:**
   ```bash
   npm run build
   ```
   - Must pass without errors
   - Must generate all static pages

2. **Visual Smoke Test:**
   - [ ] Hero section renders correctly
   - [ ] One mid section (Services or Tech Stack) renders
   - [ ] Footer renders with signature line
   - [ ] Mobile menu opens/closes

3. **WebGL Verification:**
   - [ ] ParticleNetwork initializes once
   - [ ] No duplicate Canvas elements
   - [ ] No console errors related to Three.js

**If any of these break → stop and revert.**

---

## 9️⃣ Engagement System Health

**Predictive Engine:**
- `src/lib/predictive.ts` - localStorage-based intent tracking
- `src/context/EngagementContext.tsx` - React context wrapper

**Monitor:**
- [ ] localStorage writes don't cause performance issues
- [ ] Intent tracking doesn't leak memory
- [ ] Quality mode switching works correctly

**Test:**
1. Open site
2. Interact with different sections
3. Check localStorage: `localStorage.getItem('codex_user_profile')`
4. Verify profile updates correctly
5. Close and reopen - should recognize returning visitor

**Expected Behavior:**
- Profile stored in localStorage
- Intent scores accumulate correctly
- Returning visitor detection works
- No memory leaks from tracking

---

## 🔟 Performance Budget

**Initial Load:**
- HTML: < 50KB
- CSS: < 20KB (gzipped)
- JS: < 300KB (gzipped, initial bundle)
- Images: Lazy loaded, no impact on LCP

**Runtime:**
- Memory: < 100MB (including WebGL)
- GPU: Stable usage, no growth
- FPS: 60 on desktop, 30+ on mobile

**Network:**
- No unnecessary requests
- Analytics: Only if `NEXT_PUBLIC_GA_ID` is set
- No third-party scripts beyond GA

---

## 🏁 Ongoing Rule (Most Important)

> **Do not iterate unless a real signal demands it.**

No feature creep.
No aesthetic churn.
No "just one more animation."

This system is now **complete**.

---

## 📊 Monitoring Tools

**Recommended Setup:**

1. **Vercel Analytics** (if using Vercel)
   - Core Web Vitals tracking
   - Error tracking
   - Performance monitoring

2. **Google Analytics** (optional)
   - Already integrated via `@next/third-parties`
   - Only loads if `NEXT_PUBLIC_GA_ID` is set
   - Privacy-safe wrapper in `src/services/analytics.ts`

3. **Manual Checks**
   - Weekly visual review
   - Monthly performance audit
   - Quarterly security review

---

## 🚨 Red Flags (Stop Everything)

If you see any of these, **immediately investigate**:

1. **5xx errors > 1% of requests**
2. **LCP > 3s consistently**
3. **GPU memory growing steadily**
4. **Console errors in production**
5. **Layout shift on initial load**
6. **WebGL context lost errors**
7. **Bundle size increased > 10%**

---

## 📝 Change Log Template

When making changes, document:

```markdown
## [Date] - [Change Type]

**What Changed:**
- Component/file modified
- Reason for change

**Impact:**
- Performance: [None / Minor / Major]
- UX: [None / Minor / Major]
- Breaking: [Yes / No]

**Verification:**
- [ ] Build passes
- [ ] Visual smoke test passes
- [ ] WebGL still works
- [ ] No console errors
```

---

## 🎯 Success Criteria

**Week 1:**
- Zero critical errors
- Core Web Vitals green
- No performance regressions

**Month 1:**
- Stable metrics
- No memory leaks
- User feedback positive (if collected)

**Quarter 1:**
- System proven stable
- No unplanned changes
- Technical debt remains zero

---

**Last Updated:** [Date]
**Maintained By:** Codex Neural Engineering Collective
**Status:** ✅ Production Ready

