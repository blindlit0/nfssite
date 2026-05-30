# Quick Fixes for Common Errors

## Firestore Permission Error

**Error**: `Missing or insufficient permissions`

**Solution**: Update your Firestore security rules in Firebase Console:

1. Go to Firebase Console → Firestore Database → Rules
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - allow read for all authenticated users (needed for admin checks)
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Welfare posts - allow authenticated users to create and read
    match /welfarePosts/{postId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
      allow update, delete: if false;
    }
  }
}
```

3. Click **Publish** to save the rules

## Vercel Output Directory Error

**Error**: `"No Output Directory named 'dist' found"`

**Solution**: This happens when Vercel is configured for Vite instead of Next.js.

### Fix in Vercel Dashboard:

1. Go to your Vercel project dashboard
2. Click **Settings** → **General**
3. Scroll to **Build & Development Settings**
4. Set **Framework Preset** to **Next.js**
5. **Output Directory** should be **empty** (auto-detected)
6. **Build Command** should be `npm run build` or empty (auto-detected)
7. Click **Save**
8. **Redeploy** your project

### Alternative: Delete and Reconnect

1. Disconnect your Git repository from Vercel
2. Reconnect it
3. Vercel will auto-detect Next.js on reconnection

### Important Notes:

- **DO NOT** create a `vercel.json` file - Next.js doesn't need it
- If you have an old `vercel.json` file, **delete it**
- Next.js automatically outputs to `.next` directory
- Vercel handles this automatically when Framework Preset is set to Next.js

