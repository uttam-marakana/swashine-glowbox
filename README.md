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

## Content Source
All business content is from the Swashine Glowbox Business Profile Report.
