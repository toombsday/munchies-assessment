
# Munchies

Minimal Next.js + TypeScript app used for the assessment. This repository provides a small example app that lists restaurants and allows filtering by category.

## Overview

- Next.js (App Router) with TypeScript
- Minimal UI components in `src/app/components`
- Proxy API routes under `src/app/api` used to fetch remote data (with an in-memory caching layer)
- Images served from `public/` and external images allowed via `next.config.ts`

## Requirements

- Node.js 18+ (recommended)
- npm (or yarn/pnpm)

## Setup

1. Install dependencies

```bash
npm install
```

2. Add environment variables (create a `.env.local` in the repo root)

Example `.env.local`:

```
NEXT_PUBLIC_API_HOSTNAME=work-test-web-2024-eze6j4scpq-lz.a.run.app
NEXT_PUBLIC_API_URL=https://work-test-web-2024-eze6j4scpq-lz.a.run.app/api
```

- `NEXT_PUBLIC_API_URL` is the base URL used by the proxy API routes (`/restaurants`, `/filters`).
- `NEXT_PUBLIC_API_HOSTNAME` is used in `next.config.ts` for `images.remotePatterns` so `next/image` can load external images from that host.

3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm run dev` — run development server
- `npm run build` — build for production
- `npm run start` — run the built app

## Project structure

- `next.config.ts` — Next.js configuration (image domains / remotePatterns)
- `src/app/` — app router pages and layout
	- `src/app/page.tsx` — restaurants listing page
	- `src/app/api/` — proxy API route handlers (`/api/restaurants`, `/api/filters`)
	- `src/app/components/` — UI components such as `RestaurantCard` and `FilterButton`
- `public/` — static files, including `munchies-logo.svg`

