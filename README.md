# RecruitFlow MVP

A premium, Kanban-style Applicant Tracking System (ATS) dashboard built with a focus on modern aesthetics, fast interactions, and maintainable architecture.

## Core Features

- **Kanban Pipeline:** Config-driven columns mapping to logical hiring stages.
- **Premium Interactivity:** Framer Motion powers card hover scaling, and `@dnd-kit` manages robust drag operations.
- **Candidate Profiles:** Detailed lateral drawer containing role, status, timeline history, and quick-actions.
- **Persistence Layer:** Synchronizes both candidate states and UI Theme preferences seamlessly through `localStorage`.
- **Dark Mode Support:** Fluid transitions built natively with Material UI's Theme Provider.

## Technology Stack

- **Framework:** Next.js (App Router)
- **Library:** React 18, TypeScript
- **Styling:** Material UI v5, Emotion, Custom theme configuration
- **Animation & DND:** Framer Motion, `@dnd-kit`

## Architectural & Design Decisions

- **Manual Bootstrapping:** Constructed entirely without `create-next-app` constraints. Provides absolute control over package versions and configuration files (`next.config.mjs`, `tsconfig.json`).
- **Context API vs Redux:** Context API provides an elegant, lightweight approach for state management, specifically tuned for MVP scale without boilerplating Redux.
- **DND Overlay:** By leveraging `@dnd-kit/core`'s `DragOverlay`, dragging candidate cards visually snaps above other elements smoothly.
- **Typography & Scale:** Utilizing an 8px scale, Inter fonts, and soft 20px dynamic shadowing, achieving the highly-requested "Linear/Stripe" aesthetic.

## Development Setup

```bash
# 1. Install Dependencies
npm install

# 2. Run Development Server
npm run dev
```

Browse to [http://localhost:3000](http://localhost:3000).

## Future Improvements

- Implement persistent database backend (PostgreSQL / Prisma).
- Integrate OAuth2 authentication (NextAuth).
- Advanced board filtering (search, tag grouping, role sorting).
