import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = (await request.json()) as { email?: string };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  // Beehiiv API integration can be enabled when API credentials are available.
  return NextResponse.json({ ok: true });
}
