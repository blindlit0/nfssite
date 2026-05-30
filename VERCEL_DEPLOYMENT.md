# Vercel Deployment for Next.js

## Important: Next.js Auto-Configuration

Next.js projects on Vercel are **automatically configured**. You do NOT need a `vercel.json` file.

- Next.js output directory: `.next` (automatically handled)
- Build command: `npm run build` (automatically detected)
- Framework: Next.js (automatically detected)

## Important: No vercel.json Needed

**DO NOT create a `vercel.json` file!** Next.js projects are automatically configured on Vercel.

If you have an old `vercel.json` from Vite, **delete it immediately**.

## Fixing Vercel Output Directory Error

If you see this error: `"No Output Directory named 'dist' found"`

**Solution 1: Remove vercel.json (if it exists)**
- Delete any `vercel.json` file in your project root
- The file should NOT exist for Next.js projects

**Solution 2: Check Vercel Project Settings**
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **General**
3. Scroll down to **Build & Development Settings**
4. Make sure **Framework Preset** is set to **Next.js**
5. Make sure **Output Directory** is **empty** or **".next"** (it should auto-detect)
6. Make sure **Build Command** is **"npm run build"** or empty (auto-detected)
7. Click **Save**

**Solution 3: Reconnect Repository**
- If settings don't help, disconnect and reconnect your Git repository
- Vercel will auto-detect Next.js on reconnection

## Environment Variables on Vercel

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all your Firebase environment variables:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_ADMIN_EMAIL`

4. **Important**: After adding environment variables, you must redeploy

## Deployment Steps

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Vercel will automatically:
   - Detect Next.js framework
   - Run `npm run build`
   - Deploy from `.next` directory
4. Add environment variables in Vercel dashboard
5. Redeploy to apply environment variables

## Troubleshooting

**Error: "No Output Directory named 'dist' found"**
- Delete `vercel.json` file if it exists
- Vercel will automatically use `.next` for Next.js

**Build fails with ESLint errors**
- Make sure `.eslintrc.json` exists and uses `"extends": "next/core-web-vitals"`
- The old `eslint.config.js` from Vite should be deleted

**Firebase errors in production**
- Verify all `NEXT_PUBLIC_*` environment variables are set in Vercel
- Check that Firestore security rules allow your operations
- Redeploy after adding environment variables

