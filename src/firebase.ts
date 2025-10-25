import { initializeApp, getApps } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, type User } from 'firebase/auth'
import { getFirestore, serverTimestamp, collection, addDoc, query, orderBy, onSnapshot, where, doc, setDoc, getDoc, type Firestore } from 'firebase/firestore'
import { generateNfsUsername } from './utils/username'

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
  signInWithEmail: async (auth: ReturnType<typeof getAuth>, email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password)
    return cred.user
  },
  createUserWithEmail: async (auth: ReturnType<typeof getAuth>, db: Firestore, email: string, password: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    const nfsUsername = generateNfsUsername()
    
    // Update the user's display name with the NFS username
    await updateProfile(cred.user, {
      displayName: nfsUsername
    })
    
    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', cred.user.uid), {
      email: cred.user.email,
      nfsUsername: nfsUsername,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    })
    
    return cred.user
  },
  getUserData: async (db: Firestore, userId: string) => {
    const userDoc = await getDoc(doc(db, 'users', userId))
    return userDoc.exists() ? userDoc.data() : null
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


