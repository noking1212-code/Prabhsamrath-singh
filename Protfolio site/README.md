# Prabhsamrath Singh Personal Brand Website

A premium personal brand website for Prabhsamrath Singh, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, Lenis, Prisma, and PostgreSQL.

## Local Setup

1. Install Node.js 20+.
2. Copy `.env.example` to `.env` and add your PostgreSQL connection string.
3. Install dependencies:

```bash
npm install
```

4. Prepare Prisma:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start the site:

```bash
npm run dev
```

The portrait is available at `/images/profile.jpg` and is used by the hero, metadata, and social preview image.
