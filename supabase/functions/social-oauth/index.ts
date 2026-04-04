import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type" };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { action, code, redirect_uri, platform } = await req.json();
    const META_APP_ID = Deno.env.get("META_APP_ID");
    const META_APP_SECRET = Deno.env.get("META_APP_SECRET");

    if (!META_APP_ID || !META_APP_SECRET) {
      return new Response(
        JSON.stringify({ error: "Meta API credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Step 1: Return OAuth URL for the user to authorize
    if (action === "get_auth_url") {
      const scopes =
        platform === "instagram"
          ? "instagram_basic,instagram_manage_insights,pages_show_list"
          : "pages_read_engagement,pages_show_list";

      const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${scopes}&response_type=code`;

      return new Response(JSON.stringify({ auth_url: authUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Step 2: Exchange code for access token
    if (action === "exchange_code") {
      if (!code || !redirect_uri) {
        return new Response(
          JSON.stringify({ error: "Missing code or redirect_uri" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Exchange short-lived token
      const tokenRes = await fetch(
        `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&redirect_uri=${encodeURIComponent(redirect_uri)}&code=${code}`
      );
      const tokenData = await tokenRes.json();

      if (tokenData.error) {
        return new Response(JSON.stringify({ error: tokenData.error.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Exchange for long-lived token (60 days)
      const longTokenRes = await fetch(
        `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&fb_exchange_token=${tokenData.access_token}`
      );
      const longTokenData = await longTokenRes.json();
      const longLivedToken = longTokenData.access_token || tokenData.access_token;

      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      if (platform === "instagram") {
        // Get Instagram Business Account ID
        const pagesRes = await fetch(
          `https://graph.facebook.com/v19.0/me/accounts?access_token=${longLivedToken}`
        );
        const pagesData = await pagesRes.json();
        const page = pagesData.data?.[0];

        if (!page) {
          return new Response(
            JSON.stringify({ error: "No Facebook Page found. Instagram Business accounts require a connected Facebook Page." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const igRes = await fetch(
          `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${longLivedToken}`
        );
        const igData = await igRes.json();
        const igAccountId = igData.instagram_business_account?.id;

        if (!igAccountId) {
          return new Response(
            JSON.stringify({ error: "No Instagram Business account linked to this Page." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

        await supabase.from("social_accounts").upsert(
          {
            platform: "instagram",
            account_id: igAccountId,
            account_name: page.name + " (Instagram)",
            access_token: longLivedToken,
            token_expires_at: expiresAt,
            is_active: true,
          },
          { onConflict: "platform,account_id", ignoreDuplicates: false }
        );

        return new Response(
          JSON.stringify({ success: true, platform: "instagram", account: page.name }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (platform === "facebook") {
        // Get Page token for the Facebook Page
        const pagesRes = await fetch(
          `https://graph.facebook.com/v19.0/me/accounts?access_token=${longLivedToken}`
        );
        const pagesData = await pagesRes.json();
        const page = pagesData.data?.[0];

        if (!page) {
          return new Response(
            JSON.stringify({ error: "No Facebook Page found." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();

        await supabase.from("social_accounts").upsert(
          {
            platform: "facebook",
            account_id: page.id,
            account_name: page.name,
            access_token: page.access_token,
            token_expires_at: expiresAt,
            is_active: true,
          },
          { onConflict: "platform,account_id", ignoreDuplicates: false }
        );

        return new Response(
          JSON.stringify({ success: true, platform: "facebook", account: page.name }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Invalid platform" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("OAuth error:", errorMsg);
    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
