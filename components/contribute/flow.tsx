"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  flushWaitlistQueue,
  submitContribution,
  type ContributionPayload,
} from "@/lib/firebase";

type Kind = ContributionPayload["kind"];
const KINDS: { value: Kind; label: string }[] = [
  { value: "word", label: "A word" },
  { value: "riddle", label: "A riddle" },
  { value: "proverb", label: "A proverb" },
  { value: "story", label: "A story" },
];
const DIALECTS = ["Tao", "Etuno", "Igu", "Not sure"];

type Status = "editing" | "sending" | "sent" | "queued";

export function ContributeFlow() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [status, setStatus] = useState<Status>("editing");
  const [error, setError] = useState("");

  const [kind, setKind] = useState<Kind>("word");
  const [ebira, setEbira] = useState("");
  const [english, setEnglish] = useState("");
  const [dialect, setDialect] = useState("Not sure");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // retry anything captured offline on a previous visit
    flushWaitlistQueue().catch(() => {});
  }, []);

  function go(next: number) {
    setError("");
    if (next > step) {
      if (step === 1 && !ebira.trim()) {
        setError("Please write the Ebira text — spelling as you remember it is fine.");
        return;
      }
      if (step === 1 && !english.trim()) {
        setError("Please add what it means in English.");
        return;
      }
    }
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  async function submit() {
    if (!consent) {
      setError("Open release consent is required — it’s what lets the whole community use your contribution.");
      return;
    }
    setError("");
    setStatus("sending");
    const result = await submitContribution({
      kind,
      ebira: ebira.trim(),
      english: english.trim(),
      dialect,
      note: note.trim() || undefined,
      contributorName: anonymous ? undefined : name.trim() || undefined,
      anonymous,
      consent: true,
    });
    setStatus(result);
  }

  if (status === "sent" || status === "queued") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-sage/40 bg-sage-soft p-8 sm:p-10"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-white">
          <Check size={22} strokeWidth={3} />
        </span>
        <h2 className="display mt-5 text-2xl font-semibold text-ink">
          {status === "sent"
            ? "Received — thank you."
            : "Saved on this device."}
        </h2>
        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
          {status === "sent"
            ? `“${ebira}” is in the validation queue. A native-speaker reviewer will check it, and if it publishes it carries ${
                anonymous ? "an anonymous credit" : "your credit"
              } permanently.`
            : "We couldn’t reach the server just now, so your contribution is saved on this device and will submit on a future visit."}
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("editing");
            setStep(0);
            setEbira("");
            setEnglish("");
            setNote("");
            setConsent(false);
          }}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-clay-strong"
        >
          Contribute another
        </button>
      </div>
    );
  }

  const steps = ["What is it?", "The words", "Consent & credit"];

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-raised shadow-soft">
      {/* progress dots */}
      <div className="flex items-center gap-2 border-b border-line px-6 py-4 sm:px-8">
        {steps.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => i < step && go(i)}
            aria-label={`Step ${i + 1}: ${label}${i === step ? " (current)" : ""}`}
            aria-current={i === step ? "step" : undefined}
            className={`flex items-center gap-2 ${i < step ? "cursor-pointer" : "cursor-default"}`}
          >
            <span
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === step
                  ? "w-8 bg-clay"
                  : i < step
                    ? "w-2.5 bg-gold"
                    : "w-2.5 bg-line-strong"
              }`}
            />
            <span
              className={`hidden text-xs font-semibold sm:inline ${
                i === step ? "text-ink" : "text-ink-faint"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 && <span className="w-2" />}
          </button>
        ))}
      </div>

      <div className="relative min-h-96 px-6 py-7 sm:px-8">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={reduced ? false : { opacity: 0, x: 40 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -40 * dir }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="display text-xl font-semibold text-ink">
                  What are you contributing?
                </legend>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {KINDS.map((k) => (
                    <button
                      key={k.value}
                      type="button"
                      onClick={() => setKind(k.value)}
                      aria-pressed={kind === k.value}
                      className={`cursor-pointer rounded-2xl border px-5 py-4 text-left text-[15px] font-semibold transition-colors duration-200 ${
                        kind === k.value
                          ? "border-clay bg-clay-soft text-clay-strong"
                          : "border-line bg-sunken/50 text-ink-soft hover:border-clay/50"
                      }`}
                    >
                      {k.label}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm text-ink-faint">
                  Voice recordings arrive with the corpus recorder — for now,
                  text travels fine.
                </p>
              </fieldset>
            )}

            {step === 1 && (
              <div>
                <h2 className="display text-xl font-semibold text-ink">
                  Write it as you remember it.
                </h2>
                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="c-ebira"
                      className="text-sm font-semibold text-ink"
                    >
                      In Ebira
                    </label>
                    <textarea
                      id="c-ebira"
                      rows={2}
                      value={ebira}
                      onChange={(e) => setEbira(e.target.value)}
                      placeholder="Spelling doesn’t need to be perfect — reviewers align it to the EDP standard."
                      className="mt-1.5 w-full rounded-2xl border border-line-strong bg-bg px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:border-clay focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="c-english"
                      className="text-sm font-semibold text-ink"
                    >
                      What it means in English
                    </label>
                    <textarea
                      id="c-english"
                      rows={2}
                      value={english}
                      onChange={(e) => setEnglish(e.target.value)}
                      className="mt-1.5 w-full rounded-2xl border border-line-strong bg-bg px-4 py-3 text-[15px] text-ink focus:border-clay focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="c-dialect"
                        className="text-sm font-semibold text-ink"
                      >
                        Dialect
                      </label>
                      <select
                        id="c-dialect"
                        value={dialect}
                        onChange={(e) => setDialect(e.target.value)}
                        className="mt-1.5 h-12 w-full cursor-pointer rounded-2xl border border-line-strong bg-bg px-4 text-[15px] text-ink focus:border-clay focus:outline-none"
                      >
                        {DIALECTS.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="c-note"
                        className="text-sm font-semibold text-ink"
                      >
                        Anything else{" "}
                        <span className="font-normal text-ink-faint">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="c-note"
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Who used it, when, where…"
                        className="mt-1.5 h-12 w-full rounded-2xl border border-line-strong bg-bg px-4 text-[15px] text-ink placeholder:text-ink-faint focus:border-clay focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="display text-xl font-semibold text-ink">
                  Consent &amp; credit
                </h2>
                <div className="mt-5 space-y-4">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="text-sm font-semibold text-ink"
                    >
                      Your name{" "}
                      <span className="font-normal text-ink-faint">
                        (for credit)
                      </span>
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      value={name}
                      disabled={anonymous}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5 h-12 w-full rounded-2xl border border-line-strong bg-bg px-4 text-[15px] text-ink focus:border-clay focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-sunken/50 p-4">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="mt-0.5 h-5 w-5 cursor-pointer accent-[#b8482e]"
                    />
                    <span className="text-sm leading-relaxed text-ink-soft">
                      Credit me as <strong>anonymous</strong> instead.
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gold/40 bg-gold-soft p-4">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-5 w-5 cursor-pointer accent-[#b8482e]"
                    />
                    <span className="text-sm leading-relaxed text-ink-soft">
                      I agree to release this contribution openly under{" "}
                      <strong>CC BY 4.0</strong> after review, and I understand
                      I may withdraw it within the defined window.
                    </span>
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <p
          className={`mt-4 min-h-5 text-sm ${error ? "text-clay-strong" : ""}`}
          aria-live="polite"
        >
          {error}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-5">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors duration-200 hover:text-ink disabled:invisible"
          >
            <ArrowLeft size={15} /> Back
          </button>
          {step < 2 ? (
            <button
              type="button"
              onClick={() => go(step + 1)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-clay-strong"
            >
              Continue <ArrowRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={status === "sending"}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-clay px-6 py-3 text-sm font-semibold text-white shadow-soft transition-colors duration-200 hover:bg-clay-strong disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Submitting…
                </>
              ) : (
                <>
                  Submit for review <Check size={15} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
