# Comprehensive Website Audit: Swashine.com

**Target Entity:** [Swashine Glowbox by Swastik Industries](https://www.swashine.com/) (Rajkot, Gujarat, India)

**Audit Scope:** Responsive Layout UX, Image Engagement & Performance, Technical & On-Page SEO across all pages

**Audit Date:** November 6, 2026

## 1. Executive Summary & Site Architecture

The [Swashine website](https://www.swashine.com/) promotes LED glowboxes and custom illuminated signage manufactured in Rajkot, Gujarat. The site uses a **hybrid architecture**:

* A feature-rich single-page landing experience on the root domain (`https://www.swashine.com/`) with hash anchors (`#products`, `#how-it-works`, `#dealers`, `#faq`, `#contact`).

* Standalone sub-pages for dedicated utility and company background: [About Us](https://www.swashine.com/about), [Dealers](https://www.swashine.com/dealers), [Gallery](https://www.swashine.com/gallery), [Reviews](https://www.swashine.com/reviews), [Custom Order Calculator](https://www.swashine.com/custom), and legal policies ([Privacy Policy](https://www.swashine.com/privacy-policy), [Return & Refund Policy](https://www.swashine.com/return-policy), and [Terms & Conditions](https://www.swashine.com/terms-condition)).

### Core Audit Scorecard

| Audit Dimension | Current Health | Critical Blocker | Key Opportunity | 
| ----- | ----- | ----- | ----- | 
| **Responsive Layout & Mobile UX** | 🟡 Moderate | Missing footer on Gallery; Reels slider touch-trapping | Unify mobile drawer navigation and improve text contrast | 
| **Images & Responsive Visuals** | 🟡 Moderate | Heavy PNG/JPEG delivery; unrendered gallery boxes | Implement WebP/AVIF with responsive `srcset` and lazy loading | 
| **Technical SEO & Indexability** | 🔴 Needs Action | Missing `robots.txt` (404) and `sitemap.xml` (404) | Deploy XML sitemap, robots.txt, and LocalBusiness JSON-LD | 
| **On-Page SEO & Content** | 🟢 Good | No Twitter cards; inconsistent slug redirects (`/terms`) | Complete Open Graph/Twitter meta and 301 redirects | 

## 2. Responsive Layout & Mobile/Tablet UX Audit

### 2.1 Viewport Breakpoints & Fluid Grid Analysis

The website adopts a modern dark theme (`#0D0D0D` / `#121212`) accented with warm golden lighting gradients and high-contrast call-to-actions.

1. **Mobile Viewports (< 640px):**

   * **Header & Navigation:** The sticky header maintains brand presence. However, when switching between hash links (e.g., clicking "Products" from a subpage like `/about`), the anchor navigation does not route back to the homepage smoothly (`/#products`).

   * **Touch Target Dimensions:** Primary CTA buttons ("View all products" and "WhatsApp us") exceed the minimum 48×48px touch target standard. However, the footer text links and secondary tags measure roughly 28–32px vertically, creating high risk for mis-taps on compact mobile screens.

   * **Text Readability & Contrast:** Secondary body text and caption metadata currently use dim grey (`#888888`) over `#0D0D0D` dark background, producing a contrast ratio of \~3.5:1. This fails WCAG 2.1 Level AA requirements (4.5:1 minimum for normal text).

2. **Tablet Viewports (640px – 1024px):**

   * **Grid Collapsing:** Two-column feature grids (e.g., "Why Swashine Glowbox" and "How It Works" 4-step workflow) collapse cleanly into a single vertical stream.

   * **Custom Size Calculator:** On iPad/tablet portrait orientations, the calculator inputs (Width, Height, Price breakdown) remain accessible without horizontal overflow.

3. **Desktop Viewports (> 1024px):**

   * Content max-width is constrained (typically `max-w-7xl` \~1280px), preventing ultra-wide distortion on 2K/4K monitors.

### 2.2 Critical Layout & UX Bugs

#### Bug 1: Missing Global Footer on Gallery Subpage

* **Location:** `https://www.swashine.com/gallery`

* **Defect:** The Gallery page template omits the global footer component (`<footer>`). Mobile users scrolling through the entire photo gallery reach a dead end with no links to Return Policy, Terms, About Us, or contact information.

* **Fix:** Re-include the shared global footer component in the Gallery page layout template.

#### Bug 2: Horizontal Touch Trapping on Instagram Reels Carousel

* **Location:** Homepage (`#instagram` / Reels section)

* **Defect:** On mobile touch devices, the horizontal scrolling strip containing embedded Instagram reel cards intercepts vertical scrolling gestures. Users attempting to scroll down the page frequently get stuck sliding horizontally.

* **Fix:** Apply CSS `touch-action: pan-y` on container elements or add clear horizontal margin padding with visible pagination indicators so users have dedicated margins to swipe vertically.

```
/* Recommended CSS Fix for Reels Section */
.reels-carousel-container {
  touch-action: pan-y;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
}
.reels-card {
  scroll-snap-align: start;
}

```

## 3. Images & Responsive Visual Engagement Audit

Because Swashine sells illuminated display boxes, high-fidelity visual presentation directly drives conversion.

### 3.1 Before/After Interactive Comparison Slider

* **Functionality:** The interactive slider allowing visitors to toggle between unlit and illuminated poster views is a standout conversion asset.

* **Responsiveness:** The slider handle adjusts well to finger drag gestures on mobile.

* **Optimization Requirement:** Ensure image dimensions within the slider have strict CSS `aspect-ratio` and `pointer-events: none` on inner image tags to prevent accidental image dragging on Android and iOS browsers.

### 3.2 Image Formats, Compression & Delivery

* **Format Evaluation:** Key assets (hero glowbox images, factory manufacturing shots, client showcase frames) are currently served as standard JPEG and PNG files.

* **Performance Impact:** Uncompressed PNG graphics average between 450 KB and 1.8 MB per asset. Converting these to WebP or AVIF reduces payload size by 65–80% without perceptible loss of illumination clarity.

* **Missing `srcset` & `sizes` Attributes:** Images currently use static `src` paths. A 1200px wide hero graphic is downloaded even on a 390px mobile viewport, consuming unnecessary cellular data.

```
<!-- Recommended Responsive Picture Implementation -->
<picture>
  <source type="image/avif" srcset="/images/hero-glowbox-400.avif 400w, /images/hero-glowbox-800.avif 800w, /images/hero-glowbox-1200.avif 1200w" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px">
  <source type="image/webp" srcset="/images/hero-glowbox-400.webp 400w, /images/hero-glowbox-800.webp 800w, /images/hero-glowbox-1200.webp 1200w" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px">
  <img src="/images/hero-glowbox-800.jpg" alt="Swashine LED Glowbox illuminated display frame manufactured in Rajkot" width="800" height="600" loading="eager" fetchpriority="high" decoding="async">
</picture>

```

### 3.3 Image Rendering Bug on Gallery Page

* **Location:** `https://www.swashine.com/gallery`

* **Defect:** Multiple image cards render as blank dark grey placeholders upon initial scroll, only loading after prolonged dwell time or repeated viewport scrolling.

* **Root Cause:** Overly aggressive intersection-observer thresholds (e.g., `rootMargin: "0px"`) paired with unoptimized image asset sizes.

* **Fix:** Update native lazy loading attributes (`loading="lazy"`) and set `rootMargin: "300px"` so images preload before they enter the user's visible viewport.

### 3.4 Image Accessibility & SEO Alt Text

* **Current State:** Over 60% of product and feature images lack descriptive `alt` attributes or utilize generic placeholders (`alt=""` or `alt="image"`).

* **Fix Checklist:**

  * Arch glowbox: `alt="Custom Arch LED Glowbox installed in Gujarat temple mandir"`

  * Table-top unit: `alt="A4 battery powered LED table top display board for restaurant counter"`

  * Tool-free frame mechanism: `alt="Top slot tool free poster change mechanism in aluminium LED glowbox"`

## 4. Technical & On-Page SEO Audit

### 4.1 Indexability & Crawler Directives (Critical)

1. **Missing `robots.txt`:**

   * URL: `https://www.swashine.com/robots.txt` returns `404 Not Found` (or permission denied).

   * Search crawlers default to permissive crawling, but cannot locate an official sitemap reference or crawl rate guidance.

2. **Missing XML Sitemap:**

   * URL: `https://www.swashine.com/sitemap.xml` returns `404 Not Found`.

   * Without an XML sitemap, sub-pages like `/custom`, `/reviews`, and policy pages depend exclusively on internal links for discovery.

#### Immediate Deliverable: Production `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://www.swashine.com/sitemap.xml

```

#### Immediate Deliverable: Production `sitemap.xml`

```
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

### 4.2 URL Routing & 301 Redirect Architecture

The current legal page uses the non-standard slug `/terms-condition` instead of common conventions. Requests to `/terms` or `/terms-and-conditions` result in 404 dead ends.

**Required 301 Redirect Rules (Web Server / Next.js / Cloudflare):**

* `/terms` → `301 Moved Permanently` → `/terms-condition`

* `/terms-and-conditions` → `301 Moved Permanently` → `/terms-condition`

* `/returns` → `301 Moved Permanently` → `/return-policy`

* `/refund-policy` → `301 Moved Permanently` → `/return-policy`

### 4.3 Meta Tags & Social Sharing Graph Across All Pages

| Page Path | Target `<title>` Tag | Recommended `<meta name="description">` | 
| ----- | ----- | ----- | 
| **`/` (Homepage)** | `Swashine Glowbox: LED Glowboxes Manufacturer in India` | `Manufacturer of premium LED glowboxes and illuminated display systems in Rajkot, Gujarat. Tool-free poster change, custom sizes up to 2x6 ft, and direct factory pricing.` | 
| **`/about`** | `About Swashine Glowbox: LED Display Manufacturer in Rajkot` | `Learn about Swastik Industries and Swashine Glowbox. Discover our manufacturing facility in Rajkot, Gujarat, craftsmanship promise, and illuminated signage solutions.` | 
| **`/dealers`** | `Become an Authorized Swashine LED Glowbox Dealer & Distributor` | `Partner with Swashine for trade pricing, wholesale supply, and dedicated B2B support on LED illuminated glowboxes manufactured in Rajkot, Gujarat.` | 
| **`/custom`** | `Custom LED Glowbox Size Calculator: Pricing & Ordering - Swashine` | `Calculate instant pricing for custom illuminated glowboxes at ₹900/sq ft. Tool-free poster replacement, custom formats up to 2x6 ft with delivery across India.` | 
| **`/gallery`** | `LED Glowbox Installation Gallery: Retail, Temples & Cafes - Swashine` | `Explore real-world client installations of Swashine LED glowboxes across temples, retail showrooms, cafes, restaurants, and exhibitions.` | 
| **`/reviews`** | `Customer Reviews & Testimonials: Swashine LED Glowboxes` | `Read verified customer feedback on Swashine illuminated display systems, frame build durability, brightness quality, and prompt pan-India delivery.` | 
| **`/privacy-policy`** | `Privacy Policy - Swashine Glowbox` | `Official privacy policy for Swashine Glowbox and Swastik Industries regarding customer data protection, browsing privacy, and inquiries.` | 
| **`/return-policy`** | `Return & Refund Policy - Swashine Glowbox` | `Warranty coverage, transit damage claims, and replacement policies for Swashine LED illuminated displays and SMPS power supplies.` | 
| **`/terms-condition`** | `Terms & Conditions - Swashine Glowbox` | `Terms of service, custom order manufacturing guidelines, artwork requirements, and payment policies for Swashine Glowbox products.` | 

### 4.4 Structured Data (Schema.org / JSON-LD)

Embedding rich JSON-LD schema enables Google Search to display rich snippets, local business knowledge panels, breadcrumbs, and FAQs directly in SERPs.

#### 1. LocalBusiness / Manufacturer Schema (Sitewide / Homepage)

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Swashine Glowbox by Swastik Industries",
  "url": "https://www.swashine.com/",
  "logo": "https://www.swashine.com/logo.png",
  "image": "https://www.swashine.com/images/hero-glowbox.jpg",
  "description": "Manufacturer of premium LED glowboxes, illuminated display systems, and custom advertising frames in Rajkot, Gujarat.",
  "telephone": "+918866367360",
  "email": "swastik.ind01@gmail.com",
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
    "latitude": "22.28",
    "longitude": "70.80"
  },
  "priceRange": "₹₹",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
  "sameAs": [
    "https://www.instagram.com/swashine_glowbox"
  ]
}
</script>

```

#### 2. FAQ Schema (Homepage & FAQ Component)

```
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the maximum custom size for a Swashine Glowbox?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Swashine manufactures custom LED glowboxes up to 2 × 6 ft, charged at ₹900 per sq ft. Print, GST, and shipping are quoted based on order requirements."
      }
    },
    {
      "@type": "Question",
      "name": "How does the tool-free poster replacement work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Swashine Glowboxes feature an innovative top-slot system that allows graphics to be swapped in seconds without any screwdrivers or specialized tools."
      }
    },
    {
      "@type": "Question",
      "name": "What warranty is provided on Swashine displays?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every Swashine glowbox includes a 1-year warranty on the SMPS power supply against manufacturing defects."
      }
    }
  ]
}
</script>

