"use client";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const supabase = createClient();
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      }
      if (!error) {
        router.push("/");
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }
  function handleGoogleLogin() {}
  return (
    <main className="min-h-screen flex justify-center items-center bg-zinc-700">
      <Card className={`w-md bg-zinc-800 border border-zinc-950 p-8`}>
        <h1 className="text-center text-3xl font-bold text-emerald-300 py-2">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="w-full mb-3  rounded-sm p-2 outline-0 bg-zinc-600 focus:border focus:outline-0 text-white text-lg font-light"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full mb-3  rounded-sm p-2 outline-0 bg-zinc-600 focus:border focus:outline-0 text-white text-lg font-light"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-2 mt-5 hover:bg-emerald-600 duration-150 transition-all bg-emerald-400 text-lg rounded-2xl">
            {isLoading ? "processing...." : "login"}
          </button>
        </form>
        <div className="relative flex items-center ">
          <div className="flex-1 border-t border-gray-600"></div>

          <span className="px-1 text-sm text-gray-400">or</span>

          <div className="flex-1 border-t border-gray-600"></div>
        </div>
        <div className="text-center">
          <div>
            <span className="text-lg text-zinc-300">
              Don&apos;t have account?
            </span>
            <span className="text-lg ml-2 text-emerald-400
            ">
              <Link href={"/auth/signup"}>Sign up</Link>
            </span>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default LoginPage;
