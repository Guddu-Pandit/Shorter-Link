import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  const supabase = getSupabase();

  // Look up the original URL for this short code
  const { data, error } = await supabase
    .from("links")
    .select("original_url, clicks")
    .eq("code", code)
    .single();

  if (error || !data) {
    // Short code not found – redirect to homepage
    redirect("/");
  }

  // Increment the click counter (fire-and-forget, don't block redirect)
  supabase
    .from("links")
    .update({ clicks: (data.clicks ?? 0) + 1 })
    .eq("code", code)
    .then(({ error: updateError }) => {
      if (updateError) {
        console.error("Failed to increment clicks:", updateError);
      }
    });

  redirect(data.original_url);
}
