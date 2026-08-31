import { NextResponse } from "next/server";

const BACKEND = process.env.API_PROXY_TARGET ?? "http://localhost:4000";

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const subject = String(formData.get("subject") ?? "");
  const message = String(formData.get("message") ?? "");

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND}/api/v1/forms/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;
      const errorMessage = data?.error?.message ?? "Failed to send message";
      return NextResponse.json({ error: errorMessage }, { status: res.status });
    }

    return NextResponse.redirect(new URL("/contact?sent=1", request.url), {
      status: 303,
    });
  } catch {
    return NextResponse.json({ error: "Unable to reach server" }, { status: 503 });
  }
}
