import { initializeApp, getApps } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { getFirestore, serverTimestamp, collection, addDoc, query, orderBy, onSnapshot, where, type Firestore } from 'firebase/firestore'

export type FirebaseServices = {
  app: FirebaseApp
  auth: ReturnType<typeof getAuth>
  db: Firestore
}

export function initFirebase(): FirebaseServices | null {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  } as const

  const hasConfig = Object.values(config).every((v) => typeof v === 'string' && v.length > 0)
  if (!hasConfig) return null

  const app = getApps().length ? getApps()[0]! : initializeApp(config)
  const auth = getAuth(app)
  const db = getFirestore(app)
  return { app, auth, db }
}

export const firebaseHelpers = {
  signInAnon: async (auth: ReturnType<typeof getAuth>) => {
    const cred = await signInAnonymously(auth)
    return cred.user
  },
  onAuth: (auth: ReturnType<typeof getAuth>, cb: (u: User | null) => void) => onAuthStateChanged(auth, cb),
  signOut: (auth: ReturnType<typeof getAuth>) => signOut(auth),
  serverTimestamp,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
}


