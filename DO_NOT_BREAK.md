# Do Not Break These Things

**Codex Neural | Critical System Guards**

> This document lists the **non-negotiable** behaviors that must remain intact. If any of these break, the system is compromised.

---

## 🔴 Critical Paths (Site Won't Work)

### 1. Build System

**Must Always Work:**
```bash
npm run build
```

**What Breaks It:**
- TypeScript errors
- Missing dependencies
- Invalid environment variables
- Syntax errors in any file

**Guard:**
- Never commit code that doesn't build
- Run `npm run build` before every PR

---

### 2. WebGL Initialization

**Component:** `src/components/three/ParticleNetwork.tsx`

**Must Always:**
- Initialize exactly once per page load
- Dispose correctly on unmount
- Adapt DPR based on `qualityMode`
- Never create duplicate Canvas elements

**What Breaks It:**
- Multiple instances of ParticleNetwork
- WebGL context not cleaned up
- Memory leaks from geometries/materials
- DPR not respecting quality mode

**Guard:**
- Only one `<ParticleNetwork />` in the app
- Always check: `document.querySelectorAll('canvas').length === 1`

---

### 3. Engagement Context

**Component:** `src/context/EngagementContext.tsx`

**Must Always:**
- Initialize without errors
- Track mouse movement correctly
- Switch quality mode based on FPS
- Never cause infinite re-renders

**What Breaks It:**
- setState in render
- Missing cleanup in useEffect
- Event listeners not removed
- RAF loop not cancelled

**Guard:**
- All useEffect hooks have cleanup
- No setState calls in render
- Event listeners use `{ passive: true }` where possible

---

## 🟡 Visual Integrity (Site Looks Broken)

### 4. Hero Boot Sequence

**Component:** `src/components/sections/Hero.tsx`

**Must Always:**
- Boot sequence completes
- Content appears after boot
- No layout shift
- Scroll parallax works

**What Breaks It:**
- Boot sequence never completes
- Content flashes before boot
- Layout shift during boot
- Parallax causes jank

**Guard:**
- Test boot sequence manually
- Check for layout shift in DevTools
- Verify scroll behavior

---

### 5. Mobile Menu

**Component:** `src/components/layout/Navbar.tsx`

**Must Always:**
- Open/close correctly
- Not block page scroll when closed
- Close on navigation
- Accessible (keyboard, screen reader)

**What Breaks It:**
- Menu stuck open
- Body scroll locked when menu closed
- Menu doesn't close on link click
- No keyboard navigation

**Guard:**
- Test on actual mobile device
- Test keyboard navigation
- Verify body scroll behavior

---

### 6. Footer Signature

**Component:** `src/components/layout/Footer.tsx`

**Must Always:**
- Display signature line: "Built with deliberate constraint..."
- Not break layout
- Render on all pages

**What Breaks It:**
- Signature text removed
- Layout broken by long text
- Missing on some pages

**Guard:**
- Visual check on every page
- Verify text is present
- Check responsive layout

---

## 🟢 Performance Guarantees (Site Feels Broken)

### 7. Quality Mode Switching

**System:** `src/context/EngagementContext.tsx`

**Must Always:**
- Switch to "low" when FPS < 45
- Switch to "high" when FPS > 55
- Update ParticleNetwork DPR correctly
- Not cause visual glitches

**What Breaks It:**
- Quality mode never switches
- Switching causes visual glitches
- DPR not updated
- FPS calculation wrong

**Guard:**
- Test on low-end device
- Verify FPS monitoring works
- Check DPR changes in DevTools

---

### 8. Particle System Performance

**Component:** `src/components/three/ParticleNetwork.tsx`

**Must Always:**
- Render at 60 FPS on desktop
- Render at 30+ FPS on mobile
- Not cause GPU memory leaks
- Adapt to quality mode

**What Breaks It:**
- FPS drops below 30
- GPU memory grows
- Particles don't render
- Quality mode ignored

**Guard:**
- Performance profiling
- GPU memory monitoring
- FPS tracking
- Test on low-end devices

