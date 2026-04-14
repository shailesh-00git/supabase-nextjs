import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen w-full">
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 py-3 rounded-xl bg-zinc-300 backdrop-blur-md border shadow-lg shadow-zinc-400">
        Navbar
      </nav>

      <div className="min-h-screen grid place-content-center max-w-7xl bg-zinc-200 mx-auto">
        <form action="/auth/logout" method="POST">
          {JSON.stringify(user)}
          <Button className="p-5" type="submit">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
