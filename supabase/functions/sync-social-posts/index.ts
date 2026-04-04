import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };

const GRAPH_API_BASE = "https://graph.facebook.com/v19.0";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Get all active social accounts
    const { data: accounts, error: accountsError } = await supabase
      .from("social_accounts")
      .select("*")
      .eq("is_active", true);

    if (accountsError) throw accountsError;

    if (!accounts || accounts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active social accounts to sync" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results = [];

    for (const account of accounts) {
      try {
        let posts: any[] = [];

        if (account.platform === "instagram") {
          posts = await fetchInstagramPosts(account.access_token, account.account_id);
        } else if (account.platform === "facebook") {
          posts = await fetchFacebookPosts(account.access_token, account.account_id);
        }

        // Upsert posts
        for (const post of posts) {
          await supabase.from("social_posts").upsert(
            {
              account_id: account.id,
              platform: account.platform,
              platform_post_id: post.platform_post_id,
              media_type: post.media_type,
              media_url: post.media_url,
              thumbnail_url: post.thumbnail_url || null,
              caption: post.caption || null,
              likes_count: post.likes_count || 0,
              permalink: post.permalink || null,
              posted_at: post.posted_at,
            },
            { onConflict: "platform_post_id" }
          );
        }

        // Log success
        await supabase.from("social_sync_log").insert({
          platform: account.platform,
          status: "success",
          posts_fetched: posts.length,
        });

        results.push({
          account: account.account_name,
          platform: account.platform,
          posts_fetched: posts.length,
        });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        await supabase.from("social_sync_log").insert({
          platform: account.platform,
          status: "error",
          error_message: errorMsg,
        });
        results.push({
          account: account.account_name,
          platform: account.platform,
          error: errorMsg,
        });
      }
    }

    return new Response(JSON.stringify({ results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("Sync error:", errorMsg);
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function fetchInstagramPosts(accessToken: string, igUserId: string) {
  const url = `${GRAPH_API_BASE}/${igUserId}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink,like_count&limit=50&access_token=${accessToken}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Instagram API error [${res.status}]: ${await res.text()}`);
  }
  const data = await res.json();

  return (data.data || []).map((item: any) => ({
    platform_post_id: `ig_${item.id}`,
    media_type: item.media_type === "VIDEO" ? "video" : item.media_type === "CAROUSEL_ALBUM" ? "album" : "photo",
    media_url: item.media_url,
    thumbnail_url: item.thumbnail_url,
    caption: item.caption,
    likes_count: item.like_count || 0,
    permalink: item.permalink,
    posted_at: item.timestamp,
  }));
}

async function fetchFacebookPosts(accessToken: string, pageId: string) {
  const url = `${GRAPH_API_BASE}/${pageId}/posts?fields=id,message,created_time,permalink_url,full_picture,attachments{media_type,media,url}&limit=50&access_token=${accessToken}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Facebook API error [${res.status}]: ${await res.text()}`);
  }
  const data = await res.json();

  return (data.data || [])
    .filter((item: any) => item.full_picture || item.attachments)
    .map((item: any) => {
      const attachment = item.attachments?.data?.[0];
      const isVideo = attachment?.media_type === "video";
      return {
        platform_post_id: `fb_${item.id}`,
        media_type: isVideo ? "video" : "photo",
        media_url: isVideo ? attachment?.media?.source || item.full_picture : item.full_picture,
        thumbnail_url: item.full_picture,
        caption: item.message,
        likes_count: 0,
        permalink: item.permalink_url,
        posted_at: item.created_time,
      };
    });
}
