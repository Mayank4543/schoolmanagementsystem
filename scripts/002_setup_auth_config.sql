-- This script helps with email confirmation settings
-- For DEVELOPMENT: You can manually confirm emails in Supabase dashboard
-- For PRODUCTION: Set up email templates in Supabase Auth settings

-- View current unconfirmed users:
-- SELECT id, email, email_confirmed_at FROM auth.users WHERE email_confirmed_at IS NULL;

-- Manually confirm a user (for development only):
-- UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'user@email.com';
