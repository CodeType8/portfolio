# Portfolio Frontend Platform Overview

This document explains the design, technology choices, security posture, and design system strategy for the portfolio frontend. Although the current codebase is powered by React + Vite for rapid iteration, the production blueprint targets **Next.js 15**, **React (JavaScript)**, **Tailwind CSS**, **Express.js**, **PostgreSQL**, and **Sequelize** to deliver a modern, modular, and secure experience.

Backend: https://api.codetypeweb.com/ 
Frontend: https://codetypeweb.com/

## 1. Solution Goals
- Provide a performant SPA/SSR experience with predictable routing and data-fetching hooks.
- Maintain a strict separation between presentation, domain logic, and data access so that features scale safely.
- Embed defensive coding standards (content security, authentication boundaries, secure storage) throughout the stack.
- Support rapid design experimentation using an accessible, token-driven Tailwind theme.
- Guarantee a high signal-to-noise developer environment through linting, automated testing, and CI-ready scripts.

## 2. Architectural Summary
| Layer | Purpose | Key Details |
| --- | --- | --- |
| **Next.js 15 App Router** | Routing, layout composition, streaming SSR, route segment caching. | File-based routes in `src/app`; shared layouts for typography and SEO metadata. |
| **React Presentation** | Declarative UI with hooks and context. | Functional components only, custom hooks for domain concerns. |
| **Tailwind CSS** | Utility-first styling with design tokens. | Local design tokens defined in `tailwind.config.js` with CSS variables for light/dark modes. |
| **Express.js API Gateway** | Secure BFF layer for external integrations. | Controllers delegate to services, which call Sequelize models. Input validation via `zod` or `joi`. |
| **PostgreSQL + Sequelize** | Relational persistence. | Migrations define schema, models expose typed accessors, services enforce business rules. |
| **Testing Stack** | Quality guardrails. | Vitest / Jest for units, React Testing Library for UI, Supertest for APIs, Playwright for smoke E2E. |

## 3. Development Workflow
1. `npm install`
2. `npm run dev` (Vite) or `npm run dev:next` (Next.js 15 target build) with hot module reload.
3. `npm run lint` to enforce ESLint + Prettier rules.
4. `npm run test` for Vitest/Jest suites.
5. `npm run build && npm run preview` to simulate production.

> **Tip:** Configure `.env.local` for frontend secrets (public API URLs) and `.env` for backend-only values (database credentials, JWT secrets). Never commit secrets; rely on environment-specific `.env.*.local` files that are git-ignored.

## 4. Reference Implementation
The following snippets illustrate the required modular structure for new features. They assume a **Next.js 15** app running inside this repository.

### 4.1 UI Layer (`src/app/(marketing)/page.js`)
```jsx
// File: src/app/(marketing)/page.js
import FeatureHero from "@/ui/sections/FeatureHero";
import useMetrics from "@/ui/hooks/useMetrics";

// Renders the marketing landing page with live metrics pulled via hooks
export default function MarketingPage() {
  // Holds the latest platform telemetry for the hero section
  const { data, isLoading } = useMetrics();

  // Guard rendering while metrics load
  if (isLoading) {
    return <p className="text-center text-slate-500">Loading stats...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <FeatureHero metrics={data} />
    </main>
  );
}
```

### 4.2 Controller Layer (`src/server/controllers/metrics.controller.js`)
```js
// File: src/server/controllers/metrics.controller.js
import metricsService from "../services/metrics.service.js";

// Handles HTTP requests for the metrics dashboard
export async function getMetrics(req, res, next) {
  try {
    // Extracts optional cache-busting query flag from the request
    const { fresh = false } = req.query;

    // Delegates to the service which applies validation & caching
    const metrics = await metricsService.fetchMetrics({ fresh: fresh === "true" });

    return res.status(200).json({ metrics });
  } catch (error) {
    return next(error);
  }
}
```

### 4.3 Service Layer (`src/server/services/metrics.service.js`)
```js
// File: src/server/services/metrics.service.js
import metricsModel from "../models/metrics.model.js";
import { cacheClient } from "../lib/cache.js";

// Encapsulates business logic and caching for metrics
async function fetchMetrics({ fresh }) {
  // Cache key ensures consistent retrieval per user segment
  const cacheKey = "metrics:marketing";

  // Step 1: serve cached payload when available and fresh flag is false
  if (!fresh) {
    const cached = await cacheClient.get(cacheKey);
    if (cached) return JSON.parse(cached);
  }

  // Step 2: read aggregated metrics from the database model
  const metrics = await metricsModel.getAggregatedMetrics();

  // Step 3: update cache asynchronously for subsequent requests
  cacheClient.set(cacheKey, JSON.stringify(metrics), { EX: 60 });

  return metrics;
}

export default { fetchMetrics };
```

