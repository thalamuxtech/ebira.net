"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Public client identifiers, not secrets. Real protection lives in
// Firestore security rules (the public may only `create` into `waitlist`).
const firebaseConfig = {
  apiKey: "AIzaSyCuAjw85Z6si9cYoTQC8DTso0CDNtIZpwk",
  authDomain: "ebira-network.firebaseapp.com",
  projectId: "ebira-network",
  storageBucket: "ebira-network.firebasestorage.app",
  messagingSenderId: "328919970173",
  appId: "1:328919970173:web:2d4fca24fd1d5b19dbdc14",
  measurementId: "G-SKXKLJ6TNB",
};

function getApp(): FirebaseApp {
  return getApps()[0] ?? initializeApp(firebaseConfig);
}

const QUEUE_KEY = "ebira-waitlist-queue";

interface QueuedSignup {
  email: string;
  source: string;
  queuedAt: string;
}

function readQueue(): QueuedSignup[] {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeQueue(queue: QueuedSignup[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // storage full or unavailable; nothing more we can do offline
  }
}

async function pushSignup(signup: QueuedSignup): Promise<void> {
  const db = getFirestore(getApp());
  await addDoc(collection(db, "waitlist"), {
    email: signup.email,
    source: signup.source,
    queuedAt: signup.queuedAt,
    createdAt: serverTimestamp(),
  });
}

/**
 * Join the waitlist. Tries Firestore; if the network (or rules) refuse,
 * the signup is queued in localStorage and retried on the next visit.
 * Returns "sent" or "queued" so the UI can be honest about what happened.
 */
export async function joinWaitlist(
  email: string,
  source: string
): Promise<"sent" | "queued"> {
  const signup: QueuedSignup = {
    email,
    source,
    queuedAt: new Date().toISOString(),
  };
  try {
    await pushSignup(signup);
    return "sent";
  } catch {
    writeQueue([...readQueue(), signup]);
    return "queued";
  }
}

export interface ContributionPayload {
  kind: "word" | "riddle" | "proverb" | "story";
  ebira: string;
  english: string;
  dialect: string;
  note?: string;
  contributorName?: string;
  anonymous: boolean;
  consent: true;
}

const SUBMIT_QUEUE_KEY = "ebira-contribute-queue";

/**
 * Submit a contribution into the pre-moderation queue. Same honesty
 * contract as the waitlist: "sent" hit Firestore, "queued" is waiting
 * on this device for a connection.
 */
export async function submitContribution(
  payload: ContributionPayload
): Promise<"sent" | "queued"> {
  const doc = { ...payload, queuedAt: new Date().toISOString() };
  try {
    const db = getFirestore(getApp());
    await addDoc(collection(db, "submissions"), {
      ...doc,
      status: "pending_review",
      createdAt: serverTimestamp(),
    });
    return "sent";
  } catch {
    try {
      const queue = JSON.parse(localStorage.getItem(SUBMIT_QUEUE_KEY) ?? "[]");
      queue.push(doc);
      localStorage.setItem(SUBMIT_QUEUE_KEY, JSON.stringify(queue));
    } catch {}
    return "queued";
  }
}

/** Retry queued signups and contributions. Call once on page load. */
export async function flushWaitlistQueue(): Promise<void> {
  const queue = readQueue();
  if (queue.length) {
    const remaining: QueuedSignup[] = [];
    for (const signup of queue) {
      try {
        await pushSignup(signup);
      } catch {
        remaining.push(signup);
      }
    }
    writeQueue(remaining);
  }

  try {
    const subs: (ContributionPayload & { queuedAt: string })[] = JSON.parse(
      localStorage.getItem(SUBMIT_QUEUE_KEY) ?? "[]"
    );
    if (!subs.length) return;
    const db = getFirestore(getApp());
    const left: typeof subs = [];
    for (const sub of subs) {
      try {
        await addDoc(collection(db, "submissions"), {
          ...sub,
          status: "pending_review",
          createdAt: serverTimestamp(),
        });
      } catch {
        left.push(sub);
      }
    }
    localStorage.setItem(SUBMIT_QUEUE_KEY, JSON.stringify(left));
  } catch {
    // storage unavailable; nothing to flush
  }
}
