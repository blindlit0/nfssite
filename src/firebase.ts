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
    apiKey: "AIzaSyBssuCrTf3Olti4Vyz6_IpZmm5TP3JSt70",
    authDomain: "nfssite-136e9.firebaseapp.com",
    projectId: "nfssite-136e9",
    storageBucket: "nfssite-136e9.firebasestorage.app",
    messagingSenderId: "380712651474",
    appId: "1:380712651474:web:b31c9411269d85c4b57b0b",
    measurementId: "G-MD2SPRKHNE",
  }

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


