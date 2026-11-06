# Swashine.com: Information Architecture & UI/UX Enhancement Roadmap

**Target Site:** [Swashine Glowbox](https://www.swashine.com/) (Swastik Industries, Rajkot, Gujarat)

**Document Type:** Complete UI/UX, Information Architecture & Conversion Optimization Specification

**Companion Documents:** `swashine_website_audit.md`, `swashine_developer_fix_guide.md`, `swashine_image_and_layout_changes.md`

**Date:** November 6, 2026

## 1. Executive Summary & Action Matrix

This document synthesizes strategic information architecture, conversion funnel re-ordering, high-converting new sections, and detailed UI/UX interaction refinements for [Swashine.com](https://www.swashine.com/).

| Priority Area | Current Pain Point | Proposed Solution | Expected Impact | 
| ----- | ----- | ----- | ----- | 
| **Hero Stats Hydration** | Displays `0+`, `0 Yr`, `0%` on initial SSR or slow connections. | Hardcode non-zero static HTML fallbacks (`15+`, `1 Yr`, `100%`). | Prevents immediate trust erosion for first-time visitors. | 
| **Homepage Section Hierarchy** | "How it works" process appears before visitors see actual products. | Move Bestsellers and "Industries We Serve" directly below the Hero. | Drastically lowers bounce rates and accelerates product discovery. | 
| **Tool-Free Poster Change USP** | Text claims "tool-free change" without visual proof. | Embed a 4-second looping micro-video/GIF showing the top-slot mechanism. | Visual validation of Swashine's #1 competitive advantage. | 
| **Custom Size Conversion** | Custom calculator is hidden away on `/custom`. | Embed a mini-calculator on the homepage with dynamic WhatsApp pre-fill. | Instant capture of high-value custom signage leads. | 
| **Mobile Navigation UX** | Relative hash links (`#products`) break when clicked from sub-pages. | Convert all menu items to root-relative paths (`/#products`). | Seamless multi-page site navigation without dead clicks. | 
| **Mobile Checkout / Inquiries** | No persistent action trigger during long mobile page scrolls. | Add a persistent mobile bottom bar: Call (+91 88663 67360) + WhatsApp. | +30–45% increase in mobile WhatsApp conversations. | 
| **Dark Theme Typography** | Low contrast text (`#888888`) and ambiguous pricing layout. | Upgrade body text to `#D1D5DB` and enlarge primary price typography. | WCAG 2.1 AA compliance and instant scannability. | 

## 2. Strategic Homepage Section Re-Ordering

### The User Journey Problem

Currently, the homepage sequence asks visitors to read a 4-step ordering process before they have seen product options, frame dimensions, or lighting quality.

### Recommended Conversion-Optimized Flow

```
[1. Hero Section] -> Value hook, primary CTAs & verified stats (15+ variants, 1 Yr warranty, 100% Made in India)
       ↓
[2. Trust & Assurance Ribbon] -> Direct factory pricing, Rajkot manufacturing, wooden-crate transit safety, GST billing
       ↓
[3. Industries We Serve Grid] -> Quick visual self-identification (Temples, Cafes, Retail, Exhibitions, Corporate)
       ↓
[4. Bestsellers & Featured Products] -> Standard dimensions (A4, 12×18", 18×24", 24×36", Arch) with upfront pricing
       ↓
[5. "Before & After" Lighting Slider] -> Interactive visual "Aha!" moment demonstrating LED luminance vs. unlit poster
       ↓
[6. Why Swashine Glowbox (Key USPs)] -> Aluminium build, uniform ultra-bright LEDs, scratch-resistant acrylic
       ↓
[7. Tool-Free Poster Change Micro-Video] -> 4-second looping visual demonstration of the top-slot mechanism
       ↓
[8. How It Works (4-Step Workflow)] -> Simple, friction-free ordering process (Pick size -> Share artwork -> Pay -> Delivery)
       ↓
[9. Embedded Mini Custom Calculator] -> Instant dimensions entry with one-click pre-filled WhatsApp quote button
       ↓
[10. Customer Reviews & Installations] -> Social proof from Gujarat temple committees, retail chains, and cafe brands
       ↓
[11. B2B / Dealer Partnership Banner] -> Wholesale pricing and recurring supply for sign-makers and interior designers
       ↓
[12. Frequently Asked Questions (Accordion)] -> Overcoming final objections (max size, shipping, artwork specs, warranty)
       ↓
[13. Final High-Contrast WhatsApp CTA Banner] -> Final inquiry push before footer

```

## 3. High-Converting New Homepage Sections

### 3.1 Trust & Commercial Assurance Strip

Position a 4-column trust ribbon directly below the hero section:

```
<section class="border-y border-neutral-800 bg-neutral-950/60 py-6">
  <div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
    <div class="flex flex-col items-center">
      <span class="text-2xl">🏭</span>
      <h4 class="mt-2 text-sm font-semibold text-white">Manufacturer Direct</h4>
      <p class="text-xs text-neutral-400">Crafted in Rajkot, Gujarat</p>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-2xl">⚡</span>
      <h4 class="mt-2 text-sm font-semibold text-white">1-Year SMPS Warranty</h4>
      <p class="text-xs text-neutral-400">Doorstep replacement support</p>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-2xl">📦</span>
      <h4 class="mt-2 text-sm font-semibold text-white">Wooden Crate Packing</h4>
      <p class="text-xs text-neutral-400">Zero transit damage guarantee</p>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-2xl">📑</span>
      <h4 class="mt-2 text-sm font-semibold text-white">100% GST Invoiced</h4>
      <p class="text-xs text-neutral-400">Full commercial tax compliance</p>
    </div>
  </div>
</section>

```

### 3.2 A 4-Second Demonstration of "Tool-Free Poster Change"

Embed an auto-playing, muted, looping MP4/WebM video or GIF demonstrating how easily a poster slips into the top slot:

```
<div class="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
  <video
    autoplay
    loop
    muted
    playsinline
    poster="/images/poster-change-placeholder.webp"
    class="w-full h-auto object-cover"
  >
    <source src="/videos/tool-free-poster-change.webm" type="video/webm" />
    <source src="/videos/tool-free-poster-change.mp4" type="video/mp4" />
  </video>
  <div class="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700">
    <p class="text-xs font-medium text-amber-400">⚡ Tool-Free Top-Slot System: Change graphics in under 10 seconds</p>
  </div>
</div>

```

### 3.3 Embedded Mini Custom Size Calculator on Homepage

Allow visitors to test custom pricing without navigating to `/custom`:

```
<div class="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 md:p-8">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
    <div class="space-y-2">
      <span class="text-xs uppercase tracking-wider font-semibold text-amber-500">Custom Sizing Specialist</span>
      <h3 class="text-2xl font-bold text-white">Need a non-standard display size?</h3>
      <p class="text-sm text-neutral-400 max-w-md">
        We manufacture custom frames up to 2 × 6 ft at ₹900 per sq ft. Enter your dimensions for an instant estimate.
      </p>
    </div>

    <!-- Interactive Inputs & WhatsApp Trigger -->
    <div class="flex flex-col sm:flex-row items-center gap-4">
      <div class="flex items-center gap-2">
        <input
          type="number"
          id="home-calc-w"
          min="1"
          max="6"
          step="0.5"
          value="2"
          inputmode="decimal"
          class="w-20 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-white text-center font-semibold focus:border-amber-500 focus:outline-none"
        />
        <span class="text-neutral-500">×</span>
        <input
          type="number"
          id="home-calc-h"
          min="1"
          max="6"
          step="0.5"
          value="4"
          inputmode="decimal"
          class="w-20 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-white text-center font-semibold focus:border-amber-500 focus:outline-none"
        />
        <span class="text-xs text-neutral-400">feet</span>
      </div>

      <div class="text-right">
        <div class="text-xs text-neutral-400">Est. Base Price</div>
        <div id="home-calc-total" class="text-xl font-bold text-white">₹7,200</div>
      </div>

      <a
        id="home-calc-btn"
        href="https://wa.me/918866367360?text=Hi%20Swashine,%20I%20need%20a%20custom%20glowbox%20of%202x4%20ft%20(₹7,200%20est).%20Please%20share%20final%20quote."
        target="_blank"
        rel="noopener noreferrer"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-lg transition-all hover:bg-emerald-500 hover:shadow-emerald-600/30"
      >
        <span>Get Quote on WhatsApp</span>
      </a>
    </div>
  </div>
</div>

```

## 4. UI/UX Refinements

### 4.1 Sticky Navigation & Cross-Page Routing

* **Root-Relative Anchor Routing:** Update navigation items in `Navbar.tsx` or `header.html`:

  * Change `href="#products"` → `href="/#products"`

  * Change `href="#how-it-works"` → `href="/#how-it-works"`

  * Change `href="#faq"` → `href="/#faq"`

  * Change `href="#contact"` → `href="/#contact"`
    This ensures that when a user is on `/about`, `/gallery`, or `/dealers`, clicking "Products" routes them back to the homepage section smoothly rather than failing.

* **Persistent Mobile Sticky Action Bar:**
  Add a bottom navigation strip visible only on mobile viewports (`< 768px`):

```
<div class="fixed bottom-0 inset-x-0 z-50 flex items-center border-t border-neutral-800 bg-neutral-950/95 p-3 backdrop-blur-lg md:hidden">
  <a
    href="tel:+918866367360"
    class="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-neutral-300 hover:text-white"
  >
    <span>📞 Call Us</span>
  </a>
  <div class="h-6 w-px bg-neutral-800"></div>
  <a
    href="https://wa.me/918866367360?text=Hi%20Swashine,%20I%20have%20an%20inquiry%20about%20your%20LED%20Glowboxes."
    target="_blank"
    rel="noopener noreferrer"
    class="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-md active:scale-95"
  >
    <span>💬 WhatsApp Quote</span>
  </a>
</div>

```

### 4.2 Micro-Interactions & Illumination Brand Accents

* **Subtle LED Halo Hover Effects:**
  Apply lighting-inspired micro-interactions to product and feature cards:

```
.glowbox-card {
  position: relative;
  background-color: #121212;
  border: 1px solid #262626;
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glowbox-card:hover {
  border-color: rgba(245, 158, 11, 0.45);
  box-shadow: 0 0 30px -5px rgba(245, 158, 11, 0.25);
  transform: translateY(-3px);
}

```

* **"Before & After" Slider Affordance:**
  Add an animated pulsing tooltip over the center divider handle that disappears after the user's first touch:

```
<div class="slider-handle-tooltip animate-pulse pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">
  ⟵ Drag to Compare ⟶
</div>

```

### 4.3 Custom Size Calculator Mobile Usability (`/custom`)

1. **Mobile Numeric Keypads:**
   Ensure inputs specify `inputmode="decimal"` and `type="number"` so mobile keyboards show numbers instead of letters.

2. **Standard Size Quick-Pick Pills:**
   Place one-tap chips above the custom calculator:
   `[A4 Table-Top]` • `[12×18" Cafe Menu]` • `[18×24" Retail]` • `[24×36" Showroom]` • `[2×6 ft Jumbo]`
   Tapping any pill instantly sets the dimensions and recalculates the rate.

3. **Dynamic Proportional Aspect-Ratio Visualizer:**
   Beside the inputs, display a CSS container whose width and height scale dynamically according to user inputs. This confirms whether the frame will be portrait, landscape, or square before ordering.

### 4.4 Typography, Pricing & Readability Polish

* **Card Pricing Hierarchy:**

  * Price figure in bold white: `text-2xl font-bold text-white` (e.g. **₹2,499**).

  * Inclusions metadata in muted gray: `text-xs text-neutral-400 font-normal` (e.g. *Frame + SMPS Power Supply included • Print extra*).

* **Policy Pages Sidebar TOC:**
  On `/privacy-policy`, `/return-policy`, and `/terms-condition`:

  * Increase inactive TOC text contrast from `#888888` to `#A3A3A3`.

  * Highlight the active section with a vibrant amber left border (`border-l-2 border-amber-500 font-semibold text-white`).

### 4.5 Media & Social Proof Enhancements

* **Gallery Lightbox with WhatsApp Inquiry:**
  When clicking any showcase photo on `/gallery`:

  * Open a high-resolution modal lightbox with pinch-to-zoom support.

  * Include a dedicated inquiry button right under the image: *"Inquire About This Display on WhatsApp"*, passing the photo title directly in the message.

* **Reels Video Fallback Poster:**
  Ensure every Instagram reel card declares a local `poster="/images/reels/reel-poster-1.webp"` to avoid black boxes while third-party scripts load.

## 5. Sub-Page Architectural Improvements

### 5.1 Dedicated Products Catalog Page (`/products`)

Build an independent catalog page at `https://www.swashine.com/products` to capture organic search traffic:

* Filter tabs: *All Frames*, *Wall-Mounted*, *Countertop & Battery*, *Arch & Deity Displays*, *Double-Sided Hanging*.

* Detailed specs: Frame thickness (mm), LED strip specifications, wattage, power adapter rating, and acrylic thickness.

### 5.2 Interactive Gallery Filters (`/gallery`)

Add category pill buttons at the top of the gallery page:

* `All` | `Temples & Mandir` | `Cafés & QSR` | `Retail & Showrooms` | `Corporate Offices` | `Custom Sizes`

### 5.3 Artwork Preparation Guidelines on `/custom`

Add a downloadable specification card for print-ready graphics:

* **Recommended Resolution:** 150 to 300 DPI at 100% scale.

* **Color Space:** CMYK (FOGRA39 recommended for backlit film).

* **Accepted Formats:** Print-ready PDF, CorelDraw (.CDR), Adobe Illustrator (.AI), or uncompressed TIFF/PNG.

* **Bleed Margin:** 5 mm safe margin on all sides for top-slot frame clearance.

## 6. Implementation Sprints & Checklist

### Sprint 1: Quick UX & Navigation Wins (Day 1 - 2)

* [x] Keep hero counter values visible immediately, without a zero-count animation. Use the existing verified `8+` product variants rather than the unverified `15+` figure.

* [x] Update homepage section links to root-relative paths (`/#products`, `/#how-it-works`, `/#faq`, `/#contact`) and scroll to anchors after client-side navigation.

* [x] Deploy mobile persistent bottom bar (Call + WhatsApp); preserve the floating WhatsApp button on desktop.

* [x] Not applicable: Instagram posts and reels render in a responsive grid, not a horizontal carousel; no touch-action override is needed.

### Sprint 2: Conversion & Media Polish (Week 1)

* \[ \] Add the 4-item Trust & Assurance ribbon below the hero section.

* \[ \] Re-order homepage sections: move Bestsellers and Industries We Serve above the fold.

* \[ \] Add the 4-second looping video/GIF of the tool-free top-slot poster change.

* \[ \] Embed the mini custom size calculator on the homepage.

### Sprint 3: Deep Sub-Page Upgrades (Week 2)

* \[ \] Deploy dedicated `/products` catalog page with category filters.

* \[ \] Add category filter pills to `/gallery` and image lightbox with WhatsApp CTA.

* \[ \] Add artwork preparation guide and quick-pick pills to `/custom`.