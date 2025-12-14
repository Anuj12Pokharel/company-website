# Codex Neural

Codex Neural is a next-generation IT services platform specializing in AI/ML, Enterprise Web Development, and Digital Transformation.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Visuals**: [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: ESLint 9

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
  - `ui`: Basic atomic components.
  - `layout`: Structural components (Navbar, Footer).
  - `three`: 3D visualizations (Lazy loaded).
- `src/config`: Configuration and Environment Validation (`env.ts`).
- `src/services`: Business logic (Analytics, Predictive Engine).
- `src/types`: Global TypeScript definitions.
- `src/lib`: Legacy utilities (being migrated).

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Copy `.env.example` to `.env.local` and fill in the required values.
    ```bash
    cp .env.example .env.local
    ```
    
    **Email Configuration (for Contact Form):**
    - For Gmail, you need to create an App Password:
      1. Go to your Google Account settings
      2. Enable 2-Step Verification
      3. Go to App Passwords and generate one for "Mail"
      4. Use this App Password (not your regular password) in `SMTP_PASSWORD`
    - Set `SMTP_USER` to your Gmail address
    - Set `CONTACT_EMAIL` to the email where you want to receive contact form submissions

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

## Features & Optimizations

- **SSR Safety**: All Three.js components are dynamically imported with `{ ssr: false }`.
- **Security**: Strict Content Security Policy (CSP) and security headers configured in `next.config.ts`.
- **Environment Validation**: Zod-based schema validation prevents build if env vars are missing.
- **Analytics**: Privacy-safe wrapper ensuring client-side only execution.
- **Performance**: 'useMemo' and 'useCallback' optimizations in critical contexts.
- **Quality Mode**: Automatic performance adaptation based on device capabilities.

## Additional Features

- **Contact Form with Email**: Contact form submissions are sent directly to your Gmail. See [`EMAIL_SETUP.md`](./EMAIL_SETUP.md) for configuration.
- **WhatsApp Bot Agent**: Interactive WhatsApp bot that collects user information and forwards it to your email. See [`WHATSAPP_BOT_SETUP.md`](./WHATSAPP_BOT_SETUP.md) for setup instructions.

## Post-Launch Monitoring

See [`POST_LAUNCH.md`](./POST_LAUNCH.md) for comprehensive monitoring checklist and [`DO_NOT_BREAK.md`](./DO_NOT_BREAK.md) for critical system guards.
