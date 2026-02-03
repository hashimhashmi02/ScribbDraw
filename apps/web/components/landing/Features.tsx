"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Shield, Users, Palette } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Real-time Collaboration",
        description: "Work together with your team in real-time. See changes instantly as they happen.",
        icon: Users,
    },
    {
        title: "Infinite Canvas",
        description: "Never run out of space. Our infinite canvas lets your ideas grow without boundaries.",
        icon: Palette,
    },
    {
        title: "Secure by Default",
        description: "Your data is encrypted and secure. We prioritize privacy and data protection.",
        icon: Shield,
    },
    {
        title: "Lightning Fast",
        description: "Built for performance. Experience smooth drawing and interactions with zero lag.",
        icon: Zap,
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
        <section className="bg-background py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl">Features that empower your workflow</h2>
                    <p className="mt-4 text-muted-foreground md:text-lg">Everything you need to create amazing diagrams and sketches.</p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
                >
                    {features.map((feature, index) => (
                        <motion.div key={index} variants={item}>
                            <Card className="h-full border-border/40 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg">
                                <CardHeader>
                                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <feature.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
