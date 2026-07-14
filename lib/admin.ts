"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs,
  doc,
  writeBatch,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuAjw85Z6si9cYoTQC8DTso0CDNtIZpwk",
  authDomain: "ebira-network.firebaseapp.com",
  projectId: "ebira-network",
  storageBucket: "ebira-network.firebasestorage.app",
  messagingSenderId: "328919970173",
  appId: "1:328919970173:web:2d4fca24fd1d5b19dbdc14",
  measurementId: "G-SKXKLJ6TNB",
};

function db() {
  const app: FirebaseApp = getApps()[0] ?? initializeApp(firebaseConfig);
  return getFirestore(app);
}

export interface Submission {
  id: string;
  kind: "word" | "riddle" | "proverb" | "story";
  ebira: string;
  english: string;
  dialect: string;
  note?: string;
  contributorName?: string;
  anonymous: boolean;
  createdAt?: Timestamp;
  queuedAt?: string;
}

export interface WaitlistRow {
  id: string;
  email: string;
  source: string;
  createdAt?: Timestamp;
  queuedAt?: string;
}

export async function fetchPendingSubmissions(): Promise<Submission[]> {
  const snap = await getDocs(
    query(
      collection(db(), "submissions"),
      where("status", "==", "pending_review"),
      limit(100)
    )
  );
  const rows = snap.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as Submission
  );
  return rows.sort(
    (a, b) => (b.queuedAt ?? "").localeCompare(a.queuedAt ?? "")
  );
}

export async function fetchWaitlist(): Promise<WaitlistRow[]> {
  const snap = await getDocs(query(collection(db(), "waitlist"), limit(500)));
  const rows = snap.docs.map(
    (d) => ({ id: d.id, ...d.data() }) as WaitlistRow
  );
  return rows.sort(
    (a, b) => (b.queuedAt ?? "").localeCompare(a.queuedAt ?? "")
  );
}

/**
 * Approve a submission: stamp it, and promote a published copy into the
 * right content collection with credit and licence attached.
 */
export async function approveSubmission(
  sub: Submission,
  reviewerEmail: string
): Promise<void> {
  const database = db();
  const batch = writeBatch(database);
  const target = sub.kind === "word" ? "entries" : "heritage";

  batch.update(doc(database, "submissions", sub.id), {
    status: "approved",
    reviewedBy: reviewerEmail,
    reviewedAt: serverTimestamp(),
  });

  const published = doc(collection(database, target));
  if (sub.kind === "word") {
    batch.set(published, {
      headword: sub.ebira,
      senses: [sub.english],
      dialect: sub.dialect,
      note: sub.note ?? null,
      status: "published",
      licence: "CC BY 4.0",
      credit: sub.anonymous ? "anonymous" : (sub.contributorName ?? "anonymous"),
      source: "community-submission",
      submissionId: sub.id,
      createdAt: serverTimestamp(),
    });
  } else {
    batch.set(published, {
      type: sub.kind,
      text: sub.ebira,
      gloss: sub.english,
      dialect: sub.dialect,
      note: sub.note ?? null,
      status: "published",
      licence: "CC BY 4.0",
      credit: sub.anonymous ? "anonymous" : (sub.contributorName ?? "anonymous"),
      submissionId: sub.id,
      createdAt: serverTimestamp(),
    });
  }
  await batch.commit();
}

export async function rejectSubmission(
  id: string,
  reviewerEmail: string
): Promise<void> {
  const batch = writeBatch(db());
  batch.update(doc(db(), "submissions", id), {
    status: "rejected",
    reviewedBy: reviewerEmail,
    reviewedAt: serverTimestamp(),
  });
  await batch.commit();
}
