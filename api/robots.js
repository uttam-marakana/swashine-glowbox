import { getSiteOrigin } from "../server/siteUrl.js";

export default function robots(request, response) {
  const origin = getSiteOrigin(request);

  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  response.status(200).send(
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
}
