import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { company, products } from "@/data/company";
import heroImage from "@/assets/images/hero-section/slider_img1.png";

const pages = {
  "/": {
    title: "LED Glowboxes Manufacturer in India | Swashine Glowbox",
    description:
      "Shop premium LED glowboxes and custom illuminated displays, made by Swastik Industries in Rajkot, Gujarat. Manufacturer-direct quality and custom sizes.",
  },
  "/products": {
    title: "LED Glowboxes & Display Frames | Swashine Glowbox",
    description:
      "Explore wall-mounted, tabletop and custom-size LED glowboxes from Swashine Glowbox. Manufacturer-direct products from Rajkot, India.",
  },
  "/catalogs": {
    title: "Product Catalogs | Swashine Glowbox",
    description:
      "Browse Swashine Glowbox product catalogs for LED display frames, sizes, options and specifications.",
  },
  "/about": {
    title: "About Swashine Glowbox | LED Display Manufacturer",
    description:
      "Meet Swashine Glowbox by Swastik Industries, a Rajkot-based Indian manufacturer of premium LED glowboxes and illuminated display systems.",
  },
  "/gallery": {
    title: "LED Glowbox Gallery | Swashine Glowbox",
    description:
      "See Swashine LED glowboxes, illuminated displays and custom signage in real-world installations and product photos.",
  },
  "/custom": {
    title: "Custom-Size LED Glowboxes | Swashine Glowbox",
    description:
      "Get an LED glowbox made to your exact dimensions. Explore custom sizing and request a manufacturer-direct quote from Swashine.",
  },
  "/contact": {
    title: "Contact Swashine Glowbox | Rajkot, Gujarat",
    description:
      "Contact Swashine Glowbox for product details, custom LED display sizes, dealer enquiries and manufacturer-direct quotations.",
  },
  "/how-it-works": {
    title: "How LED Glowboxes Work | Swashine Glowbox",
    description:
      "Learn how Swashine LED glowboxes illuminate posters and how to install, power and change the display artwork.",
  },
  "/faq": {
    title: "LED Glowbox FAQs | Swashine Glowbox",
    description:
      "Find answers about Swashine Glowbox sizes, artwork, installation, delivery, warranty and ordering.",
  },
  "/dealers": {
    title: "Become a Swashine Glowbox Dealer",
    description:
      "Ask about dealer opportunities for Swashine Glowbox LED displays, manufactured by Swastik Industries in Rajkot, India.",
  },
  "/reviews": {
    title: "Customer Reviews | Swashine Glowbox",
    description:
      "Read customer feedback about Swashine Glowbox LED displays, product quality and service.",
  },
};

function siteOrigin() {
  const configuredUrl = import.meta.env.VITE_SITE_URL;
  if (configuredUrl) {
    const url = new URL(configuredUrl);
    if (url.protocol !== "https:" && url.hostname !== "localhost") {
      throw new Error("VITE_SITE_URL must use HTTPS.");
    }
    if (url.pathname !== "/" || url.search || url.hash) {
      throw new Error("VITE_SITE_URL must contain only the site's origin.");
    }
    return url.origin;
  }
  return window.location.origin;
}

function upsertMeta(attribute, name, content) {
  const selector = `meta[${attribute}="${name}"]`;
  let element = document.head.querySelector(selector);

  if (!content) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function organizationSchema(origin) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.parent,
    url: origin,
    logo: new URL("/favicon.png", origin).href,
    description: company.description,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Gate 2, Pan Business Park, Behind Kishan Petrol Pump, Opp. Laxmi Loader",
      addressLocality: "Rajkot",
      addressRegion: "Gujarat",
      postalCode: "360022",
      addressCountry: "IN",
    },
    sameAs: [company.instagram, company.facebook],
  };
}

export default function SEO() {
  const { pathname } = useLocation();

  useEffect(() => {
    const origin = siteOrigin();
    const path = pathname.replace(/\/+$/, "") || "/";
    const productMatch = path.match(/^\/products\/([^/]+)$/);
    const product = productMatch
      ? products.find((item) => item.slug === productMatch[1])
      : null;
    const page = pages[path];
    const isAdmin = path === "/admin" || path.startsWith("/admin/");
    const isUnknown = !page && !product && !productMatch && !isAdmin;
    const title = product
      ? `${product.name} | Swashine Glowbox`
      : page?.title || (productMatch ? "LED Glowbox | Swashine Glowbox" : "Page not found | Swashine Glowbox");
    const description =
      product?.description ||
      page?.description ||
      "Explore premium LED glowboxes and custom illuminated displays from Swashine Glowbox, Rajkot, India.";
    const canonical = !isAdmin && !isUnknown ? new URL(path, origin).href : null;
    const image = product?.image || heroImage;
    const imageUrl = new URL(image, origin).href;
    const robots = isAdmin || isUnknown ? "noindex,nofollow" : "index,follow";
    const structuredData = [];

    if (path === "/") {
      structuredData.push(organizationSchema(origin), {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: company.name,
        url: origin,
      });
    }

    if (product) {
      structuredData.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.gallery?.map((src) => new URL(src, origin).href) || [
          imageUrl,
        ],
        brand: {
          "@type": "Brand",
          name: company.name,
        },
        manufacturer: {
          "@type": "Organization",
          name: company.parent,
        },
        category: product.category,
      });
    }

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:type", product ? "product" : "website");
    upsertMeta("property", "og:site_name", company.name);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    } else {
      canonicalLink?.remove();
    }

    document.head.querySelector('script[data-seo-jsonld]')?.remove();
    if (structuredData.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = "true";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
}
