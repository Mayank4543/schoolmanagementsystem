-- Development Helper: Create RPC function to confirm emails
-- WARNING: This is for DEVELOPMENT ONLY. Do NOT use in production.

CREATE OR REPLACE FUNCTION confirm_email_development(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE auth.users 
  SET email_confirmed_at = NOW()
  WHERE email = user_email;
END;
$$ LANGUAGE plpgsql;

-- Alternative: Manually confirm a user in Supabase dashboard
-- Go to Authentication > Users > Click on the user > Edit user
-- Set email_confirmed_at to current timestamp and click "Save"
