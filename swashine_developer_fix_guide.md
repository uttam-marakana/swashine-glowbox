# Swashine.com: Developer Implementation & Fix Guide
**Target Site:** [Swashine Glowbox](https://www.swashine.com/) (Swastik Industries, Rajkot, Gujarat)  
**Companion Document:** `swashine_website_audit.md`  
**Purpose:** Ready-to-deploy code snippets, configuration files, and architectural fixes to resolve all audit findings.

---

## Quick Action Checklist

- [ ] **Task 1:** Deploy `robots.txt` and `sitemap.xml` to public root to fix crawler 404s.
- [ ] **Task 2:** Re-include global `<Footer />` component in the Gallery page template (`/gallery`).
- [ ] **Task 3:** Expand image lazy-loading `rootMargin` to `300px` and set explicit image dimensions.
- [ ] **Task 4:** Add `touch-action: pan-y;` to the Instagram Reels carousel container.
- [ ] **Task 5:** Configure 301 redirects for `/terms`, `/terms-and-conditions`, and `/returns`.
- [ ] **Task 6:** Inject `LocalBusiness` and `FAQPage` JSON-LD schema into root `<head>`.
- [ ] **Task 7:** Increase secondary text contrast from `#888888` to `#D1D5DB` (WCAG AA).

---

## 1. Search Engine Indexing Files (`robots.txt` & `sitemap.xml`)

### File Placement
- **Next.js (App Router or Pages Router):** Place directly in `/public/robots.txt` and `/public/sitemap.xml`.
- **Vite / Create React App:** Place inside `/public/`.
- **Standard Web Server (Apache / Nginx / cPanel):** Place in the document root directory (`public_html/`).

### File 1: `robots.txt`
```text
User-agent: *
Allow: /

Sitemap: https://www.swashine.com/sitemap.xml
```

### File 2: `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.swashine.com/</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.swashine.com/about</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.swashine.com/custom</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.swashine.com/dealers</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.swashine.com/gallery</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.swashine.com/reviews</loc>
    <lastmod>2026-11-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.swashine.com/privacy-policy</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://www.swashine.com/return-policy</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://www.swashine.com/terms-condition</loc>
    <lastmod>2026-10-05</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

---

## 2. Restore Global Footer on Gallery Page

* **Target File:** `src/pages/gallery.tsx`, `src/app/gallery/page.tsx`, or `gallery.html`.
* **Issue:** When visitors navigate to `/gallery`, the footer markup is absent.
* **Fix Implementation:**

```jsx
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D] text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Client Installation Gallery
        </h1>
        <p className="mt-3 text-lg text-gray-300">
          Explore Swashine LED glowboxes across temples, retail showrooms, and restaurants.
        </p>

        {/* Gallery Image Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gallery items */}
        </div>
      </main>

      {/* Global Footer re-inserted here */}
      <Footer />
    </div>
  );
}
```

---

## 3. Gallery Image Lazy-Loading & Placeholder Optimization

* **Issue:** Image cards render as empty grey boxes because the lazy-load trigger has zero look-ahead buffer.
* **Fix:** Update image elements with modern native attributes and adjust any custom `IntersectionObserver` to use a 300px preload margin.

### Option A: Native HTML / JSX Implementation
```html
<picture>
  <source srcset="/images/gallery/temple-arch-glowbox.webp" type="image/webp" />
  <img
    src="/images/gallery/temple-arch-glowbox.jpg"
    alt="Custom Arch LED Glowbox display installed in temple mandir, Rajkot"
    width="600"
    height="450"
    loading="lazy"
    decoding="async"
    class="w-full h-auto object-cover rounded-lg transition-opacity duration-300 bg-neutral-900"
  />
</picture>
```

### Option B: JavaScript IntersectionObserver Fix
```javascript
// Expand rootMargin so assets load 300px before scrolling into the viewport
const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;
        image.classList.remove("opacity-0");
        image.classList.add("opacity-100");
        observer.unobserve(image);
      }
    });
  },
  {
    root: null,
    rootMargin: "300px 0px", // Preload trigger buffer
    threshold: 0.01,
  }
);

document.querySelectorAll("img[data-src]").forEach((img) => imageObserver.observe(img));
```

---

## 4. Mobile Touch Trapping Fix on Instagram Reels Carousel

* **Issue:** Swiping over the horizontal reel strip locks the screen horizontally, trapping users who are trying to scroll down.
* **Fix:** Add `touch-action: pan-y;` to enable fluid vertical mobile scrolling.

```css
/* Add to your global CSS or component stylesheet */
.reels-carousel-wrapper {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  touch-action: pan-y; /* Permits vertical page scroll while finger is over the element */
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 1rem;
  padding: 1rem 0;
}

.reels-carousel-card {
  flex: 0 0 280px;
  scroll-snap-align: start;
}

/* Hide scrollbar for clean mobile appearance while keeping touch scroll active */
.reels-carousel-wrapper::-webkit-scrollbar {
  display: none;
}
.reels-carousel-wrapper {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

---

## 5. URL 301 Redirect Rules

Map missing or irregular slugs to their active endpoints.

### If using Next.js (`next.config.js` or `next.config.mjs`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/terms',
        destination: '/terms-condition',
        permanent: true,
      },
      {
        source: '/terms-and-conditions',
        destination: '/terms-condition',
        permanent: true,
      },
      {
        source: '/returns',
        destination: '/return-policy',
        permanent: true,
      },
      {
        source: '/refund-policy',
        destination: '/return-policy',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

### If using Apache (`.htaccess`)
```apache
<IfModule mod_rewrite.c>
RewriteEngine On
Redirect 301 /terms /terms-condition
Redirect 301 /terms-and-conditions /terms-condition
Redirect 301 /returns /return-policy
Redirect 301 /refund-policy /return-policy
</IfModule>
```

### If hosted on Vercel (`vercel.json`)
```json
{
  "redirects": [
    { "source": "/terms", "destination": "/terms-condition", "permanent": true },
    { "source": "/terms-and-conditions", "destination": "/terms-condition", "permanent": true },
    { "source": "/returns", "destination": "/return-policy", "permanent": true },
    { "source": "/refund-policy", "destination": "/return-policy", "permanent": true }
  ]
}
```

---

## 6. Complete JSON-LD Structured Data Schema

Inject this script block into your root layout `<head>` tag (`app/layout.tsx` or `index.html`).

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.swashine.com/#organization",
      "name": "Swashine Glowbox by Swastik Industries",
      "url": "https://www.swashine.com/",
      "logo": "https://www.swashine.com/logo.png",
      "image": "https://www.swashine.com/images/hero-glowbox.jpg",
      "description": "Manufacturer of premium LED glowboxes, illuminated display systems, and custom signage frames in Rajkot, Gujarat.",
      "telephone": "+918866367360",
      "email": "swastik.ind01@gmail.com",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Gate 2, Pan Business Park, Behind Kishan Petrol Pump, Opp. Laxmi Loader",
        "addressLocality": "Rajkot",
        "addressRegion": "Gujarat",
        "postalCode": "360022",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 22.28,
        "longitude": 70.80
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "19:00"
      },
      "sameAs": [
        "https://www.instagram.com/swashine_glowbox"
      ]
    },
    {
      "@type": "Product",
      "@id": "https://www.swashine.com/#product",
      "name": "Swashine Custom LED Glowbox",
      "image": "https://www.swashine.com/images/product-glowbox.jpg",
      "description": "Premium illuminated LED glowbox with tool-free top-slot poster change and heavy-duty aluminium frame.",
      "brand": {
        "@type": "Brand",
        "name": "Swashine"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "Swastik Industries"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "900",
        "price": "900",
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Swastik Industries"
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.swashine.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the maximum custom size for a Swashine Glowbox?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Swashine manufactures custom sizes up to 2 × 6 ft, priced at ₹900 per sq ft."
          }
        },
        {
          "@type": "Question",
          "name": "How does the tool-free poster change mechanism work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Swashine Glowboxes use a proprietary top-slot mechanism allowing graphics to be swapped in seconds without screwdrivers or tools."
          }
        },
        {
          "@type": "Question",
          "name": "What warranty is provided?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every unit comes with a 1-year SMPS power supply warranty against manufacturing defects."
          }
        }
      ]
    }
  ]
}
</script>
```

---

## 7. Contrast & Touch Target Accessibility Tweaks

### Secondary Text Contrast (WCAG AA Compliance)
In your dark mode styles or Tailwind configuration:
- Replace `text-gray-500` (`#888888` / 3.5:1 contrast) with `text-gray-300` (`#D1D5DB` / 9.6:1 contrast) or `text-neutral-300` on dark `#0D0D0D` backgrounds.

### Touch Target Sizing (Mobile Footer & Action Links)
Ensure links have at least 44×44px interactive bounding boxes:

```css
/* Mobile link padding fix */
.footer-nav-link {
  display: inline-block;
  padding: 0.625rem 0.5rem; /* ~10px top/bottom, 8px left/right */
  min-height: 44px;
  line-height: 1.5;
}
```

---

## 8. Post-Deployment Verification Steps

1. **Verify Sitemap & Robots:**
   - Open `https://www.swashine.com/robots.txt` in an incognito window. Ensure HTTP 200 response.
   - Open `https://www.swashine.com/sitemap.xml`. Confirm valid XML tree structure.
   - Submit sitemap URL in **Google Search Console** under `Sitemaps`.
2. **Test Structured Data:**
   - Run `https://www.swashine.com/` through [Google Rich Results Test](https://search.google.com/test/rich-results) to verify `LocalBusiness` and `FAQPage` validation.
3. **Validate 301 Redirects:**
   - Enter `https://www.swashine.com/terms` in browser address bar. Confirm automatic redirect to `https://www.swashine.com/terms-condition`.
4. **Inspect Mobile UX:**
   - Test scrolling down on a real phone over the Instagram reels section. Confirm page vertical scrolling is smooth and uninhibited.
   - Open `/gallery` on mobile, scroll to the bottom, and confirm the global footer is present and clickable.
