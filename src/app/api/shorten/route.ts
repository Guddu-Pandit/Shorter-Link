import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getSupabase } from "@/lib/supabase";
import { getAuthCookie } from "@/lib/cookie";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, sessionId: bodySessionId } = body as { url?: string; sessionId?: string };

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid URL is required." },
        { status: 400 }
      );
    }

    // 1. Check if user is authenticated via cookie
    const token = await getAuthCookie();
    let finalSessionId = bodySessionId || "";
    let isUser = false;
    let userTier = "free";

    const supabase = getSupabase();

    if (token) {
      const { data: { user }, error: userError } = await supabase.auth.getUser(token);
      if (!userError && user) {
        finalSessionId = user.id;
        isUser = true;
        userTier = user.user_metadata?.tier || "free";
      }
    }

    if (!finalSessionId) {
      return NextResponse.json(
        { error: "Session or authentication is required." },
        { status: 400 }
      );
    }

    // 2. Validate URL format
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error("Invalid protocol");
      }
    } catch {
      return NextResponse.json(
        { error: "Please provide a valid http/https URL." },
        { status: 400 }
      );
    }

    // 3. Enforce 3-link limit for free tier logged-in users
    if (isUser && userTier === "free") {
      const { count, error: countError } = await supabase
        .from("links")
        .select("*", { count: "exact", head: true })
        .eq("session_id", finalSessionId);

      if (countError) {
        console.error("Count links error:", countError);
      } else if (count !== null && count >= 3) {
        return NextResponse.json(
          {
            error: "Free tier limit reached. You can only shorten up to 3 links on the free tier. Please upgrade to premium for unlimited links!",
            limitReached: true
          },
          { status: 403 }
        );
      }
    }

    // 4. Generate a unique short code
    const code = nanoid(6);

    const { data, error } = await supabase
      .from("links")
      .insert({
        code,
        original_url: url,
        session_id: finalSessionId,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create short link." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: data.id,
      code: data.code,
      original_url: data.original_url,
      clicks: data.clicks,
      created_at: data.created_at,
    });
  } catch (err) {
    console.error("Shorten API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
