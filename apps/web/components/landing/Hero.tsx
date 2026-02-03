"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Scene from "./Scene";
import { ArrowRight, Pencil, Sparkles } from "lucide-react";

export default function Hero() {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");

    const handleJoin = () => {
        if (roomId.trim()) {
            router.push(`/room/${roomId}`);
        }
    };

    const handleCreate = () => {
        const newRoomId = Math.random().toString(36).substring(7);
        router.push(`/room/${newRoomId}`);
    };

    return (
        <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
            <Scene />

            <div className="z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <div className="mb-4 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md">
                        <Sparkles className="h-4 w-4 text-yellow-400" />
                        <span className="text-white">Next-gen collaborative whiteboard</span>
                    </div>

                    <h1 className="max-w-4xl text-6xl font-black tracking-tight text-white md:text-8xl">
                        Create. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Collaborate.</span> <br />
                        Innovate.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-white/70">
                        A powerful, open-source Excalidraw alternative built for teams.
                        Sketch, diagram, and brainstorm together in real-time with 3D-powered aesthetics.
                    </p>

                    <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row">
                        <div className="flex flex-1 items-center gap-2 rounded-lg bg-white/10 p-1 backdrop-blur-md border border-white/10">
                            <input
                                type="text"
                                placeholder="Enter Room ID..."
                                className="flex-1 bg-transparent px-4 py-2 text-white placeholder:text-white/50 focus:outline-none"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                            />
                            <Button onClick={handleJoin} size="sm" className="shrink-0">
                                Join
                            </Button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-white/50">or</span>
                            <Button
                                onClick={handleCreate}
                                variant="secondary"
                                className="flex-1"
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                New Canvas
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-10 mx-auto flex w-full justify-center opacity-50">
                <p className="text-sm text-white/30">Trusted by designers and developers worldwide</p>
            </div>
        </section>
    );
}
