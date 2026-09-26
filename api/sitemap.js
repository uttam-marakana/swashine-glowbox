import { getSiteOrigin } from "../server/siteUrl.js";

const publicPaths = [
  "/",
  "/products",
  "/catalogs",
  "/about",
  "/gallery",
  "/custom",
  "/contact",
  "/how-it-works",
  "/faq",
  "/dealers",
  "/reviews",
  "/products/18x24-inch-led-glowbox",
  "/products/24x36-inch-led-glowbox",
  "/products/24x42-inch-led-glowbox",
  "/products/12x18-inch-led-glowbox",
  "/products/a4-table-top-led-glowbox",
  "/products/arch-glowbox",
  "/products/a5-table-top-led-glowbox",
  "/products/custom-size-glowbox",
];

export default function sitemap(request, response) {
  const origin = getSiteOrigin(request);
  const urls = publicPaths
    .map((path) => `  <url><loc>${new URL(path, origin).href}</loc></url>`)
    .join("\n");

  response.setHeader("Content-Type", "application/xml; charset=utf-8");
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  response.status(200).send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  );
}
