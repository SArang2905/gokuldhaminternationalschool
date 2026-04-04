
-- Only service_role can manage social accounts (prevents the RLS warning)
CREATE POLICY "Only service role can manage social accounts" ON public.social_accounts
  FOR ALL USING (false);
