import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getAuthCookie } from "@/lib/cookie";

export async function POST() {
  try {
    const token = await getAuthCookie();

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in first." },
        { status: 401 }
      );
    }

    const supabase = getSupabase();

    // Verify token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired session." },
        { status: 401 }
      );
    }

    // Update user metadata in auth.users
    const currentMeta = user.user_metadata || {};
    const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        user_metadata: {
          ...currentMeta,
          tier: "premium",
        },
      }
    );

    if (updateError) {
      console.error("Upgrade user error:", updateError);
      return NextResponse.json(
        { error: "Failed to upgrade subscription. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.user.id,
        email: updatedUser.user.email,
        name: updatedUser.user.user_metadata.name,
        tier: "premium",
      },
    });
  } catch (err) {
    console.error("Upgrade route error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
