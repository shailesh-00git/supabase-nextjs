import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { createClient } from "@/lib/supabase/server";
import { ArrowUpRightIcon, Folder } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // posts
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  // console.log(posts);

  return (
    <main className="min-h-screen w-full bg-zinc-800">
      <div className="max-w-5xl mx-auto px-8 py-6">
        {/* navbar */}
        <div className="flex  justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold text-emerald-400">My Blogs</h1>
          <div className="flex gap-2 items-center">
            <Link href={"/editor"}>
              <Button className="p-5 bg-emerald-400 text-black hover:bg-black hover:text-emerald-400 hover:border-emerald-400 transition-colors duration-150">
                New Post
              </Button>
            </Link>
            <form action="/auth/logout" method="POST">
              <Button
                className="p-5  border border-emerald-400 text-emerald-400 hover:text-red-500 hover:border-red-500 "
                type="submit"
              >
                Logout
              </Button>
            </form>
          </div>
        </div>

        {/* herosection */}
        {posts && posts.length > 0 ? (
          <div className="grid gap-4 text-zinc-300">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="p-6 bg-zinc-900 border-zinc-800 hover:border-emerald-600 transition-colors cursor-pointer">
                  <h2 className="text-2xl font-bold text-emerald-400 mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-zinc-400 mb-4">{post.excerpt}</p>
                  )}
                  <p className="text-sm text-zinc-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Empty className="border border-zinc-400 p-12">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Folder></Folder>
              </EmptyMedia>
              <EmptyTitle className={"text-2xl text-zinc-400"}>
                No Blogs Yet
              </EmptyTitle>
              <EmptyDescription>
                You haven&apos;t created any blogs yet. Get started by creating
                your first blog.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Link href={"/editor"}>
                <Button className="p-5 bg-emerald-400 text-black hover:bg-black hover:text-emerald-400 hover:border-emerald-400 transition-colors duration-150">
                  create blog
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </main>
  );
}
