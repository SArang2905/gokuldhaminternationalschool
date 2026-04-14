import { corsHeaders } from '@supabase/supabase-js/cors'
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const InquirySchema = z.object({
  parentName: z.string().min(1).max(200),
  mobile: z.string().regex(/^[0-9]{10}$/),
  studentName: z.string().min(1).max(200),
  grade: z.string().min(1).max(50),
  source: z.string().min(1).max(100),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const parsed = InquirySchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Invalid form data", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const GOOGLE_SCRIPT_URL = Deno.env.get("GOOGLE_APPS_SCRIPT_URL");
    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_APPS_SCRIPT_URL not configured");
      return new Response(
        JSON.stringify({ error: "Service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Google Script error [${response.status}]`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Submit inquiry error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to submit inquiry" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
