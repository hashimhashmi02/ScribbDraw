import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Star } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
                    <span className="text-lg font-bold text-white">S</span>
                </div>
                <span className="text-xl font-bold tracking-tight">ScribbDraw</span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
                <Link href="#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    Features
                </Link>
                <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    Community
                </Link>
                <Link href="https://github.com/hashimhashmi02" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    GitHub
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <Link href="https://github.com/hashimhashmi02/ScribbDraw" target="_blank">
                    <div className="hidden items-center rounded-full border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary md:flex">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>Star on GitHub</span>
                    </div>
                </Link>
                <Link href="/signin">
                    <Button variant="ghost" size="sm">
                        Sign In
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    );
}
