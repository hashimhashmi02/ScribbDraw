"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Pencil, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-20">

            <div className="z-10 flex flex-col items-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <h1 className="max-w-5xl text-5xl font-black tracking-tight text-foreground md:text-7xl lg:text-8xl">
                        Collaborate on an <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">infinite canvas.</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                        The open-source virtual whiteboard for sketching hand-drawn like diagrams.
                        Real-time, encryption-ready, and infinite.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link href="/signup">
                            <Button size="lg" className="h-12 min-w-[180px] bg-gradient-to-r from-purple-600 to-pink-600 text-lg text-white hover:opacity-90 transition-opacity">
                                <Pencil className="mr-2 h-5 w-5" />
                                Start Drawing
                            </Button>
                        </Link>
                        <Link href="https://github.com/hashimhashmi02/ScribbDraw" target="_blank">
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 min-w-[180px] text-lg hover:bg-secondary/50"
                            >
                                <Github className="mr-2 h-5 w-5" />
                                View Source
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Visual Anchor - Floating Mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateX: 20, y: 40 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 10, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mt-16 relative w-full max-w-4xl perspective-1000"
                >
                    <div className="relative aspect-[16/9] w-full rounded-xl border border-border/50 bg-background/50 shadow-2xl backdrop-blur-sm transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out">
                        {/* Mockup Content */}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            {/* Abstract shapes representing a diagram */}
                            <div className="relative w-full h-full border-2 border-dashed border-border/30 rounded-lg flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: [0, 5, -5, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    className="absolute left-1/4 top-1/3 w-24 h-24 border-4 border-purple-500 rounded-md bg-purple-500/10"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="absolute right-1/4 bottom-1/3 w-24 h-24 border-4 border-pink-500 rotate-45 bg-pink-500/10"
                                />
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <motion.path
                                        d="M 300 150 Q 400 100 500 250"
                                        fill="transparent"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeDasharray="10 5"
                                        className="text-muted-foreground"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2, delay: 1 }}
                                    />
                                </svg>
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
