export function getSiteOrigin(request) {
  const configuredUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;
  if (configuredUrl) {
    const url = new URL(configuredUrl);
    if (url.protocol !== "https:" && url.hostname !== "localhost") {
      throw new Error("SITE_URL must use HTTPS.");
    }
    if (url.pathname !== "/" || url.search || url.hash) {
      throw new Error("SITE_URL must contain only the site's origin.");
    }
    return url.origin;
  }

  const host = request.headers["x-forwarded-host"] || request.headers.host;
  if (!host) {
    throw new Error("Unable to determine the request host for SEO files.");
  }
  return new URL(`https://${String(host).split(",")[0].trim()}`).origin;
}
