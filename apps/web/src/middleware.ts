import { NextResponse, type NextRequest } from "next/server";

import { getLocaleByDomain } from "@rayo/localisation/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get("host") as string;
  const locale = getLocaleByDomain(host);

  // This add a cache header for all routes what get rewrite (mostly HTML documents and rsc payloads)
  // https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/
  const requestHeaders = new Headers();
  requestHeaders.set("Cache-Tag", "document");
  requestHeaders.set("x-build-id", process.env.NEXTJS_BUILD_ID ?? "");

  return NextResponse.rewrite(
    new URL("/" + locale + pathname + search, request.url),
    { headers: requestHeaders },
  );
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|static-assets|mockServiceWorker.js).*)",
  ],
};
