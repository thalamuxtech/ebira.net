"use client";

import { useEffect, useState } from "react";
import { Loader2, LogOut, ShieldAlert } from "lucide-react";
import { signIn, signOut, watchSession, type Session } from "@/lib/auth";
import { Dashboard } from "@/components/admin/dashboard";

type State =
  | { phase: "loading" }
  | { phase: "signed-out" }
  | { phase: "no-role"; session: Session }
  | { phase: "ready"; session: Session };

export function AdminApp() {
  const [state, setState] = useState<State>({ phase: "loading" });

  useEffect(() => {
    return watchSession((session) => {
      if (!session) return setState({ phase: "signed-out" });
      if (session.role === "admin" || session.role === "editor") {
        setState({ phase: "ready", session });
      } else {
        setState({ phase: "no-role", session });
      }
    });
  }, []);

  if (state.phase === "loading") {
    return (
      <Shell>
        <div className="flex items-center gap-3 text-ink-soft">
          <Loader2 size={18} className="animate-spin" /> Checking session…
        </div>
      </Shell>
    );
  }

  if (state.phase === "signed-out") {
    return (
      <Shell>
        <LoginForm />
      </Shell>
    );
  }

  if (state.phase === "no-role") {
    return (
      <Shell>
        <div className="max-w-md rounded-3xl border border-line bg-raised p-8 shadow-soft">
          <ShieldAlert size={22} className="text-clay" />
          <h1 className="display mt-3 text-xl font-semibold text-ink">
            No reviewer access
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {state.session.user.email} is signed in but has no editor or admin
            role. Ask an administrator to grant one.
          </p>
          <button
            type="button"
            onClick={() => signOut()}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-clay hover:text-clay"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </Shell>
    );
  }

  return <Dashboard session={state.session} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex min-h-svh max-w-6xl items-center justify-center px-5">
      {children}
    </section>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(email.trim(), password);
      // watchSession in the parent takes over from here
    } catch {
      setError("Sign-in failed. Check the email and password.");
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-3xl border border-line bg-raised p-8 shadow-soft"
    >
      <h1 className="display text-2xl font-semibold text-ink">
        Reviewer sign-in
      </h1>
      <p className="mt-1.5 text-sm text-ink-faint">
        For editors and administrators of Ebira.net.
      </p>
      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="admin-email" className="text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-2xl border border-line-strong bg-bg px-4 text-[15px] text-ink focus:border-clay focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="admin-password"
            className="text-sm font-semibold text-ink"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 h-12 w-full rounded-2xl border border-line-strong bg-bg px-4 text-[15px] text-ink focus:border-clay focus:outline-none"
          />
        </div>
      </div>
      <p className="mt-3 min-h-5 text-sm text-clay-strong" aria-live="polite">
        {error}
      </p>
      <button
        type="submit"
        disabled={busy}
        className="mt-2 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-clay text-[15px] font-semibold text-white shadow-soft transition-all duration-200 hover:bg-clay-strong active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
      >
        {busy ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
