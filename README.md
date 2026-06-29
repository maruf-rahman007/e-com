# ShopNext — Full Stack E-Commerce

A full stack mini e-commerce application built as an interview assignment. Covers REST API design, Prisma ORM, SSR/SSG, infinite scrolling, URL-based filter state, JWT authentication, and global cart state.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| State | Zustand (cart + auth) |
| Backend | Node.js + Express, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` |

---

## Architecture

```
Browser
  ├─ /products          SSR — server fetches from Express on every request
  ├─ /products/[id]     SSG — pre-built at build time, revalidates hourly
  ├─ /cart              CSR — Zustand + localStorage, protected by Proxy
  ├─ /checkout          CSR — protected by Proxy
  ├─ /login             CSR
  └─ /register          CSR

Next.js server ──HTTP──► Express REST API (port 5000)
                                  │
                             Prisma ORM
                                  │
                           PostgreSQL DB
```

All runtime product requests hit the Express API — never DummyJSON directly. Filters (search, category, price range, pagination) run at the database query level via Prisma.

### Route Protection

`proxy.ts` (Next.js 16 Middleware) checks for an `auth-token` cookie. If missing, redirects to `/login?redirect=<path>`. After login, the token is stored in Zustand (persisted to `localStorage`) and synced to a cookie for the proxy to read.

---

## Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ (or Docker)

### 1. Database

**Option A — Docker (recommended):**
```bash
docker run -d \
  --name ecommerce_pg \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=ecommerce \
  -p 5432:5432 \
  postgres:16-alpine
```

**Option B — Local PostgreSQL:**
```bash
psql -U postgres -c "CREATE DATABASE ecommerce;"
```

### 2. Backend

```bash
cd backend
npm install

# Copy and edit environment variables
cp .env.example .env
# Edit .env: set DATABASE_URL, JWT_SECRET

# Run Prisma migration (creates tables)
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed the database (100 products from DummyJSON — one-time only)
npm run seed

# Start dev server
npm run dev
# → http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install

# Copy environment variables (defaults work for local dev)
cp .env.local.example .env.local

# Start dev server
npm run dev
# → http://localhost:3000
```

---

## Environment Variables

### `backend/.env`

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:password@localhost:5432/ecommerce` |
| `PORT` | API server port | `5000` |
| `FRONTEND_URL` | CORS allowed origin | `http://localhost:3000` |
| `JWT_SECRET` | Secret for JWT signing | `change-me-in-production` |

### `frontend/.env.local`

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | API URL for client-side fetches | `http://localhost:5000` |
| `API_BASE_URL` | API URL for server-side fetches (SSR/SSG) | `http://localhost:5000` |

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products` | Paginated list with search, category, price filters |
| `GET` | `/api/products/:id` | Single product (404 if not found) |
| `GET` | `/api/categories` | List of all categories |
| `POST` | `/api/auth/register` | Create account → returns JWT |
| `POST` | `/api/auth/login` | Sign in → returns JWT |

**Query params for `GET /api/products`:**
- `page` — page number (default: 1)
- `limit` — items per page, max 100 (default: 12)
- `search` — case-insensitive title search
- `category` — category slug exact match
- `minPrice` / `maxPrice` — price range filters

All filtering runs in SQL via Prisma WHERE clauses (never in-memory).

---

## Pages

| Route | Strategy | Auth required |
|---|---|---|
| `/products` | SSR | No |
| `/products/[id]` | SSG + hourly revalidation | No |
| `/cart` | CSR | Yes |
| `/checkout` | CSR | Yes |
| `/login` | CSR | No |
| `/register` | CSR | No |

---

## Key Features

- **Infinite scrolling** — IntersectionObserver sentinel loads next page when visible
- **URL-based filter state** — all filters reflected in URL, shareable and restorable
- **SSR product list** — first render with filters from URL; client takes over for infinite scroll
- **SSG product detail** — pre-built at build time, revalidates hourly
- **JWT auth** — register/login, cookie-based session, Next.js Proxy guards protected routes
- **Global cart** — Zustand store persisted to localStorage, shared across all pages
- **Loading skeletons** — grid skeleton shown during SSR Suspense boundaries
- **Responsive design** — works on mobile through desktop
- **Docker Compose** — `docker-compose.yml` at root for one-command setup

---

## Assumptions & Limitations

- Cart is client-side only (Zustand + localStorage). No server-side cart API.
- Checkout form is a UI demo — no payment processing.
- SSG pre-builds all product pages at build time; new products added after build are rendered on-demand (ISR via `revalidate: 3600`).
- The seed script calls DummyJSON once at setup time. All runtime requests go through the local Express API.
- CORS is restricted to `FRONTEND_URL` — update this in production.
- JWT tokens are stored in a client-readable cookie (not `httpOnly`) so the Next.js Proxy can access them. In production, consider moving auth to a Next.js Route Handler that sets an `httpOnly` cookie.

---

## Docker Compose (Full Stack)

```bash
# From project root
docker-compose up --build
```

This starts PostgreSQL + the backend. You still run the frontend separately with `npm run dev`.

---

## Project Structure

```
e-com/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # DB schema
│   │   └── seed.ts            # DummyJSON → DB seeder
│   ├── src/
│   │   ├── config/env.ts
│   │   ├── controllers/       # Request handlers
│   │   ├── lib/prisma.ts      # Prisma client singleton
│   │   ├── middlewares/       # errorHandler, validateQuery, authenticate
│   │   ├── routes/            # Express routers
│   │   └── services/          # DB queries (Prisma)
│   └── server.ts
├── frontend/
│   ├── app/                   # Next.js App Router pages
│   ├── components/            # React components
│   ├── hooks/                 # useFilters, useInfiniteProducts, useAuth
│   ├── lib/                   # api.ts, utils.ts
│   ├── store/                 # cartStore.ts, authStore.ts (Zustand)
│   ├── types/                 # Shared TypeScript types
│   └── proxy.ts               # Route protection (Next.js 16 Proxy)
├── docker-compose.yml
└── README.md
```
