# Swashine Glowbox – Premium LED Glowbox Website

Production-ready React website for Swashine Glowbox (Swastik Industries), Rajkot.

## Tech Stack
- React 18 + Vite
- React Router DOM
- Framer Motion (animations)
- Tailwind CSS
- Firebase (ready for Auth + Firestore)
- Formik + Yup (forms)
- Lucide React (icons)

## Folder Structure
```
src/
├── components/
│   ├── common/     # Button, Input
│   └── global/     # Header, Footer
├── pages/          # Home, Products, About, Gallery, Custom, Contact
├── layouts/        # MainLayout
├── context/        # ThemeContext
├── data/           # company.js (all content)
├── services/       # firebase.js, contactService.js
├── hooks/
└── utils/
```

## Getting Started
```bash
npm install
npm run dev
```

## Environment
Create `.env` with your Firebase keys:
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
```

## SEO and custom domain

The site sets route-specific titles, descriptions, canonical URLs, Open Graph and
Twitter metadata, and structured data for the home page and products. Vercel
serves `/robots.txt` and `/sitemap.xml`; both use `SITE_URL` (or
`VITE_SITE_URL`) when configured and otherwise use the incoming HTTPS hostname.

After purchasing a domain:

1. Add the domain to the Vercel project and apply the DNS records Vercel provides.
2. Set `VITE_SITE_URL` in the production build environment to the preferred
   canonical origin, for example `https://www.example.com` (no path or trailing
   slash), and set `SITE_URL` to the same value for the sitemap and robots
   endpoints. Redeploy after changing the variables.
3. Choose the same `www` or apex version in Vercel and Google Search Console.
   Submit `https://www.example.com/sitemap.xml` (using your actual domain).
4. To verify Search Console using the HTML-tag method, put the token Google
   provides in `VITE_GOOGLE_SITE_VERIFICATION` in the Vercel build environment
   and redeploy. For the HTML-file or DNS method, use the exact verification
   file or TXT record supplied by Google; those values cannot be generated
   before creating the Search Console property.

Until the domain is purchased, local development and deployments can use their
current hostname for canonical and sitemap URLs. Configure the purchased
production origin before submitting the site to Google.

## Content Source
All business content is from the Swashine Glowbox Business Profile Report.
