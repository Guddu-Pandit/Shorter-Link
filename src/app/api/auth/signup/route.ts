import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { setAuthCookie } from "@/lib/cookie";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    // 1. Create the user with email confirmed using the admin API
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, tier: "free" },
    });

    if (createError) {
      console.error("Signup error:", createError);
      return NextResponse.json(
        { error: createError.message },
        { status: 400 }
      );
    }

    // 2. Authenticate the newly created user to get the access token
    const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError || !sessionData.session) {
      console.error("Sign in after signup failed:", signInError);
      return NextResponse.json(
        { error: "Account created but sign in failed. Please try logging in manually." },
        { status: 500 }
      );
    }

    // 3. Store the access token in our HTTP-Only secure cookie
    await setAuthCookie(sessionData.session.access_token);

    return NextResponse.json({
      success: true,
      user: {
        id: userData.user.id,
        email: userData.user.email,
        name: name,
        tier: "free",
      },
    });
  } catch (err) {
    console.error("Signup route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
