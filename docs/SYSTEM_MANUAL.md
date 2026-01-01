# Codex Neural 2.0: System Manual

**Version**: 2.0.0 (Neon Synapse)
**Status**: Production Ready
**Last Updated**: 2025-12-14

---

## 1. Overview
**Codex Neural 2.0** is an autonomous, self-optimizing web platform designed for the future of digital architecture. It features a "Neural Futurism" aesthetic and employs client-side predictive intelligence to adapt the UX in real-time based on user engagement.

### Philosophy
- **Neural Futurism**: A visual language combining organic neural networks with cybernetic precision.
- **Predictive UX**: The interface anticipates user intent (Technical vs. Design vs. Business) and adapts content hierarchy.
- **Adaptive Core**: Performance scales dynamically based on device capabilities (FPS monitoring).

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **3D/Graphics**: React Three Fiber (R3F)
- **State/Logic**: React Context + LocalStorage (Persisted Profiles)

---

## 2. Architecture & Directory Structure

### High-Level Architecture
1.  **Frontend Layer**: Next.js Pages & Components (Visuals).
2.  **Context Layer**: `EngagementContext` (State & Telemetry).
3.  **Logic Layer**: `PredictiveEngine` (Heuristics & Scoring).
4.  **Asset Layer**: optimized 3D/2D assets.

### Directory Map
```text
src/
├── app/                 # App Router (Pages & Layouts)
│   ├── layout.tsx       # Root Layout + Global Providers
│   ├── page.tsx         # Home Page
│   ├── services/        # Services Page
│   ├── about/           # About Page
│   ├── contact/         # Contact Page
│   └── globals.css      # Design System Tokens
├── components/
│   ├── layout/          # Navbar, Footer, AmbientBackground
│   ├── sections/        # Hero, Services, Portfolio (Page Sections)
│   ├── ui/              # Reusable UI (GlassCard, NeuralPulse)
│   └── three/           # 3D Canvas Components
├── context/
│   └── EngagementContext.tsx # Central State & Telemetry
├── lib/
│   ├── predictive.ts    # AI Logic (Scoring & Intent)
│   ├── experiments.ts   # A/B Testing & Optimization
│   └── utils.ts         # CN & Formatters
└── constants/
    └── content.ts       # Text, Data, & Config
```

---

## 3. UI/UX Design System: "Neon Synapse"

### Color Palette
Defined in `globals.css` via CSS variables.
- **Background**: `Void Black` (#050505)
- **Primary**: `Cyber Fuchsia` (#D946EF) - *Action & Brand*
- **Secondary**: `Neural Violet` (#8B5CF6) - *Depth & Gradients*
- **Accent**: `Electric Cyan` (#06B6D4) - *Data Streams*

### Core Components
1.  **GlassCard**:
    *   **Usage**: Wraps content in transparent, blurred containers.
    *   **Props**: `hoverEffect` (boolean) to enable glow.
    *   **Path**: `src/components/ui/neural/GlassCard.tsx`
2.  **NeuralPulse**:
    *   **Usage**: Background animation component in `layout.tsx`.
    *   **Effect**: Simulates data streams moving horizontally.
    *   **Path**: `src/components/ui/neural/NeuralPulse.tsx`

---

## 4. Functional Systems

### Predictive Engine (`src/lib/predictive.ts`)
*   **Purpose**: Tracks user actions to categorize intent (`technical`, `design`, `business`).
*   **Storage**: Uses `localStorage` key `codex_user_profile`.
*   **Logic**:
    *   Visiting 'Web3' projects -> + Technical Score.
    *   Staying on page > 30s -> + Engagement Score.

### Engagement Context (`src/context/EngagementContext.tsx`)
*   **Purpose**: Exposes predictive data to UI components.
*   **Key Exports**:
    *   `primaryIntent`: The dominant category of the user.
    *   `qualityMode`: 'high' or 'low' based on FPS.
    *   `trackIntent(category, weight)`: Function to log interactions.

### A/B Testing (`src/lib/experiments.ts`)
*   **Purpose**: Deterministic client-side experiments.
*   **Mechanism**: Hashes user ID to assign variants (A/B).
*   **Self-Optimization**: Biases variant selection towards high-converting options over time.

---

## 5. Developer Guide (Extensibility)

### How to Add a New Service Module
1.  Open `src/constants/content.ts`.
2.  Add a new entry to `SERVICES_DETAILED` array:
    ```typescript
    {
      id: "new-module",
      title: "New Module Title",
      desc: "Description...",
      icon: IconName,
      category: "technical" // intent category
    }
    ```
3.  The `ServicesSection.tsx` will automatically render it.

### How to Add a New Page
1.  Create folder: `src/app/newpage/`
2.  Create `page.tsx`:
    ```tsx
    export default function NewPage() {
      return <div>Content</div>
    }
    ```
3.  Add link to `NAV_LINKS` in `src/constants/index.ts`.

### How to Update Assets
*   **Images**: Place in `public/`. Use `next/image` with path `/filename.jpg`.
*   **Icons**: Use `lucide-react` library. Import and pass as props.

---

## 6. Operations & Deployment

### Deployment (Vercel)
1.  **Build Command**: `npm run build`
2.  **Output**: `.next`
3.  **Environment Variables**:
    *   `NEXT_PUBLIC_ANALYTICS_ID`: GA4 Measurement ID.

### Performance Monitoring
*   **FPS Observer**: `EngagementContext` logs low FPS warnings to console.
*   **Metrics**: Check `PERFORMANCE.md` for baseline targets (LCP < 1.2s).

### Quality Assurance
*   **Error Boundary**: `GlobalErrorBoundary` wraps the app. Check logs if "SYSTEM_FAILURE" screen appears.
*   **Validation**: Run `QA_REPORT.md` checklist before releases.

---

## 7. Troubleshooting

| Error | Cause | Fix |
| :--- | :--- | :--- |
| **"System Failure" Screen** | Runtime React Error | check console logs, fix component logic. |
| **3D Background Missing** | Low FPS Mode Triggered | `EngagementContext` auto-disables 3D on slow devices. Intentional. |
| **Images Not Loading** | Placeholder API Down | Check `next.config.ts` remotePatterns. |

---

## 8. Versioning
*   **Current**: 2.0.0
*   **Strategy**: Semantic Versioning (MAJOR.MINOR.PATCH).
*   **Changelog**: Maintain a `CHANGELOG.md` for future updates.
