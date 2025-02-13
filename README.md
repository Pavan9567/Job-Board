This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Set Up instructions

# Tech Stack Used
1) Backend : Next.js Server Actions + Neon DB/Postgresql, TypeScript
2) Frontend : Next.js 15 with App Router, TypeScript, Tailwindcss, shadcn/ui

# Candidate Flow
1) Job Listings Page - /candidate/jobs
2) Job Details Page - /candidate/jobs/[jobId]
3) Applying to a job - /candidate/apply/[jobId]

# Company Flow
1) Job Dashboard - /company/jobs
2) Post a job - /company/jobs/create
3) Manage Applications - /company/jobs/[jobId]/applications

# Core API End points (via Server Actions)
1) POST /api/jobs - create a new job
2) GET /api/jobs - fetch all jobs
3) GET /api/jobs/:id - fetch job details by ID
4) POST /api/applications - Submit a job application

# Database design
 # Tables
 1) Job - job details ( title, company, description)
 2) Applications - candidate applications linked to jobs ( name,email,resumeUrl,jobId)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
