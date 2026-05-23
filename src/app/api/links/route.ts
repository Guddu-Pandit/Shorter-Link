import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "sessionId query parameter is required." },
      { status: 400 },
    );
  }

  const { data, error } = await getSupabase()
    .from("links")
    .select("id, code, original_url, clicks, created_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase select error:", error);
    return NextResponse.json(
      { error: "Failed to fetch links." },
      { status: 500 },
    );
  }

  return NextResponse.json({ links: data });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const sessionId = searchParams.get("sessionId");

  if (!id || !sessionId) {
    return NextResponse.json(
      { error: "id and sessionId are required." },
      { status: 400 },
    );
  }

  const { error } = await getSupabase()
    .from("links")
    .delete()
    .eq("id", id)
    .eq("session_id", sessionId);

  if (error) {
    console.error("Supabase delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete link." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
