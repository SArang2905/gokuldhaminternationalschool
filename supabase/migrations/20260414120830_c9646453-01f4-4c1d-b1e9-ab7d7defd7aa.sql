-- Drop the overly permissive policy on social_sync_log
DROP POLICY IF EXISTS "Sync log is publicly viewable" ON public.social_sync_log;

-- Create a restricted policy: only authenticated users can read the full sync log
CREATE POLICY "Authenticated users can view sync log"
  ON public.social_sync_log
  FOR SELECT
  TO authenticated
  USING (true);

-- Create a public view that exposes only non-sensitive sync info (no error_message)
CREATE OR REPLACE VIEW public.social_sync_status AS
  SELECT synced_at, platform, status, posts_fetched
  FROM public.social_sync_log
  ORDER BY synced_at DESC
  LIMIT 10;