# CPSAR Website

The Clinical Psychology Students Association of Rwanda website, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Getting started

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available commands

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm start` serves a production build.
- `npm run lint` runs ESLint.

Page routes are defined in `src/app`. Shared site sections and page content are in `src/app/components` and `src/app/pages`.

## Supabase setup

1. Create a Supabase project and copy `.env.example` to `.env.local`.
2. Add the project URL and publishable key from the Supabase project API settings to `.env.local` as `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. Do not use a service-role or secret key.
3. Run both migrations in order in the Supabase SQL Editor: `20261011000000_initial_cpsar_data.sql`, then `20261015000000_admin_cms.sql`.
4. In Supabase Authentication, create an account for each staff member who needs website access. Copy its user UUID and run `insert into public.site_admins (user_id) values ('USER-UUID-HERE');` in the SQL Editor. Only active UUIDs in this table can sign in to the admin area.
5. Add published program, event, article, leadership, partner, alumni, testimonial, and resource records from `/admin`. Visitors only see records marked Published. Contact messages and newsletter subscriptions submitted by the public are stored in Supabase and can be reviewed in the admin area.
6. Restart the development server after setting environment values.

The CMS uses Supabase Auth and row-level security with the publishable key; do not add a service-role/secret key to the website. The second migration creates the `cpsar-resources` public download bucket for PDF/DOC/DOCX files (maximum 20 MB) and restricts uploads to authorized staff. Donation information is a contact path; configure an official payment provider or donation details before accepting online payments.
