# Predictive AI Architecture Plan

## Goal
Transform the platform into a self-learning system that personalizes content based on user intent modeling.

## Core Modules

### 1. User Intent Model (`src/lib/predictive.ts`)
- **Profile**: 
  - `visitCount`: Number of sessions.
  - `intentScores`: `{ technical: number, design: number, business: number }`
  - `lastAction`: Timestamp.
- **Inputs**:
  - `Hover` on Service Card -> +Score to relevant category.
  - `Click` on Project -> +High Score.
- **Persistence**: `localStorage` (Privacy-focused, client-side only).

### 2. Adaptation Logic (in `EngagementContext`)
- **Returning Visitor**:
  - Input: `visitCount > 1`
  - Action: Update Hero Text ("Welcome back, Architect").
- **Intent-Based Highlighting**:
  - Input: `intentScores.technical > intentScores.design`
  - Action: Reorder or Glow "Engineering" modules in Services.

### 3. Implementation Steps
- [ ] Create `PredictiveEngine` class (Singleton).
- [ ] Integrate into `EngagementContext` to track actions.
- [ ] Update `ServicesSection` to read `primaryIntent` and adjust layout.
- [ ] Update `Hero` for returning visitor personalization.

## Technical Constraints
- No server-side storage (GDPR compliant by design).
- Inference must happen < 16ms (1 frame) to ensure smoothness.
