"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Inbox,
  Loader2,
  LogOut,
  MailPlus,
  RefreshCw,
  X,
} from "lucide-react";
import { signOut, type Session } from "@/lib/auth";
import {
  approveSubmission,
  fetchPendingSubmissions,
  fetchWaitlist,
  rejectSubmission,
  type Submission,
  type WaitlistRow,
} from "@/lib/admin";

type Tab = "submissions" | "waitlist";

export function Dashboard({ session }: { session: Session }) {
  const [tab, setTab] = useState<Tab>("submissions");
  const [subs, setSubs] = useState<Submission[] | null>(null);
  const [wait, setWait] = useState<WaitlistRow[] | null>(null);
  const [error, setError] = useState("");
  const [actingOn, setActingOn] = useState<string | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const reload = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchPendingSubmissions(), fetchWaitlist()])
      .then(([s, w]) => {
        if (cancelled) return;
        setSubs(s);
        setWait(w);
        setError("");
      })
      .catch(() => {
        if (cancelled) return;
        setError(
          "Could not load data. Check your connection and role, then refresh."
        );
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  async function act(sub: Submission, decision: "approve" | "reject") {
    setActingOn(sub.id);
    setError("");
    try {
      if (decision === "approve") {
        await approveSubmission(sub, session.user.email ?? "unknown");
      } else {
        await rejectSubmission(sub.id, session.user.email ?? "unknown");
      }
      setSubs((prev) => prev?.filter((s) => s.id !== sub.id) ?? null);
    } catch {
      setError("The action failed. Refresh and try again.");
    } finally {
      setActingOn(null);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-40 sm:px-6 sm:pt-56">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="rule-ornament text-xs font-semibold uppercase tracking-[0.2em] text-gold-deep">
            Reviewer dashboard
          </p>
          <h1 className="display mt-2 text-3xl font-semibold text-ink">
            Validation queue
          </h1>
          <p className="mt-1 text-sm text-ink-faint">
            Signed in as {session.user.email} · role: {session.role}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={reload}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:border-gold hover:text-gold-deep"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:border-clay hover:text-clay"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      <div className="mt-8 flex gap-2 border-b border-line">
        {(
          [
            ["submissions", "Submissions", subs?.length],
            ["waitlist", "Waitlist", wait?.length],
          ] as [Tab, string, number | undefined][]
        ).map(([key, label, count]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`cursor-pointer rounded-t-xl px-5 py-3 text-sm font-semibold transition-colors duration-200 ${
              tab === key
                ? "border-b-2 border-clay bg-raised text-clay-strong"
                : "text-ink-faint hover:text-ink"
            }`}
          >
            {label}
            {typeof count === "number" && (
              <span className="ml-2 rounded-full bg-sunken px-2 py-0.5 text-xs">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="mt-4 min-h-5 text-sm text-clay-strong" aria-live="polite">
        {error}
      </p>

      {tab === "submissions" && (
        <SubmissionsTab subs={subs} actingOn={actingOn} onAct={act} />
      )}
      {tab === "waitlist" && <WaitlistTab rows={wait} />}
    </section>
  );
}

function SubmissionsTab({
  subs,
  actingOn,
  onAct,
}: {
  subs: Submission[] | null;
  actingOn: string | null;
  onAct: (sub: Submission, decision: "approve" | "reject") => void;
}) {
  if (!subs) {
    return (
      <div className="mt-6 flex items-center gap-3 text-ink-soft">
        <Loader2 size={16} className="animate-spin" /> Loading submissions…
      </div>
    );
  }
  if (subs.length === 0) {
    return (
      <div className="mt-6 rounded-3xl border border-dashed border-line-strong bg-sunken/50 p-10 text-center">
        <Inbox size={22} className="mx-auto text-ink-faint" />
        <p className="mt-3 font-semibold text-ink">The queue is clear.</p>
        <p className="mt-1 text-sm text-ink-faint">
          New community submissions will appear here for review.
        </p>
      </div>
    );
  }
  return (
    <ul className="mt-6 grid gap-3">
      {subs.map((sub) => (
        <li
          key={sub.id}
          className="rounded-2xl border border-line bg-raised p-5 shadow-soft sm:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-clay-soft px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-clay-strong">
                  {sub.kind}
                </span>
                <span className="rounded-full bg-sunken px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {sub.dialect}
                </span>
                <span className="text-xs text-ink-faint">
                  {sub.anonymous
                    ? "anonymous"
                    : (sub.contributorName ?? "no name given")}
                  {sub.queuedAt && ` · ${new Date(sub.queuedAt).toLocaleString()}`}
                </span>
              </div>
              <p className="display mt-3 text-xl font-semibold text-ink">
                {sub.ebira}
              </p>
              <p className="mt-1 text-[15px] text-ink-soft">{sub.english}</p>
              {sub.note && (
                <p className="mt-2 text-sm italic text-ink-faint">
                  Note: {sub.note}
                </p>
              )}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                disabled={actingOn === sub.id}
                onClick={() => onAct(sub, "approve")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-sage px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
              >
                {actingOn === sub.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Check size={14} />
                )}
                Approve
              </button>
              <button
                type="button"
                disabled={actingOn === sub.id}
                onClick={() => onAct(sub, "reject")}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:border-clay hover:text-clay disabled:cursor-wait disabled:opacity-60"
              >
                <X size={14} /> Reject
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function WaitlistTab({ rows }: { rows: WaitlistRow[] | null }) {
  if (!rows) {
    return (
      <div className="mt-6 flex items-center gap-3 text-ink-soft">
        <Loader2 size={16} className="animate-spin" /> Loading waitlist…
      </div>
    );
  }
  if (rows.length === 0) {
    return (
      <div className="mt-6 rounded-3xl border border-dashed border-line-strong bg-sunken/50 p-10 text-center">
        <MailPlus size={22} className="mx-auto text-ink-faint" />
        <p className="mt-3 font-semibold text-ink">No signups yet.</p>
      </div>
    );
  }
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-raised shadow-soft">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-5 py-3.5 font-semibold">Email</th>
            <th className="px-5 py-3.5 font-semibold">Source</th>
            <th className="px-5 py-3.5 font-semibold">Joined</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line/60 last:border-0">
              <td className="px-5 py-3 font-medium text-ink">{row.email}</td>
              <td className="px-5 py-3 text-ink-soft">{row.source}</td>
              <td className="px-5 py-3 text-ink-faint">
                {row.queuedAt ? new Date(row.queuedAt).toLocaleString() : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
