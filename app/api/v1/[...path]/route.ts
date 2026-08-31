import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.API_PROXY_TARGET ?? "http://localhost:4000";
const SESSION_COOKIE = "tue_session";

async function syncSessionCookies(response: Response) {
  const cookieStore = await cookies();
  const setCookieHeaders =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie")!]
        : [];

  for (const header of setCookieHeaders) {
    if (!header.includes(`${SESSION_COOKIE}=`)) continue;

    const isClear =
      header.includes("Max-Age=0") ||
      new RegExp(`${SESSION_COOKIE}=;`).test(header) ||
      new RegExp(`${SESSION_COOKIE}=$`).test(header);

    if (isClear) {
      cookieStore.delete(SESSION_COOKIE);
      continue;
    }

    const match = header.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
    if (!match) continue;

    cookieStore.set(SESSION_COOKIE, match[1], {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
  }
}

async function proxy(request: NextRequest, pathSegments: string[]) {
  const path = pathSegments.join("/");
  const targetUrl = `${BACKEND}/api/v1/${path}${request.nextUrl.search}`;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  if (cookieHeader) headers.set("cookie", cookieHeader);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const backendResponse = await fetch(targetUrl, init);
  await syncSessionCookies(backendResponse);

  const responseHeaders = new Headers();
  const location = backendResponse.headers.get("location");
  if (location) responseHeaders.set("location", location);

  const responseContentType = backendResponse.headers.get("content-type");
  if (responseContentType) responseHeaders.set("content-type", responseContentType);

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    headers: responseHeaders,
  });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxy(request, (await context.params).path);
}
