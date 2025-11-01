# School Management System - Setup Instructions

## Step 1: Initialize the Database

Before running the app, you need to set up the database schema in Supabase.

### How to Run the Database Script:

1. Open your **Supabase Dashboard** (https://app.supabase.com)
2. Navigate to your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy the entire content from `scripts/004_init_full_database.sql` in this project
6. Paste it into the SQL editor
7. Click **Run** button (or press Cmd+Enter / Ctrl+Enter)
8. Wait for the query to complete successfully

You should see a message indicating all tables and functions have been created.

## Step 2: Start the Development Server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Visit http://localhost:3000

## Step 3: Test the App

### Create Test Accounts:

1. **Student Account:**
   - Email: `student@example.com`
   - Password: `Test@1234`
   - Role: Student

2. **Teacher Account:**
   - Email: `teacher@example.com`
   - Password: `Test@1234`
   - Role: Teacher

### Verify Email:

After signup, you'll be redirected to the email verification page. Click "Confirm Email (Development)" to skip email verification during development.

## Troubleshooting

### Error: "Could not find the table 'public.profiles'"
**Solution:** Run the database script from `scripts/004_init_full_database.sql` in your Supabase SQL Editor.

### Error: "Email confirmation function not found"
**Solution:** Ensure the entire script was executed, including the RPC function at the end. Re-run the script if needed.

### Can't log in after verification
**Solution:** 
1. Check that your email is exactly as you signed up
2. Try resending the confirmation email
3. Verify the database tables exist in Supabase Dashboard > Tables

## Features Available

Once set up, you can:
- Register as Student or Teacher
- View your dashboard (role-specific)
- Track attendance (Students)
- Mark attendance (Teachers)
- View schedules
- Manage exams
- Track marks
- Receive notifications

## Production Deployment

Before deploying to production:
1. Update Supabase email settings to send real confirmation emails
2. Update email templates in Supabase Authentication settings
3. Set `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` to your production domain
4. Remove development-only features like "Confirm Email (Development)" button
5. Enable RLS policies for all environments

Enjoy your school management system!
