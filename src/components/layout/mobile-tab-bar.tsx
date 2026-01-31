"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Flame, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
    {
        name: "Akış",
        href: "/",
        icon: Home,
    },
    {
        name: "Viral",
        href: "/viral",
        icon: Flame,
    },
    {
        name: "Hafıza",
        href: "/saved",
        icon: Star,
    },
];

export function MobileTabBar() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-lg safe-area-bottom">
            <nav className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute -top-[1px] w-12 h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <Icon className={cn("w-6 h-6 mb-1", isActive && "drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]")} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
