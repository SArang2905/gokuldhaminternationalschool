
-- Create enum for social platforms
CREATE TYPE public.social_platform AS ENUM ('instagram', 'facebook');

-- Create enum for media types
CREATE TYPE public.social_media_type AS ENUM ('photo', 'video', 'album');

-- Table to store connected social accounts
CREATE TABLE public.social_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform social_platform NOT NULL,
  account_name TEXT,
  account_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table to cache social media posts
CREATE TABLE public.social_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID REFERENCES public.social_accounts(id) ON DELETE CASCADE NOT NULL,
  platform social_platform NOT NULL,
  platform_post_id TEXT NOT NULL UNIQUE,
  media_type social_media_type NOT NULL DEFAULT 'photo',
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  likes_count INTEGER DEFAULT 0,
  permalink TEXT,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Sync log table
CREATE TABLE public.social_sync_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform social_platform NOT NULL,
  status TEXT NOT NULL DEFAULT 'success',
  posts_fetched INTEGER DEFAULT 0,
  error_message TEXT,
  synced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Settings table for admin config
CREATE TABLE public.social_feed_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  max_posts_displayed INTEGER NOT NULL DEFAULT 12,
  sync_interval_minutes INTEGER NOT NULL DEFAULT 30,
  is_feed_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_sync_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_feed_settings ENABLE ROW LEVEL SECURITY;

-- Posts are publicly readable (displayed on the website)
CREATE POLICY "Social posts are publicly viewable" ON public.social_posts
  FOR SELECT USING (is_visible = true);

-- Sync log is publicly readable
CREATE POLICY "Sync log is publicly viewable" ON public.social_sync_log
  FOR SELECT USING (true);

-- Settings publicly readable
CREATE POLICY "Feed settings are publicly viewable" ON public.social_feed_settings
  FOR SELECT USING (true);

-- Accounts are not publicly visible (tokens are sensitive)
-- Only service role can manage accounts

-- Insert default settings
INSERT INTO public.social_feed_settings (max_posts_displayed, sync_interval_minutes, is_feed_enabled)
VALUES (12, 30, true);

-- Create indexes
CREATE INDEX idx_social_posts_platform ON public.social_posts(platform);
CREATE INDEX idx_social_posts_posted_at ON public.social_posts(posted_at DESC);
CREATE INDEX idx_social_posts_media_type ON public.social_posts(media_type);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_social_accounts_updated_at
  BEFORE UPDATE ON public.social_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_posts_updated_at
  BEFORE UPDATE ON public.social_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_feed_settings_updated_at
  BEFORE UPDATE ON public.social_feed_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
