-- Recreate view with SECURITY INVOKER
DROP VIEW IF EXISTS public.social_sync_status;
CREATE VIEW public.social_sync_status
  WITH (security_invoker = true)
  AS SELECT synced_at, platform, status, posts_fetched
     FROM public.social_sync_log
     ORDER BY synced_at DESC
     LIMIT 10;

-- Grant anon access to the view so public visitors can see last sync time
GRANT SELECT ON public.social_sync_status TO anon;
GRANT SELECT ON public.social_sync_status TO authenticated;