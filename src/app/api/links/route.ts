import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getAuthCookie } from "@/lib/cookie";

export async function GET(request: NextRequest) {
  try {
    let sessionId = request.nextUrl.searchParams.get("sessionId") || "";

    // 1. Check if user is authenticated via cookie
    const token = await getAuthCookie();
    const supabase = getSupabase();

    if (token) {
      const { data: { user }, error: userError } = await supabase.auth.getUser(token);
      if (!userError && user) {
        sessionId = user.id; // Override query param with secure user ID
      }
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId query parameter or authentication is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("links")
      .select("id, code, original_url, clicks, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase select error:", error);
      return NextResponse.json(
        { error: "Failed to fetch links." },
        { status: 500 }
      );
    }

    return NextResponse.json({ links: data });
  } catch (err) {
    console.error("GET links API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    let sessionId = searchParams.get("sessionId") || "";

    if (!id) {
      return NextResponse.json(
        { error: "id is required." },
        { status: 400 }
      );
    }

    // 1. Check if user is authenticated via cookie
    const token = await getAuthCookie();
    const supabase = getSupabase();

    if (token) {
      const { data: { user }, error: userError } = await supabase.auth.getUser(token);
      if (!userError && user) {
        sessionId = user.id; // Override query param with secure user ID
      }
    }

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId or authentication is required." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("links")
      .delete()
      .eq("id", id)
      .eq("session_id", sessionId);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete link." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE link API error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