---

## 🔵 Data Integrity (Site Behaves Wrong)

### 9. Predictive Engine

**Component:** `src/lib/predictive.ts`

**Must Always:**
- Store profile in localStorage correctly
- Track intent accurately
- Detect returning visitors
- Not leak data

**What Breaks It:**
- localStorage writes fail
- Intent tracking broken
- Returning visitor detection wrong
- Data corruption

**Guard:**
- Test localStorage in different browsers
- Verify intent tracking
- Check returning visitor logic
- Test with localStorage disabled

---

### 10. Analytics Integration

**Component:** `src/services/analytics.ts`

**Must Always:**
- Only load if `NEXT_PUBLIC_GA_ID` is set
- Not break if GA fails to load
- Not track in development (unless explicitly enabled)
- Respect privacy

**What Breaks It:**
- Analytics loads when it shouldn't
- Site breaks if GA fails
- Tracks in development
- Privacy violations

**Guard:**
- Test with/without GA ID
- Test with GA blocked
- Verify dev logging
- Check privacy compliance

---

## 🛡️ Security Boundaries

### 11. Environment Variables

**Component:** `src/config/env.ts`

**Must Always:**
- Validate all env vars with Zod
- Fail build if required vars missing
- Never expose secrets to client
- Only expose `NEXT_PUBLIC_*` vars

**What Breaks It:**
- Invalid env vars pass validation
- Secrets exposed to client
- Build succeeds with missing vars
- Wrong vars exposed

**Guard:**
- Test with missing vars
- Verify build fails correctly
- Check client bundle for secrets
- Review env.ts schema

---

### 12. Security Headers

**Component:** `next.config.ts`

**Must Always:**
- Set all security headers
- HSTS configured correctly
- CSP not too restrictive (breaks site)
- CSP not too permissive (security risk)

**What Breaks It:**
- Headers missing
- Headers misconfigured
- CSP blocks legitimate resources
- Security vulnerabilities

**Guard:**
- Test headers with curl
- Verify CSP allows required resources
- Security audit
- Check header values

---

## 📋 Pre-Deployment Checklist

Before **any** deployment, verify:

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] Hero section renders
- [ ] Mobile menu works
- [ ] Footer signature present
- [ ] WebGL initializes once
- [ ] No console errors
- [ ] Quality mode switches
- [ ] Analytics loads (if configured)
- [ ] Security headers present

**If any check fails → DO NOT DEPLOY**

---

## 🚨 Emergency Rollback Triggers

**Immediately rollback if:**

1. **5xx errors > 5% of requests**
2. **Site completely broken (white screen)**
3. **WebGL context lost errors**
4. **Build fails in production**
5. **Security headers missing**
6. **Secrets exposed**

**Rollback Procedure:**
1. Revert to last known good commit
2. Verify build passes
3. Deploy immediately
4. Investigate issue in staging

---

## 🔄 Change Approval Process

**For any change that touches:**

- WebGL/Three.js code
- Engagement context
- Build configuration
- Security headers
- Environment variables

**Requires:**
1. Code review
2. Build verification
3. Visual smoke test
4. Performance check
5. Security review (if applicable)

**No exceptions.**

---

## 📊 Monitoring Alerts

**Set up alerts for:**

1. **Error Rate > 1%**
2. **LCP > 3s**
3. **5xx errors > 0.1%**
4. **Build failures**
5. **WebGL context lost**

**Action:**
- Immediate investigation
- Rollback if critical
- Fix in staging first

---

## 🎯 Definition of "Broken"

A system is **broken** if:

1. **Functionality:** Core feature doesn't work
2. **Performance:** Metrics degrade > 20%
3. **Visual:** Layout broken or content unreadable
4. **Security:** Vulnerability introduced
5. **Stability:** Crashes or errors > 1%

**If broken → Fix immediately or rollback.**

---

**Last Updated:** [Date]
**Maintained By:** Codex Neural Engineering Collective
**Status:** 🔴 Active Monitoring