### 4.4 Model Layer (`src/server/models/metrics.model.js`)
```js
// File: src/server/models/metrics.model.js
import { MetricSnapshot } from "../database/models/index.js";

// Provides aggregated metrics from the PostgreSQL database
async function getAggregatedMetrics() {
  // Fetches last 24h engagement, conversion, and traffic counts
  const rows = await MetricSnapshot.findAll({
    attributes: ["timestamp", "engagement", "conversions", "traffic"],
    order: [["timestamp", "DESC"]],
    limit: 24
  });

  return rows.map((row) => row.toJSON());
}

export default { getAggregatedMetrics };
```

### 4.5 Testing (`src/server/controllers/__tests__/metrics.controller.test.js`)
```js
// File: src/server/controllers/__tests__/metrics.controller.test.js
import request from "supertest";
import app from "../../../server.js";

// Confirms the metrics endpoint responds with sanitized payloads
describe("GET /api/metrics", () => {
  it("returns metrics array", async () => {
    const response = await request(app).get("/api/metrics");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.metrics)).toBe(true);
  });
});
```

#### How It Works & Architectural Reasoning
- The **UI layer** uses a hook (`useMetrics`) to fetch SSR-friendly data, making hydration predictable.
- **Controllers** remain thin, focusing on translating HTTP semantics and delegating to services.
- **Services** consolidate validation, caching, rate limiting, and business-specific calculations.
- **Models** offer a narrow data-access layer via Sequelize models; migrations live alongside models to keep schema evolution traceable.
- This separation ensures that each layer is unit-testable and enforces clean dependencies (UI ➜ API ➜ Service ➜ Model).

#### Why This Approach
- Supports SSR/ISR by keeping data-fetch logic deterministic.
- Simplifies testing because each unit has a singular responsibility.
- Encourages secure defaults by centralizing caching and validation logic.

#### Refactoring, Testing & Security Considerations
- **Refactor:** Extract shared Tailwind tokens into `src/ui/tokens.js` and share across CSS + JS.
- **Refactor:** Promote repeated service logic (e.g., caching) into decorators/middleware to avoid duplication.
- **Testing:** Add React Testing Library specs for components using mocked hooks; include contract tests for Sequelize models with a Dockerized PostgreSQL.
- **Security:** Enforce strict CSP headers via `next.config.js`, validate all inputs with schemas, sanitize outputs before rendering, and enable HTTP-only secure cookies for authentication tokens.

## 5. Design System
- Tailwind config defines semantic tokens (`--color-primary`, `--color-accent`) and typography scales (fluid `clamp`).
- Components adhere to WCAG AA by default, using accessible color contrasts and keyboard focus indicators.
- Use Radix UI primitives for consistent focus management.
- Document components in Storybook to serve as the single source of truth for UX, accessibility, and responsive behavior.

## 6. Performance & Monitoring
- Next.js Route Segment Config caching + `useSuspenseQuery` for data streaming.
- Image optimization via Next.js `<Image />` component and AVIF output.
- Client metrics captured via `web-vitals` and relayed to the Express API for persistence.
- Synthetic monitoring & RUM dashboards track Core Web Vitals per release.

## 7. Security Checklist
- ✅ Enforce HTTPS, HSTS, and secure cookies.
- ✅ CSRF protection via double-submit cookie pattern.
- ✅ Rate limit sensitive endpoints and audit logs via Express middleware.
- ✅ Input validation (zod/joi) + output escaping (DOMPurify) to block injection.
- ✅ Secrets rotated through environment variables managed by the deployment platform (e.g., Doppler, Vault).

## 8. Deployment & CI/CD
- GitHub Actions pipeline: lint ➜ unit tests ➜ integration tests ➜ build ➜ deploy preview.
- Preview deployments to Vercel (frontend) and Fly.io/Render (Express API) for QA sign-off.
- Production release requires green tests, manual approval, and database migration confirmation.

## 9. Future Enhancements
1. Add `next-safe-action` to enforce end-to-end typed server actions.
2. Integrate `react-email` for transactional previews inside the same monorepo.
3. Expand Playwright smoke coverage for authenticated dashboards.

---
This README is the canonical source for onboarding, architecture, and quality standards. Keep it updated as the platform evolves.
