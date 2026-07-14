"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { joinWaitlist, flushWaitlistQueue } from "@/lib/firebase";

type FormState = "idle" | "sending" | "sent" | "queued" | "error";

export function WaitlistForm({ source = "landing" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");

  useEffect(() => {
    // retry anything captured offline on a previous visit
    flushWaitlistQueue().catch(() => {});
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setState("error");
      return;
    }
    setState("sending");
    const result = await joinWaitlist(value, source);
    setState(result);
    setEmail("");
  }

  if (state === "sent" || state === "queued") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-sage/40 bg-sage-soft px-5 py-4 text-left"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage text-white">
          <Check size={14} strokeWidth={3} />
        </span>
        <div>
          <p className="font-semibold text-ink">
            {state === "sent" ? "You’re on the list." : "Saved on this device."}
          </p>
          <p className="mt-0.5 text-sm text-ink-soft">
            {state === "sent"
              ? "We’ll write when the dictionary opens. Ẹ́bírà lives here — and now, so do you."
              : "We couldn’t reach the server just now, so your signup is saved on this device and will sync automatically on a future visit."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor={`waitlist-email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`waitlist-email-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          className="h-13 flex-1 rounded-full border border-line-strong bg-raised px-5 text-[15px] text-ink placeholder:text-ink-faint focus:border-clay focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex h-13 cursor-pointer items-center justify-center gap-2 rounded-full bg-clay px-7 text-[15px] font-semibold text-white shadow-soft transition-all duration-200 hover:bg-clay-strong active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Joining…
            </>
          ) : (
            "Join the waitlist"
          )}
        </button>
      </div>
      <p
        className={`mt-2 min-h-5 text-sm ${
          state === "error" ? "text-clay-strong" : "text-ink-faint"
        }`}
        aria-live="polite"
      >
        {state === "error"
          ? "Please enter a valid email address."
          : "No spam — only launch news and ways to contribute."}
      </p>
    </form>
  );
}
