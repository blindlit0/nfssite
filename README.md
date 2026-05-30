## Department of Food Science & Nutrition Website

This is a Next.js + TypeScript + Tailwind CSS app for the Department of Food Science & Nutrition. It includes routing, a modern site layout, a Home page with welfare section and flipbox, and a Welfare page for confidential student concerns.

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
```

3. Run the dev server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
npm start
```

### App Structure

- `src/app/layout.tsx`: Root layout with AuthProvider
- `src/app/page.tsx`: Home page with hero, welfare section, and flipbox
- `src/app/welfare/page.tsx`: Welfare page (admin-only viewable posts)
- `src/app/login/page.tsx`: Login/Sign up page
- `src/app/profile/page.tsx`: User profile page
- `src/components/Layout.tsx`: Shared header/nav, social links, and footer
- `src/components/Flipbox.tsx`: Interactive flipbox with motivational quotes
- `src/contexts/AuthContext.tsx`: Authentication context
- `src/firebase.ts`: Firebase configuration and helpers

### Features

- **Modern Design**: Beautiful Tailwind CSS styling with gradient effects
- **Welfare Section**: Dedicated section on homepage about the Welfare Committee
- **Interactive Flipbox**: Flip card with random messages and infinite motivational quotes
- **Confidential Welfare System**: Students can submit concerns; only admin can view posts
- **User Authentication**: Login/signup with Firebase Authentication
- **User Profiles**: User profiles with editable information
- **Responsive Design**: Mobile-friendly navigation and layout

### Routing

- `/`: Home page with welfare section and flipbox
- `/welfare`: Welfare page for submitting concerns (admin-only view)
- `/login`: Login/Sign up page
- `/profile`: User profile page

### Environment Variables

All environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser. See `FIREBASE_SETUP.md` for detailed Firebase setup instructions.

### Admin Access

The site owner (admin) is determined by the `NEXT_PUBLIC_ADMIN_EMAIL` environment variable. Only users with this email can view welfare submissions.

### Adding Your Department Logo

1. Add your department logo image to the `public/` folder as `logo.png`
2. The image should be square (recommended: 40x40px or larger)
3. Supported formats: PNG, JPG, SVG, WebP
4. If the image doesn't load, the site will fall back to a gradient background with "NFS" text

See `VIEWING_WELFARE_POSTS.md` for information on viewing anonymous welfare submissions.
