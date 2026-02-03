"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Pencil, Moon, Download } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Hand-drawn feel",
        description: "Sketch diagrams that look like they were drawn by hand.",
        icon: Pencil,
        className: "md:col-span-1 md:row-span-2 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10",
    },
    {
        title: "Real-time Collaboration",
        description: "Work with your team on the same canvas, at the same time.",
        icon: Users,
        className: "md:col-span-1 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10",
    },
    {
        title: "Dark Mode",
        description: "Easy on the eyes for those late night brainstorming sessions.",
        icon: Moon,
        className: "md:col-span-1 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/10 dark:to-gray-900/10",
    },
    {
        title: "Export to SVG/PNG",
        description: "Download your diagrams in high quality formats.",
        icon: Download,
        className: "md:col-span-2 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function Features() {
    return (
        <section id="features" className="py-24 relative z-10">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Built for speed & creativity</h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">Everything you need to visualize your ideas.</p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-rows-2"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={item} className={feature.className}>
                            <Card className="h-full border-border/50 bg-white/50 backdrop-blur-sm transition-all hover:shadow-lg dark:bg-zinc-900/50">
                                <CardHeader>
                                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm border border-border/50">
                                        <feature.icon className="h-6 w-6 text-foreground" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
