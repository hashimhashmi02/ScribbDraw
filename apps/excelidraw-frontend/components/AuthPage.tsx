"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const title = isSignin ? "Sign In" : "Sign Up";
  const actionText = isSignin ? "Sign In" : "Create Account";
  const toggleText = isSignin
    ? "Don’t have an account? Sign Up"
    : "Already have an account? Sign In";
  const toggleHref = isSignin ? "/signup" : "/signin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    router.push("/canvas/7");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020024] p-4">
      <div className="w-full max-w-sm bg-black/70 backdrop-blur-sm rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          {title}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 rounded-lg border border-white/40 bg-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#407092] placeholder-white/60"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 rounded-lg border border-white/40 bg-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#407092] placeholder-white/60"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#407092] to-[#74B3CE] text-white text-sm font-medium rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            {actionText}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-white/70">
          <Link href={toggleHref} className="underline">
            {toggleText}
          </Link>
        </p>
      </div>
    </div>
  );
}
