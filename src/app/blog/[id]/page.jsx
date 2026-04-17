import BlogContent from "@/components/blog-content"; // ✅ matches
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server"; // ✅ was "client"
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser(); // ✅ was getSession()

  if (!user) {
    redirect("/auth/login");
  }

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  const isOwner = user?.id === post?.user_id;

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="outline">Back</Button>
          </Link>
          {isOwner && (
            <Link href={`/editor?id=${post.id}`}>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Edit
              </Button>
            </Link>
          )}
        </div>

        <Card className="p-8 bg-zinc-900 border-zinc-800">
          <h1 className="text-4xl font-bold text-emerald-400 mb-4">
            {post.title}
          </h1>
          <p className="text-zinc-400 mb-8">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="prose prose-invert max-w-none text-zinc-300">
            <BlogContent content={post.content.content} />
          </div>
        </Card>
      </div>
    </main>
  );
}
