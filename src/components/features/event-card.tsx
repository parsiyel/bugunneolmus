"use client";

import { NewsEvent } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Clock, Share2, Star, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { motion } from "framer-motion";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { cn } from "@/lib/utils";

interface EventCardProps {
    event: NewsEvent;
    index: number;
}

export function EventCard({ event, index }: EventCardProps) {
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const isSaved = isBookmarked(event.id);

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link click
        e.stopPropagation();

        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: event.summary,
                    url: window.location.origin + `/event/${event.id}`,
                });
            } catch (err) {
                console.log("Share cancelled");
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.origin + `/event/${event.id}`);
            alert("Link kopyalandı!");
        }
    };

    const handleBookmark = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark(event.id);
    };

    const getVerificationIcon = (status?: string) => {
        switch (status) {
            case "verified":
                return <CheckCircle2 className="w-3 h-3 mr-1" />;
            case "claim":
                return <AlertTriangle className="w-3 h-3 mr-1" />;
            case "debunked":
                return <AlertTriangle className="w-3 h-3 mr-1" />;
            default:
                return <HelpCircle className="w-3 h-3 mr-1" />;
        }
    };

    const getVerificationBadgeVariant = (status?: string) => {
        switch (status) {
            case "verified":
                return "verified";
            case "claim":
            case "debunked":
                return "destructive";
            default:
                return "secondary";
        }
    };

    const getVerificationLabel = (status?: string) => {
        switch (status) {
            case "verified":
                return "Doğrulandı";
            case "claim":
                return "İddia";
            case "debunked":
                return "Yalanlandı";
            default:
                return "Belirsiz";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
            <Link href={`/event/${event.id}`} className="block">
                {event.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden">
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 flex gap-2">
                            {event.type === 'viral' && (
                                <Badge variant="viral" className="bg-purple-600 text-white border-none shadow-lg backdrop-blur-sm">
                                    Viral
                                </Badge>
                            )}
                            {event.type === 'breaking' && (
                                <Badge variant="destructive" className="animate-pulse shadow-lg">
                                    Son Dakika
                                </Badge>
                            )}
                        </div>
                    </div>
                )}

                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] text-muted-foreground border-zinc-700">
                                {event.category}
                            </Badge>
                            {event.verificationStatus && (
                                <Badge variant={getVerificationBadgeVariant(event.verificationStatus) as any} className="text-[10px]">
                                    {getVerificationIcon(event.verificationStatus)}
                                    {getVerificationLabel(event.verificationStatus)}
                                </Badge>
                            )}
                        </div>
                        <span className="text-[10px] text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatDistanceToNow(new Date(event.date), { addSuffix: true, locale: tr })}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold leading-tight mb-2 text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {event.summary}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex items-center gap-2">
                            {event.sources.map((source) => (
                                <span key={source.id} className="text-[10px] bg-secondary px-2 py-1 rounded text-secondary-foreground">
                                    {source.name}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleBookmark}
                                className={cn(
                                    "p-2 rounded-full hover:bg-secondary transition-colors",
                                    isSaved ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                <Star className={cn("w-4 h-4", isSaved && "fill-current")} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-blue-400"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
