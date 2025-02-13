This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Tech Stack
Frontend :- Next.js with Tailwind CSS

Backend :- Next.js Route API backend

Database :- MongoDB

Deployement :- Vercel

# Links
Video Link :- https://www.loom.com/share/6b9a3900755d409bb5808a64a7732240
 

Deployed Application Link :- https://mini-job-board-alpha.vercel.app/

Github Link :- https://github.com/Rudra-Dey-Sarkar/mini-job-board

# Structure 
Directory structure:
└── rudra-dey-sarkar-mini-job-board/
    ├── README.md
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── actions/
    │   └── db.ts
    ├── components/
    │   ├── ApplicationModal/
    │   │   └── ApplicationModal.tsx
    │   ├── Applications/
    │   │   └── Applications.tsx
    │   ├── ClientLayout/
    │   │   └── ClientLayout.tsx
    │   ├── EditJob/
    │   │   └── EditJob.tsx
    │   ├── Footer/
    │   │   └── Footer.tsx
    │   ├── Jobs/
    │   │   └── Jobs.tsx
    │   ├── Main/
    │   │   └── Main.tsx
    │   ├── New/
    │   │   └── New.tsx
    │   └── Topbar/
    │       └── Topbar.tsx
    ├── public/
    └── src/
        └── app/
            ├── globals.css
            ├── layout.tsx
            ├── page.tsx
            ├── api/
            │   ├── applications/
            │   │   └── route.ts
            │   └── jobs/
            │       └── route.ts
            ├── candidate/
            │   ├── apply/
            │   │   └── [jobId]/
            │   │       └── page.tsx
            │   └── jobs/
            │       ├── page.tsx
            │       └── [id]/
            │           └── page.tsx
            └── company/
                ├── jobs/
                │   ├── page.tsx
                │   └── [id]/
                │       ├── page.tsx
                │       └── applications/
                │           └── page.tsx
                └── new/
                    └── page.tsx


# Contacts
In case you have any doubts you can contact me using below details :- 

Email Id :- rudradeysarkar5@gmail.com 

Contact No. :- +917811914148 

Whatsapp No. :- +919475204453 

LinkedIn :- https://www.linkedin.com/in/rudra-dey-sarkar-5625331ba/

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
