"use client";

import { useState } from "react";

export default function NewsletterForm({
  cta = "Subscribe",
}: {
  cta?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) {
      setEmail("");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
      <input
        required
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="your@email.com"
        className="ui-text min-h-12 flex-1 border border-cream-dark bg-white px-4 text-sm text-ink outline-none transition focus:border-gold"
      />
      <button className="btn btn-primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending" : cta}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "success"
          ? "Subscribed successfully"
          : status === "error"
            ? "Subscription failed"
            : ""}
      </span>
    </form>
  );
}
