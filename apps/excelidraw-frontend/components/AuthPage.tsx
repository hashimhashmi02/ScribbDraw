"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Github, Chromecast, Lock, Mail, User } from "lucide-react";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const title = "Welcome to ScribbDraw";
  const subtext = "Start collaborating on the infinite canvas.";

  const actionText = isSignin ? "Sign In" : "Create Account";

  const toggleText = isSignin
    ? "Don't have an account?"
    : "Already have an account?";
  const toggleLinkText = isSignin ? "Sign Up" : "Sign In";
  const toggleHref = isSignin ? "/signup" : "/signin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/canvas/7");
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Column - Form */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-12 xl:px-24 bg-white dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-sm">

          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <Link href="/" className="mb-6 inline-flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                <span className="text-lg font-bold">S</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{subtext}</p>
          </div>

          {/* Social Auth */}
          <div className="grid gap-4">
            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800" size="lg">
              <Github className="mr-2 h-4 w-4" />
              {isSignin ? "Sign in" : "Sign up"} with GitHub
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {isSignin ? "Sign in" : "Sign up"} with Google
            </Button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 dark:bg-zinc-950">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isSignin && (
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="fullname"
                    className="pl-9 focus-visible:ring-purple-500"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-9 focus-visible:ring-purple-500"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9 focus-visible:ring-purple-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
              size="lg"
            >
              {actionText}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            {toggleText}{" "}
            <Link href={toggleHref} className="font-semibold text-purple-600 hover:text-purple-500 hover:underline">
              {toggleLinkText}
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Visual */}
      <div className="hidden w-1/2 bg-gray-50 lg:block dark:bg-zinc-900 relative overflow-hidden">
        {/* Dot Pattern Background */}
        <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)]"></div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center p-12">

          {/* Logo */}
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">ScribbDraw</span>
          </div>

          {/* Visual Centerpiece */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative aspect-square w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl p-8 dark:border-slate-800 dark:bg-zinc-950"
          >
            {/* Mock Diagram */}
            <svg className="h-full w-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Rectangle */}
              <motion.rect
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                x="50" y="50" width="120" height="80" rx="4" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="10 5" fill="rgba(139, 92, 246, 0.05)"
              />
              <text x="110" y="95" textAnchor="middle" fill="#64748b" fontFamily="cursive" fontSize="14">Idea</text>

              {/* Circle */}
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                cx="300" cy="250" r="60" stroke="#ec4899" strokeWidth="3" fill="rgba(236, 72, 153, 0.05)"
              />
              <text x="300" y="255" textAnchor="middle" fill="#64748b" fontFamily="cursive" fontSize="14">Product</text>

              {/* Arrow */}
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.2, ease: "easeInOut" }}
                d="M 170 90 Q 250 90 280 190" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"
              />
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
              </defs>

              {/* Post-it Note */}
              <motion.g
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <rect x="60" y="280" width="100" height="100" fill="#fef3c7" rx="2" transform="rotate(-5 110 330)" />
                <text x="75" y="320" fill="#92400e" fontFamily="cursive" fontSize="12" transform="rotate(-5 110 330)">Fast!</text>
              </motion.g>
            </svg>
          </motion.div>



        </div>
      </div>
    </div>
  );
}
