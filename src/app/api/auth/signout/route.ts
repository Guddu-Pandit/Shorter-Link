import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/lib/cookie";

export async function POST() {
  try {
    await clearAuthCookie();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Signout error:", err);
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}