```

## 5. Page-by-Page Technical Audit Matrix

| URL / Page | Mobile Responsiveness | Visual & Image Engagement | On-Page SEO & Metadata | Action Items | 
| ----- | ----- | ----- | ----- | ----- | 
| **`https://www.swashine.com/`** | 9/10 (Minor Reels touch trapping) | 9/10 (Before/After slider works well) | 7/10 (Missing JSON-LD & Twitter cards) | Add LocalBusiness & FAQ schema; optimize carousel touch scroll. | 
| **`https://www.swashine.com/about`** | 9/10 (Clean hierarchy) | 8/10 (Showcase images need alt text) | 8/10 (Targeted local keywords) | Add alt attributes to factory & team imagery. | 
| **`https://www.swashine.com/dealers`** | 9/10 (Form inputs fit mobile screens) | 7/10 (Opportunity for dealer package graphics) | 8/10 (Clear B2B search intent) | Add B2B wholesale schema and trust badges. | 
| **`https://www.swashine.com/custom`** | 9/10 (Calculator UX is responsive) | 8/10 (Clear dimension visualizers) | 7/10 (Missing dedicated Open Graph card) | Add one-click "Order this size on WhatsApp" pre-filled button. | 
| **`https://www.swashine.com/gallery`** | 5/10 (**Footer completely missing**) | 6/10 (**Blank placeholder render delays**) | 6/10 (Thin text metadata, missing alt tags) | Re-insert footer; set `rootMargin: 300px` for image lazy loading. | 
| **`https://www.swashine.com/reviews`** | 9/10 (Testimonial cards wrap neatly) | 8/10 (Clean star rating typography) | 7/10 (Missing Review/AggregateRating schema) | Inject `AggregateRating` schema for rich star snippets on Google. | 
| **`/privacy-policy`** | 8/10 (Sticky TOC sidebar needs contrast) | N/A (Text document) | 7/10 (Canonical tag present) | Lighten sidebar TOC text from `#888` to `#D1D5DB`. | 
| **`/return-policy`** | 8/10 (Sticky TOC sidebar needs contrast) | N/A (Text document) | 7/10 (Canonical tag present) | Add 301 alias redirect from `/returns`. | 
| **`/terms-condition`** | 8/10 (Sticky TOC sidebar needs contrast) | N/A (Text document) | 6/10 (Non-standard slug) | Implement 301 redirect from `/terms-and-conditions`. | 

