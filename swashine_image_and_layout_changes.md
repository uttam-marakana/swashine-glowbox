# Swashine.com: Image Responsiveness & Aspect Ratio Implementation Plan
**Target Site:** [Swashine Glowbox](https://www.swashine.com/) (Swastik Industries, Rajkot, Gujarat)  
**Document Type:** Technical Specification & Upcoming Changes for Images, Aspect Ratio & Grid Layout  
**Companion Documents:** `swashine_website_audit.md`, `swashine_developer_fix_guide.md`  
**Date:** November 6, 2026  

---

## 1. Executive Summary & Audit Verification

A targeted inspection was performed on [Swashine Homepage](https://www.swashine.com/) and [Product Gallery](https://www.swashine.com/gallery) covering image network integrity, responsive scaling, aspect ratio preservation, and Cumulative Layout Shift (CLS).

| Audit Criterion | Current Status | Key Finding | Action Required |
| :--- | :--- | :--- | :--- |
| **Broken Product Images** | 🟢 **PASS** | 0 broken assets; all 18×24", 24×36", 24×42", 12×18", and hero banners return HTTP 200 OK. | Maintain current asset paths and hosting reliability. |
| **Aspect Ratio Preservation** | 🟢 **PASS** | Product cards reserve a 4:5 media area; Gallery cards use 1:1. Images use `object-fit: contain` where full products must remain visible. | Keep these aspect ratios and fit rules consistent. |
| **Cumulative Layout Shift (CLS)** | 🟢 **PASS** | Image elements have explicit dimensions and media containers reserve space before loading. | Preserve dimensions when adding or replacing images. |
| **Grid Responsiveness** | 🟢 **PASS** | Gallery transitions 1 col (mobile) → 2 (small tablet) → 3 (tablet) → 4 (desktop); product grids remain fluid. | Keep fluid breakpoints and responsive `sizes` aligned. |
| **Resolution Responsiveness** | 🟢 **PASS** | 46 local product images now have 400w/800w/1200w WebP variants where source width permits; browsers select via `srcset` and original files remain fallbacks. | Run `npm run images:generate` after changing local product images. |

---

## 2. Product Image Integrity & Verification Details

### Verified Working Assets
All product variants and promotional visual components load without error:
- **Standard Frame Sizes:** 18×24 Inch, 24×36 Inch, 24×42 Inch, and 12×18 Inch Glowbox frames.
- **Architectural Displays:** Custom temple arch display frames and industrial client branding boards.
- **Interactive Visualizers:** Before/After unlit vs. illuminated slider graphics.
- **Hero & Promotional:** Rajkot factory manufacturing banners and Instagram reel preview cards.
- **Error Check:** Zero `404 Not Found`, blocked CORS requests, zero-byte files, or broken `alt` text placeholders.

---

## 3. Aspect Ratio & Distortion Analysis

### The Root Cause: Mixed Intrinsic Ratios in Uniform Cards
Swashine products have varying real-world proportions:
- **24×36" Frames:** 2:3 aspect ratio (0.67 tall).
- **18×24" Frames:** 3:4 aspect ratio (0.75 tall).
- **24×42" Frames:** 4:7 aspect ratio (0.57 tall).
- **Arch / Custom Temple Units:** Specialized vertical contours.

When placed inside square or fixed-height card containers without explicit `object-fit` containment:
1. **Pillarboxing:** Empty dark gaps appear on the left and right of tall frames.
2. **Distortion Risk:** If container heights are constrained on mobile viewports without `object-fit: contain`, browsers risk compressing or stretching the illuminated frame proportions.
3. **Layout Shift (CLS):** Without fixed aspect-ratio containers, the browser cannot calculate card height before the image file finishes downloading.

### Implementation: CSS Card Scaffolding
Add this CSS to preserve natural frame proportions without stretching, cropping, or layout shifts:

```css
/* Container reserves precise layout space before image download */
.product-card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5; /* Balanced container ratio for portrait display frames */
  background-color: #141414; /* Smooth placeholder tone matching dark theme */
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Image scales cleanly without distortion or cropping */
.product-card-media img {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Retains true frame proportions without distortion */
  object-position: center;
  display: block;
}
```

---

## 4. Responsive Grid & Resolution Optimization

### 4.1 Fluid Layout Grid (Current Behavior)
The existing layout grid scales appropriately across modern screen breakpoints:
- **Desktop (≥ 1024px):** 4-column product grid with 24px (`gap-6`) margins.
- **Tablet (640px – 1023px):** 2-column balanced grid with 16px (`gap-4`) margins.
- **Mobile (< 640px):** 1-column full-width presentation (`w-full`) for effortless vertical swiping.

### 4.2 Missing Asset-Level Responsiveness (`srcset`)
While the CSS grid adapts, the image payload does not:
- A 375px mobile screen downloads the full-resolution 1200px desktop image (~800 KB – 1.5 MB).
- **Solution:** Implement responsive `<picture>` tags with WebP/AVIF formats and multi-resolution `srcset` variants (400w, 800w, 1200w).

#### Production Ready Markup
```html
<div class="product-card-media">
  <picture>
    <!-- Modern Next-Gen AVIF Format -->
    <source
      type="image/avif"
      srcset="/images/products/glowbox-24x36-400.avif 400w,
              /images/products/glowbox-24x36-800.avif 800w,
              /images/products/glowbox-24x36-1200.avif 1200w"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
    <!-- Modern WebP Format -->
    <source
      type="image/webp"
      srcset="/images/products/glowbox-24x36-400.webp 400w,
              /images/products/glowbox-24x36-800.webp 800w,
              /images/products/glowbox-24x36-1200.webp 1200w"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
    <!-- Fallback Image with Intrinsic Dimensions to Prevent CLS -->
    <img
      src="/images/products/glowbox-24x36-800.jpg"
      alt="24x36 Inch LED Glowbox illuminated display frame manufactured in Rajkot"
      width="800"
      height="1000"
      loading="lazy"
      decoding="async"
      class="w-full h-full object-contain"
    />
  </picture>
</div>
```

---

## 5. Upcoming Changes & Action Plan

### Sprint 1: Aspect Ratio & CLS Stabilization (Priority 1)
1. **Complete:** Add explicit `width` and `height` attributes to image elements; local product images use generated intrinsic dimensions.
2. **Complete:** Use fixed-ratio media containers for product cards and Gallery images, with `object-fit: contain`.
3. **Not applicable:** Gallery has no image-loading `IntersectionObserver`; it uses native `loading="lazy"` with fixed-ratio containers.

### Sprint 2: Resolution & Performance Optimization (Priority 2)
1. **Complete:** Sharp generates 400px, 800px, and 1200px WebP variants, omitting widths larger than each source.
2. **Complete:** Homepage featured cards, product cards, product detail images, and Gallery images use responsive `<picture>` sources with `srcset` and `sizes`; original assets are the format fallback.
3. **Complete:** Product-card and Gallery alt text identifies the product and category; decorative Gallery thumbnails retain empty alt text.

---

## 6. Verification & Quality Assurance Checklist

- [x] **Asset Check:** Confirm all 46 metadata entries and 99 generated WebP variants exist and decode correctly.
- [x] **Responsive Source Check:** At a 375px viewport, confirm the browser selects a 400w WebP variant for Gallery images.
- [x] **Layout Check:** Confirm 4 Gallery columns at 1440px, 3 at 768px, and 1 at 375px, with no horizontal overflow; visually inspect the mobile layout.
- [ ] **Google Lighthouse Audit:** Run a mobile performance audit to confirm Cumulative Layout Shift (CLS) score remains under `0.1`.

### Regenerating Product Image Variants

Run `yarn images:generate` after adding or replacing files under `src/assets/images/products/`. The command writes WebP variants under `public/images/products/` and refreshes `src/data/product-image-metadata.json`, which provides intrinsic dimensions and responsive source paths to `ResponsiveImage`.
