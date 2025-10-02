Patient Education Generator

A Next.js app that generates patient-friendly condition guides with citations. Fully supports English/Arabic, RTL/LTR, and accessible UI.

Features

Form: condition, language (en/ar), reading level, sources (URLs)

Results: titled sections with citations and simple provenance

Internationalization: locale routes (/en, /ar) with RTL handling

UX states: loading, empty, and error

Modern stack: Next.js 15, React 19, Tailwind CSS v4, TypeScript

Tech

Next.js 15 / React 19

TypeScript

Tailwind CSS v4

next-intl for i18n

Lightweight UI primitives

Prerequisites

Node.js ≥ 20

Getting Started
npm install
npm run dev
# open http://localhost:3000

Scripts
{
  "dev": "next dev --turbopack",
  "build": "next build --turbopack",
  "start": "next start",
  "lint": "eslint"
}

Internationalization & RTL

Middleware redirects / to /en.

Visit /ar for Arabic (RTL).

lang and dir are set from the active locale in the app layout.

Translation messages live in src/messages/en.json and src/messages/ar.json.

API (Mock)

POST /api/generate (route handler inside the app)

Request

{
  "condition": "Hypertension",
  "language": "en",
  "readingLevel": "basic",
  "sources": ["https://who.int/..."]
}


Response

{
  "title": "Hypertension — Patient Guide",
  "sections": [
    { "heading": "What is it?", "text": "...", "citations": ["https://who.int/..."] },
    { "heading": "How to manage", "text": "...", "citations": ["https://cdc.gov/..."] }
  ],
  "lineage": { "createdAt": "2025-01-01T00:00:00Z", "sourcesCount": 2 }
}

Project Structure (high level)
src/
  app/
    [locale]/            # /en, /ar
      page.tsx
      layout.tsx
      route.ts           # mock API (POST /api/generate)
    middleware.ts
    globals.css
  components/
    GeneratorForm.tsx
    GeneratorClient.tsx
    ui/
  lib/
    i18n.ts              # locales, RTL flag, message loading
  messages/
    en.json
    ar.json

Deployment

Recommended: Vercel (Next.js preset).

No env vars needed for the mock.

License

MIT