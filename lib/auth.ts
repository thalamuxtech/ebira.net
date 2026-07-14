"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

// Same public client config as lib/firebase.ts; auth lives in its own
// module so the auth bundle only loads on the admin route.
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

export interface Session {
  user: User;
  role: string | null;
}

export async function signIn(email: string, password: string): Promise<Session> {
  const auth = getAuth(getApp());
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const token = await cred.user.getIdTokenResult();
  return { user: cred.user, role: (token.claims.role as string) ?? null };
}

export async function signOut(): Promise<void> {
  await fbSignOut(getAuth(getApp()));
}

/** Subscribe to auth state; callback receives the session or null. */
export function watchSession(cb: (session: Session | null) => void): () => void {
  const auth = getAuth(getApp());
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return cb(null);
    const token = await user.getIdTokenResult();
    cb({ user, role: (token.claims.role as string) ?? null });
  });
}
