import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { createClient } from "@/lib/supabase/server";
import {
  PlusIcon,
  LogOutIcon,
  FolderOpen,
  CalendarIcon,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  // Get display name — fallback to email prefix
  const username =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "Guest";

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur ">
        <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
          <h1 className="text-2xl font-bold ">My Blogs</h1>

          <div className="flex gap-2 items-center">
            {user ? (
              // ✅ Logged-in navbar
              <>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  👤 {username}
                </span>
                <div className="w-px h-5 bg-border mx-1" />
                <div className="w-px h-5 bg-border mx-1" />
                <Link href="/editor">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </Link>
                <form action="/auth/logout" method="POST">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all"
                    type="submit"
                  >
                    <LogOutIcon className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              // ✅ Guest navbar — only theme toggle + login
              <>
                {/* <ThemeToggle /> */}
                <span className="text-md text-muted-foreground hidden sm:block">
                  Guest
                </span>
                <div className="w-px h-5 bg-border mx-1" />
                <Link href="/auth/login">
                  <Button size="sm" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {posts && posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="group overflow-hidden border-muted bg-card hover:border-emerald-500/50 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl md:text-2xl font-semibold group-hover:text-emerald-500 transition-colors">
                        {post.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {post.excerpt && (
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center text-xs font-medium text-muted-foreground">
                      <CalendarIcon className="w-3 h-3 mr-1.5" />
                      {new Date(post.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20">
            <Empty className="border-2 border-dashed border-muted bg-muted/30 rounded-xl p-12">
              <EmptyHeader>
                <EmptyMedia className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500">
                    <FolderOpen className="w-10 h-10" />
                  </div>
                </EmptyMedia>
                <EmptyTitle className="text-2xl font-bold">
                  No Stories Found
                </EmptyTitle>
                <EmptyDescription className="max-w-xs mx-auto text-muted-foreground">
                  Your digital garden is empty. Start planting your thoughts and
                  share them with the world.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="mt-8">
                <Link href="/editor">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg rounded-full">
                    Write Your First Post
                  </Button>
                </Link>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </div>
    </main>
  );
}
