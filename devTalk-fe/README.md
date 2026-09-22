# hi-devs Frontend

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=0B1220)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State-443E38?style=for-the-badge)
![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-Quality-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-Formatting-F7B93E?style=for-the-badge&logo=prettier&logoColor=0B1220)

hi-devs is a developer community platform designed for learning, collaboration,
and career growth. Users can ask technical questions, publish engineering blog
posts, discover jobs, apply to open roles, manage professional profiles, and
receive real-time notifications as the community interacts with their content.

This repository contains the production frontend for the platform. It is built
with the Next.js App Router, React Server Components, server actions, typed API
helpers, Zod-powered validation, Zustand client stores, and a reusable UI layer.
The application is structured to keep feature routes, server mutations, shared
types, validation schemas, and client state easy to find and maintain as the
product grows.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Quality Checks](#quality-checks)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- **Authentication and session management**: Users can sign in and sign up
  through dedicated auth routes. Access and refresh tokens are managed through
  HTTP-only cookies, reducing the amount of sensitive session data exposed to
  client-side JavaScript.

- **Protected application routes**: Private areas such as profile editing, job
  creation, blog creation, question creation, applications, and settings are
  guarded through Next.js proxy middleware. Unauthenticated users are redirected
  to sign in with callback support.

- **Questions workflow**: The app includes question listing, question detail
  pages, question creation, tag support, likes, and comments. This gives users a
  familiar community Q&A flow for asking and discussing technical problems.

- **Blogs workflow**: Developers can publish longer-form posts with title,
  description, cover image, and tags. Blog feeds and detail pages support
  discovery, engagement, and discussion through likes and comments.

- **Jobs and applications**: Recruiters or job posters can create job listings
  with role details, employment type, location, salary range, skills, and expiry
  dates. Developers can submit applications with resume links, contact email,
  and cover letters.

- **Application tracking**: Application pages are designed for both applicants
  and job owners. The UI supports status visibility and decision flows such as
  accepting or rejecting applications.

- **User profiles**: Profile pages present a developer's identity, skills,
  biography, location, website, and social links. The edit flow is split into
  focused sections to make profile management easier to maintain and extend.

- **Real-time notifications**: Socket.IO powers live notification delivery for
  important events such as likes, comments, applications, and other community
  interactions. Zustand stores keep notification state available across the UI.

- **Validated forms**: Feature forms use React Hook Form with Zod schemas for
  predictable client-side validation, typed form data, and consistent error
  messages.

- **Reusable design system**: Shared layout components, buttons, cards, dialogs,
  inputs, selects, tabs, badges, avatars, and alert dialogs keep the UI
  consistent across all major product areas.

- **Production quality tooling**: ESLint, TypeScript, Prettier, Husky,
  Commitlint, and GitHub Actions are configured so the repository can enforce
  formatting, static analysis, type safety, and production builds in CI.

## Tech Stack

| Area       | Tools                                                                                                                                                                                                 | Why it is used                                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | ![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)                                                                                                             | Provides App Router routing, layouts, server rendering, API routes, proxy middleware, image optimization, and production build tooling.                 |
| UI Runtime | ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=0B1220)                                                                                                                    | Powers the component model for server and client UI, including interactive forms, cards, navigation, modals, and realtime notification surfaces.        |
| Language   | ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)                                                                                                       | Keeps API responses, form payloads, server actions, component props, and shared domain models strongly typed throughout the codebase.                   |
| Styling    | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)                                                                                                  | Enables a consistent utility-first styling workflow for responsive layouts, spacing, colors, typography, and reusable UI primitives.                    |
| Components | ![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-161618?logo=radixui&logoColor=white), shadcn-style components                                                                            | Supplies accessible primitives for dialogs, dropdowns, selects, tabs, avatars, labels, and other UI controls while preserving full styling control.     |
| Forms      | ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-Forms-EC5990?logo=reacthookform&logoColor=white), ![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?logo=zod&logoColor=white) | Handles performant form state and schema-based validation for sign in, sign up, questions, blogs, jobs, applications, and profile editing.              |
| State      | ![Zustand](https://img.shields.io/badge/Zustand-Client_State-443E38)                                                                                                                                  | Manages lightweight client-side state for authentication, shell UI, sockets, and persisted notifications without heavy boilerplate.                     |
| Realtime   | ![Socket.IO](https://img.shields.io/badge/Socket.IO-WebSockets-010101?logo=socketdotio&logoColor=white)                                                                                               | Maintains authenticated realtime connections for notification delivery and live state updates across the app.                                           |
| Icons      | ![Lucide](https://img.shields.io/badge/Lucide_React-Icons-F56565?logo=lucide&logoColor=white)                                                                                                         | Provides a consistent icon language for navigation, buttons, empty states, metadata, and action controls.                                               |
| Quality    | ![ESLint](https://img.shields.io/badge/ESLint-Linting-4B32C3?logo=eslint&logoColor=white), ![Prettier](https://img.shields.io/badge/Prettier-Formatting-F7B93E?logo=prettier&logoColor=0B1220)        | Enforces code quality and formatting so contributions remain consistent and easier to review.                                                           |
| Git Hooks  | Husky, Commitlint, Commitizen                                                                                                                                                                         | Runs local checks before commits and encourages Conventional Commit messages for cleaner history, changelog generation, and maintainable collaboration. |

## Architecture

The frontend is organized around product features and shared infrastructure. The
`app` directory contains App Router routes, route groups, layouts, loading
boundaries where needed, and API routes owned by the frontend. Feature folders
keep page-level components close to the routes that use them, while shared
components live under `components`.

Server components are used for pages that can fetch data before rendering, such
as feeds, detail pages, profile pages, and application pages. Client components
are used where the browser needs to manage local interaction, including forms,
navigation drawers, like buttons, modals, notification dropdowns, and socket
listeners.

Authentication is cookie based. Access and refresh tokens are stored as
HTTP-only cookies on the server. The `proxy.ts` file protects routes before they
render, validates access tokens, refreshes expired sessions when possible, and
redirects unauthenticated users to the sign-in page. The `/api/token` route
gives client-side code a controlled way to request a fresh access token without
directly reading HTTP-only cookies.

API communication is centralized through the `fetcher` utility and small method
wrappers such as `get`, `post`, `patch`, and `del`. This keeps request
construction, query parameters, authentication headers, timeouts, retries, and
token refresh behavior in one place. Server mutations are placed in `actions`,
where they can read cookies, call backend endpoints, and revalidate affected
Next.js routes after successful writes.

Validation and type safety are intentionally separated from UI components. Zod
schemas in `schemas` define form contracts, while interfaces in `types` define
backend response shapes and shared domain models. This makes it easier to change
the UI without losing confidence in payload and response structure.

## Getting Started

To run the frontend together with the API, MongoDB, and Redis without installing Node.js locally, use Docker Compose from the parent workspace:

```bash
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000).

### Prerequisites

- **Node.js 22 or newer**: The CI pipeline uses Node 22, so matching that
  version locally helps avoid environment-specific build differences.
- **npm 10 or newer**: The repository includes a `package-lock.json`, so npm is
  the expected package manager for reproducible installs.
- **A running hi-devs backend API**: Most pages depend on API responses for
  questions, blogs, jobs, profiles, applications, comments, notifications, and
  authentication.

### Installation

```bash
git clone <repository-url>
cd hi-devs-fe
npm install
```

Create a local environment file for your machine:

```bash
cp .env.example .env
```

If `.env.example` is not present yet, create `.env` manually using the variables
listed below. The app validates required environment variables at runtime, so a
missing or invalid API URL will fail early instead of producing confusing
network errors later.

Start the development server after dependencies and environment variables are in
place:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app
will use the configured backend API for data, authentication, and realtime
features.

## Environment Variables

Environment variables are parsed in `utils/env.ts` with Zod. This gives the app
a single source of truth for required runtime configuration and makes invalid
deployments fail loudly during startup or build-time evaluation.

| Variable                 | Required    | Description                                                                                                                                                                 | Example                 |
| ------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL`    | Yes         | Base URL of the backend API. All relative API calls from the shared fetch utilities are resolved against this value. It must be a valid URL and should not include a route. | `http://localhost:8080` |
| `NEXT_PUBLIC_DEPLOY_URL` | Recommended | Public URL of this frontend. Client utilities use it when calling frontend-owned API routes such as `/api/token`. In Vercel, `VERCEL_URL` can be used as a fallback.        | `http://localhost:3000` |
| `API_URL`                | Optional    | Server-only API origin. Use this in Docker so Next.js server code can reach the backend by service name while the browser still uses `NEXT_PUBLIC_API_URL`.                 | `http://backend:8080`   |
| `COOKIE_SECURE`          | Optional    | Set to `false` when serving the app over HTTP (local Docker). Defaults to secure cookies when `NODE_ENV` is `production`.                                                   | `false`                 |

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_DEPLOY_URL=http://localhost:3000
```

## Available Scripts

| Script               | Description                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`        | Starts the Next.js development server with hot reloading for local feature work and UI iteration.                                               |
| `npm run build`      | Creates an optimized production build, validates routes, compiles TypeScript through Next.js, and reports static or dynamic rendering behavior. |
| `npm run start`      | Runs the compiled production application after `npm run build`. Use this to smoke test production behavior locally.                             |
| `npm run lint`       | Runs ESLint using the Next.js core web vitals and TypeScript rules configured in `eslint.config.mjs`.                                           |
| `npm run type-check` | Runs TypeScript project checks with `tsc -b` to catch type errors that may not appear during normal editing.                                    |
| `npm run format`     | Formats the full repository with Prettier, including Tailwind class sorting through the configured plugin.                                      |
| `npm run lint:fix`   | Runs the configured lint fix command for automatically fixable style and lint issues.                                                           |

## Project Structure

```text
.
├── actions/              # Server actions for authenticated mutations
├── app/                  # Next.js App Router routes, layouts, and API routes
│   ├── (auth)/           # Sign in and sign up pages
│   ├── (main)/           # Main application shell and feature routes
│   └── api/              # Frontend API routes
├── components/           # Shared UI, layout, buttons, comments, and modals
├── constants/            # Navigation and route configuration
├── lib/                  # Shared library helpers
├── public/               # Static assets
├── schemas/              # Zod validation schemas
├── store/                # Zustand client stores
├── types/                # Shared TypeScript interfaces
└── utils/                # Fetching, environment, token, and helper utilities
```

### Directory Responsibilities

- `actions`: Server actions that perform authenticated mutations such as
  creating questions, publishing blogs, posting jobs, updating profiles, liking
  resources, submitting applications, and deleting notifications.

- `app`: Route-level code for the Next.js App Router. It contains auth pages,
  main application pages, nested feature components, layouts, dynamic routes,
  and frontend-owned API routes.

- `components`: Reusable components shared across routes, including layout
  pieces, navigation, cards, buttons, comments, modals, and UI primitives.

- `constants`: Shared route and navigation configuration. Route helpers here are
  used by middleware/proxy logic and navigation components.

- `schemas`: Zod schemas that define validation rules for forms and user input.
  These schemas keep validation behavior consistent across feature flows.

- `store`: Zustand stores for client-side state such as authenticated user data,
  sidebar state, socket connection status, and notifications.

- `types`: Shared TypeScript interfaces for API responses and domain models such
  as users, jobs, blogs, questions, applications, comments, and notifications.

- `utils`: Infrastructure helpers for API fetching, environment parsing, token
  refresh, HTTP methods, API errors, and shared fallback data.

## Quality Checks

Run these commands before opening a pull request or deploying a new build:

```bash
npm run lint
npm run type-check
npm run build
```

Each command protects a different part of the production surface. Linting keeps
the codebase consistent and catches common React/Next.js issues. Type checking
validates contracts across components, server actions, schemas, and API
responses. The production build verifies that Next.js can compile, collect page
data, and classify routes correctly.

The repository also includes:

- **Husky pre-commit checks**: Runs linting and type checking before commits so
  avoidable issues are caught locally.
- **Commitlint with Conventional Commits**: Encourages predictable commit
  messages that are easier to scan, automate, and use in release workflows.
- **GitHub Actions CI**: Installs dependencies with `npm ci`, then runs lint,
  type check, and production build on every push and pull request.

## Deployment

The app is ready to deploy on platforms that support Next.js, including Vercel,
Netlify, Docker-based platforms, and custom Node.js hosting.

The production deployment should always point to a stable backend API and a
public frontend URL. Because authentication and token refresh depend on cookies
and frontend API routes, environment variables must match the deployed origin
and backend configuration. If the frontend URL is incorrect, client-side token
refresh calls may target the wrong host.

For production deployments:

1. Set `NEXT_PUBLIC_API_URL` to the production backend URL.
2. Set `NEXT_PUBLIC_DEPLOY_URL` to the public frontend URL.
3. Run `npm run build`.
4. Start with `npm run start`, or use the platform's Next.js adapter.

Recommended deployment checks:

- Confirm sign in, sign up, and logout work with production cookies.
- Verify protected routes redirect unauthenticated users correctly.
- Open question, blog, job, profile, notification, and application pages.
- Submit at least one form against a staging or production-safe backend.
- Confirm realtime notifications connect successfully over Socket.IO.

## Contributing

1. Create a feature branch from the latest main branch. Use a focused branch
   name that describes the work, such as `feature/profile-editing` or
   `fix/token-refresh`.
2. Keep changes scoped to the feature or bug you are working on. Avoid mixing
   unrelated refactors with product changes unless the refactor is required for
   the implementation.
3. Follow the existing folder patterns. Route-specific components should stay
   near their routes, while reusable pieces should move into `components`,
   `utils`, `types`, `schemas`, or `store` as appropriate.
4. Add or update validation, types, loading states, empty states, and error
   states when touching user-facing flows.
5. Run lint, type check, and build before submitting. A pull request should be
   reviewable without requiring the reviewer to fix local quality issues first.
6. Use Conventional Commits for commit messages, for example
   `feat: add profile skills editor` or `fix: handle expired access token`.

## License

This project is private. Update this section if the repository is published
under an open-source license.
