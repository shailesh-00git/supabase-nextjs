import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/server";
import {
  PlusIcon,
  LogOutIcon,
  UserIcon,
  Settings2Icon,
  ChevronDownIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fallback for username: use display name metadata or the start of their email
  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const userInitials = userName.substring(0, 2).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            My Blogs
          </h1>
        </Link>

        <div className="flex gap-4 items-center">
          {/* Action Button */}
          <Link href="/editor" className="hidden sm:block">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 pl-2 pr-1 h-10 hover:bg-muted rounded-full"
              >
                <Avatar className="h-8 w-8 border border-emerald-500/20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm font-medium text-muted-foreground">
                  {userName}
                </span>
                <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="cursor-pointer w-full flex items-center"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="cursor-pointer w-full flex items-center"
                >
                  <Settings2Icon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout inside Dropdown */}
              <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <form
                  action="/auth/logout"
                  method="POST"
                  className="w-full flex items-center"
                >
                  <button type="submit" className="w-full flex items-center">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
