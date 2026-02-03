"use client";

import Background from "@/components/landing/Background";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col font-sans">
      <Background />
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}