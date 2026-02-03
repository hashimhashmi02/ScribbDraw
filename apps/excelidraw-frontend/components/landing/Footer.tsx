import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full border-t border-border/50 bg-background/50 backdrop-blur-xl py-8">
            <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-2">
                    <span className="font-semibold tracking-tight">ScribbDraw</span>
                    <span className="text-sm text-muted-foreground">© {new Date().getFullYear()}</span>
                </div>

                <div className="flex gap-6">
                    <Link href="https://github.com/hashimhashmi02" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="h-4 w-4" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