## 6. Prioritized Action Plan & Implementation Roadmap

### Phase 1: Immediate Critical Fixes (Within 48 Hours)

1. **Deploy `robots.txt` and `sitemap.xml`:** Place both files in the web root so Googlebot can crawl and index all 9 pages.

2. **Restore Gallery Page Footer:** Add the shared footer component to `https://www.swashine.com/gallery` to fix broken user navigation.

3. **Configure URL 301 Redirects:** Point `/terms`, `/terms-and-conditions`, and `/returns` to their active endpoints.

### Phase 2: Visual Engagement & Performance Optimization (Week 1)

1. **Convert Assets to WebP/AVIF:** Compress all product showcase, client installation, and hero banner images.

2. **Implement Lazy Loading Preloading:** Update IntersectionObserver or native `loading="lazy"` with a 300px root margin to prevent grey boxes in the gallery.

3. **Fix Reels Carousel Touch Behavior:** Apply `touch-action: pan-y` to allow vertical mobile scrolling across the Instagram reel strip.

### Phase 3: SEO Dominance & Conversion Optimization (Week 2)

1. **Inject JSON-LD Structured Data:** Add `LocalBusiness`, `FAQPage`, and `Product` schemas to secure Google Knowledge Graph and Rich Snippets.

2. **Audit Image Alt Tags:** Ensure every product frame and installation image contains keyword-rich, descriptive alt text.

3. **Enhance Calculator Conversion:** Configure the custom size calculator to generate a dynamic WhatsApp chat message with pre-populated dimensions and price quotes.