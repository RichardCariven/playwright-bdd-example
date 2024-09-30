/**
 * Without catch-all route all api paths which do not exist drop
 * under [locale] and cause "unkown locale" error.
 *
 * With optional catch-all route we can handle 404 responses here
 * for everything under /api
 */

export function GET() {
  return new Response("", {
    status: 404,
    headers: { "cache-control": "max-age=31536000" },
  });
}
