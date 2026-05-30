# NFS Site - Firebase Setup Guide

## Firebase Configuration

To enable authentication and user management features, you need to configure Firebase for your project.

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "nfs-site")
4. Follow the setup wizard

### Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Also enable "Anonymous" authentication (for welfare submissions)

### Step 3: Get Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click "Add app" and select the web icon `</>`
5. Register your app with a nickname (e.g., "nfs-site-web")
6. Copy the Firebase configuration object

### Step 4: Create Environment File

Create a `.env.local` file in your project root (`nfssite/.env.local`) with the following content:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
```

Replace the placeholder values with your actual Firebase configuration values.

**Note**: All environment variables in Next.js that need to be accessible in the browser must be prefixed with `NEXT_PUBLIC_`.

### Step 5: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database

### Step 6: Set Firestore Security Rules

**IMPORTANT**: Update your Firestore security rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    // Allow authenticated users to read any user document for admin checks
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Welfare posts: anyone authenticated can create posts
    // Anyone authenticated can read (admin filtering happens in app code)
    match /welfarePosts/{postId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
      allow update, delete: if false; // Posts are immutable
    }
  }
}
```

**Why these rules**:
- Users need to read other user documents to check admin status (email comparison)
- Anonymous authentication is used, so all authenticated users (including anonymous) can read/write appropriately
- Admin filtering is done client-side via email check

**Security Note**: 
- For production, consider implementing server-side admin checks using Firebase Admin SDK
- Client-side admin checks are acceptable for this use case but less secure than server-side validation

### Step 7: Restart Development Server

After creating the `.env.local` file, restart your development server:

```bash
npm run dev
```

## Features

Once Firebase is configured, you'll have access to:

- **User Registration**: Users can create accounts with email/password
- **NFS Username Generation**: Each user gets a unique NFS username (e.g., NFS1234)
- **User Authentication**: Secure login/logout functionality
- **User Data Storage**: User information stored in Firestore
- **Session Management**: Persistent login sessions
- **Welfare Submissions**: Anonymous or identified submissions to welfare committee
- **Admin View**: Site owner can view all welfare submissions

## Admin Configuration

Set the `NEXT_PUBLIC_ADMIN_EMAIL` environment variable to the email address of the site owner/admin. This email will have access to view welfare submissions.

## Troubleshooting

### Common Issues

1. **"Firebase configuration missing" error**
   - Make sure your `.env.local` file exists in the `nfssite/` directory
   - Verify all environment variables are prefixed with `NEXT_PUBLIC_`
   - Verify all environment variables are set correctly
   - Restart your development server after creating the `.env.local` file

2. **"auth/network-request-failed" error**
   - Check your internet connection
   - Verify Firebase project is active
   - Ensure API keys are correct

3. **"auth/invalid-api-key" error**
   - Double-check your API key in the `.env.local` file
   - Make sure there are no extra spaces or quotes around the values
   - Ensure the variable name is `NEXT_PUBLIC_FIREBASE_API_KEY` (not `VITE_FIREBASE_API_KEY`)

4. **Environment variables not working**
   - Remember: Next.js requires `NEXT_PUBLIC_` prefix for client-side variables
   - Restart the dev server after changing `.env.local`
   - Clear `.next` cache if needed: `rm -rf .next`

### Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file should already be in `.gitignore`
- For production, use Firebase's security rules to protect your data
- Consider implementing server-side admin checks for welfare posts
- Use Firebase Admin SDK for sensitive operations

## Support

If you encounter any issues, check the Firebase documentation or contact the development team.
