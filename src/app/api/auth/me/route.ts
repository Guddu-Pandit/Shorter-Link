import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getAuthCookie, clearAuthCookie } from "@/lib/cookie";

export async function GET() {
  try {
    const token = await getAuthCookie();

    if (!token) {
      return NextResponse.json(
        { authenticated: false, error: "No session token found" },
        { status: 401 }
      );
    }

    const supabase = getSupabase();

    // Verify token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      console.warn("Invalid token or no user found:", error?.message);
      // Clean up invalid cookie
      await clearAuthCookie();
      return NextResponse.json(
        { authenticated: false, error: "Invalid session token" },
        { status: 401 }
      );
    }

    // Get metadata details
    const metadata = user.user_metadata || {};
    const tier = metadata.tier || "free";
    const name = metadata.name || "User";

    // Count user's shortened links
    const { count, error: countError } = await supabase
      .from("links")
      .select("*", { count: "exact", head: true })
      .eq("session_id", user.id);

    if (countError) {
      console.error("Error counting user links:", countError);
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name,
        tier,
      },
      linkCount: count || 0,
    });
  } catch (err) {
    console.error("Me route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
