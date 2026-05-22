import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, sessionId } = body as { url?: string; sessionId?: string };

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid URL is required." },
        { status: 400 },
      );
    }

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { error: "sessionId is required." },
        { status: 400 },
      );
    }

    // Validate URL format
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        throw new Error("Invalid protocol");
      }
    } catch {
      return NextResponse.json(
        { error: "Please provide a valid http/https URL." },
        { status: 400 },
      );
    }

    // Generate a unique short code
    const code = nanoid(6);

    const { data, error } = await getSupabase()
      .from("links")
      .insert({
        code,
        original_url: url,
        session_id: sessionId,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create short link." },
        { status: 500 },
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
      { status: 500 },
    );
  }
}
