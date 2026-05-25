import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { setAuthCookie } from "@/lib/cookie";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // Authenticate user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      console.error("Login error:", error);
      return NextResponse.json(
        { error: error?.message || "Invalid login credentials." },
        { status: 401 }
      );
    }

    // Store the access token in HTTP-Only cookie
    await setAuthCookie(data.session.access_token);

    const userMetadata = data.user.user_metadata || {};
    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: userMetadata.name || "User",
        tier: userMetadata.tier || "free",
      },
    });
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
