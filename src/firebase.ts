import { initializeApp, getApps } from 'firebase/app'
import type { FirebaseApp } from 'firebase/app'
import { getAuth, signInAnonymously, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, type User } from 'firebase/auth'
import { getFirestore, serverTimestamp, collection, addDoc, query, orderBy, onSnapshot, where, doc, setDoc, getDoc, deleteDoc, getDocs, updateDoc, type Firestore, limit } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { generateNfsUsername } from './utils/username'

export type FirebaseServices = {
  app: FirebaseApp
  auth: ReturnType<typeof getAuth>
  db: Firestore,
  storage: FirebaseStorage
}

export function initFirebase(): FirebaseServices | null {
  // Clean environment variables by removing any quotes or whitespace
  const cleanEnvVar = (value: string | undefined): string => {
    if (!value) return ''
    return value.replace(/^["']|["']$/g, '').trim()
  }

  const config = {
    apiKey: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    authDomain: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    projectId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
    appId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  } as const

  const hasConfig = Object.values(config).every((v) => typeof v === 'string' && v.length > 0)
  if (!hasConfig) {
    if (typeof window !== 'undefined') {
      // Only log in browser to avoid SSR issues
      console.warn('Firebase configuration is missing. Please check your environment variables.')
      console.log('Current config keys:', Object.keys(config))
      console.log('Make sure .env.local is in the project root (nfssite/.env.local) and contains NEXT_PUBLIC_FIREBASE_* variables')
    }
    return null
  }

  // Debug logging to help troubleshoot (only in browser)
  if (typeof window !== 'undefined') {
    console.log('Firebase config loaded successfully')
    console.log('Project ID:', config.projectId)
  }

  try {
    const app = getApps().length ? getApps()[0]! : initializeApp(config)
    const auth = getAuth(app)
    const db = getFirestore(app)
    const storage = getStorage(app)
    return { app, auth, db, storage }
  } catch (error) {
    console.error('Failed to initialize Firebase:', error)
    return null
  }
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
  createUserWithEmail: async (auth: ReturnType<typeof getAuth>, db: Firestore, email: string, password: string, firstName?: string, lastName?: string, studentId?: string) => {
    if (!studentId) {
      throw new Error('Student ID is required to create an account.')
    }

    const studentIdDoc = await getDoc(doc(db, 'allowedStudentIds', studentId))
    if (!studentIdDoc.exists()) {
      throw new Error('This student ID is not authorized to create an account.')
    }

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
      firstName: firstName || '',
      lastName: lastName || '',
      fullName: firstName && lastName ? `${firstName} ${lastName}` : '',
      studentId,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp()
    })
    
    return cred.user
  },
  deleteUserAccount: async (auth: ReturnType<typeof getAuth>, db: Firestore, userId: string) => {
    // Delete user document from Firestore
    const userDoc = doc(db, 'users', userId)
    await deleteDoc(userDoc)
    // Note: To fully delete the Firebase Auth account, you would need Admin SDK
    // This deletes their Firestore user data
    return true
  },
  getAllUsers: async (db: Firestore) => {
    // Get all users for admin management
    const usersRef = collection(db, 'users')
    const q = query(usersRef, orderBy('createdAt', 'desc'))
    // This returns a query that can be used with onSnapshot or getDocs
    return q
  },
  getUserData: async (db: Firestore, userId: string) => {
    const userDoc = await getDoc(doc(db, 'users', userId))
    return userDoc.exists() ? userDoc.data() : null
  },
  updateUserProfile: async (db: Firestore, userId: string, profileData: any) => {
    await setDoc(doc(db, 'users', userId), {
      ...profileData,
      lastUpdatedAt: serverTimestamp()
    }, { merge: true })
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
  deleteDoc,
  getDocs,
  limit,
  doc, // Add doc here
  updateDoc,
}
