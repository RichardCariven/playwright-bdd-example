import { NextResponse, type NextRequest } from "next/server";

import { domainLocaleMap } from "@rayo/localisation/i18n";

import { middleware } from "./middleware";

describe("Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const requestHeaders = new Headers();
  requestHeaders.set("Cache-Tag", "document");
  requestHeaders.set("x-build-id", "");

  it("should rewrite the URL with the correct locale", () => {
    const [host, locale] = Object.entries(domainLocaleMap)[0];
    const mockRequestHeaders = new Headers();
    mockRequestHeaders.set("host", host);

    const mockRequest = {
      nextUrl: {
        pathname: "/test-path",
        search: "?query=1",
      },
      headers: mockRequestHeaders,
      url: "https://example.com/test-path?query=1",
    } as unknown as NextRequest;

    const result = middleware(mockRequest);

    expect(result).toBeInstanceOf(NextResponse);
    expect(result).toEqual(
      NextResponse.rewrite(
        new URL(`https://example.com/${locale}/test-path?query=1`),
        { headers: requestHeaders },
      ),
    );
  });

  it("should rewrite the URL with another locale", () => {
    const [host, locale] = Object.entries(domainLocaleMap)[1];
    const mockRequestHeaders = new Headers();
    mockRequestHeaders.set("host", host);

    const mockRequest = {
      nextUrl: {
        pathname: "/test-path",
        search: "?query=2",
      },
      headers: mockRequestHeaders,
      url: "https://example.com/test-path?query=2",
    } as unknown as NextRequest;

    const result = middleware(mockRequest);

    expect(result).toBeInstanceOf(NextResponse);
    expect(result).toEqual(
      NextResponse.rewrite(
        new URL(`https://example.com/${locale}/test-path?query=2`),
        { headers: requestHeaders },
      ),
    );
  });

  it("should throw an error for missing host header", () => {
    const mockRequestHeaders = new Headers();
    // No host header

    const mockRequest = {
      nextUrl: {
        pathname: "/test-path",
        search: "?query=3",
      },
      headers: mockRequestHeaders,
      url: "http://localhost:3000/test-path?query=3",
    } as unknown as NextRequest;

    expect(() => middleware(mockRequest)).toThrow(
      "Cant assign a locale for undefined hostname",
    );
  });

  it("should throw an error for unkown host", () => {
    const mockRequestHeaders = new Headers();
    mockRequestHeaders.set("host", "foo.fi");

    const mockRequest = {
      nextUrl: {
        pathname: "/test-path",
        search: "?query=3",
      },
      headers: mockRequestHeaders,
      url: "http://localhost:3000/test-path?query=3",
    } as unknown as NextRequest;

    expect(() => middleware(mockRequest)).toThrow(
      "Cant find a base domain for hostname foo.fi, therefore cant assign a locale",
    );
  });
});
