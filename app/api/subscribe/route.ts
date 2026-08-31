import { NextResponse } from "next/server";

const BACKEND = process.env.API_PROXY_TARGET ?? "http://localhost:4000";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND}/api/v1/forms/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;
      const message = data?.error?.message ?? "Subscription failed";
      return NextResponse.json({ error: message }, { status: res.status });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to reach server" }, { status: 503 });
  }
}
