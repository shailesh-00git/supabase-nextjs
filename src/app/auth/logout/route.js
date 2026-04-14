// src/app/auth/logout/route.js
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function POST() {
  // ✅ Named POST export
  try {
    const supabase = await createClient(); // ✅ Called INSIDE the handler, not at module level

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Failed to logout:", error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Failed to logout:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }

  redirect("/auth/login"); // ✅ Redirect after successful logout
}
