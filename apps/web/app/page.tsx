import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <Hero />
      <Features />

      <footer className="border-t border-white/10 bg-black py-8 text-center text-sm text-white/40">
        <p>© {new Date().getFullYear()} ScribDraw. All rights reserved.</p>
      </footer>
    </main>
  );
}