# Viewing Anonymous Welfare Posts

## Yes, You Need Firestore!

To view anonymous welfare postings, you need:

1. **Firestore Database configured** - Students' submissions are stored in Firestore
2. **Admin email set** - Your email must match `NEXT_PUBLIC_ADMIN_EMAIL` in your `.env.local`

## How It Works

### For Students (Non-Admin):
- Students can submit welfare concerns anonymously or with their username
- Students CANNOT see any posts - even their own
- All submissions are stored in Firestore under the `welfarePosts` collection

### For Admin (Site Owner):
- Admin can see ALL posts (anonymous and non-anonymous)
- Admin can filter by category (Financial, Emotional, Academic, Personal)
- Admin can see post counts for each category

## Setup Steps

1. **Configure Firestore**:
   - Go to your Firebase Console
   - Navigate to Firestore Database
   - Create the database if you haven't already
   - The posts will automatically be stored in the `welfarePosts` collection

2. **Set Your Admin Email**:
   - In your `.env.local` file, set:
   ```
   NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
   ```
   - Use the EXACT email you use to log in

3. **Log In**:
   - Log in to the site with your admin email
   - Navigate to `/welfare` page
   - You should now see all submitted posts

## Viewing Posts

Once configured as admin:
1. Log in with your admin email
2. Go to the `/welfare` page
3. You'll see a filter section at the top (only visible to admins)
4. You'll see all posts below in a grid layout

## Firestore Collection Structure

Posts are stored with this structure:
```javascript
{
  userId: string,           // Firebase user ID
  username: string,         // NFSS username or "Anonymous"
  category: string,         // "financial" | "emotional" | "academical" | "personal"
  text: string,             // The actual message
  anonymous: boolean,       // Whether posted anonymously
  createdAt: Timestamp     // When it was posted
}
```

## Troubleshooting

**Can't see posts?**
- Make sure you're logged in with the email set in `NEXT_PUBLIC_ADMIN_EMAIL`
- Check that Firestore is enabled in Firebase Console
- Check browser console for any errors
- Verify the email matches exactly (case-sensitive)

**Posts not saving?**
- Check Firebase Console → Firestore → Rules
- Make sure rules allow writes (for development, use test mode)
- Check browser console for errors

## Security Note

For production, update your Firestore security rules to:
- Allow anyone authenticated to CREATE posts
- Only allow admins (via server-side check) to READ posts

The current implementation uses client-side checks, which is fine for development but should be enhanced for production.

