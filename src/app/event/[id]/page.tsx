"use client";

import { use, useEffect, useState } from "react";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { NewsEvent } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, Share2, Star, CheckCircle2, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import { tr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useBookmarks } from "@/hooks/use-bookmarks";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const [event, setEvent] = useState<NewsEvent | null>(null);
    const { isBookmarked, toggleBookmark } = useBookmarks();

    // Unwrapping params using React.use() or async effect
    useEffect(() => {
        params.then((unwrap) => {
            const found = MOCK_EVENTS.find((e) => e.id === unwrap.id);
            if (found) setEvent(found);
        });
    }, [params]);

    if (!event) return null; // Or skeleton

    const isSaved = isBookmarked(event.id);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: event.title,
                    text: event.summary,
                    url: window.location.href,
                });
            } catch (err) { }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link kopyalandı!");
        }
    };

    return (
        <div className="pb-24">
            {/* Hero Image */}
            <div className="relative h-64 w-full">
                {event.imageUrl ? (
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-secondary" />
                )}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
                    <Link href="/" className="p-2 bg-black/40 rounded-full text-white backdrop-blur-md hover:bg-black/60 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex gap-2">
                        <button
                            onClick={() => toggleBookmark(event.id)}
                            className={cn("p-2 bg-black/40 rounded-full text-white backdrop-blur-md hover:bg-black/60 transition-colors", isSaved && "text-yellow-400")}
                        >
                            <Star className={cn("w-5 h-5", isSaved && "fill-current")} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-2 bg-black/40 rounded-full text-white backdrop-blur-md hover:bg-black/60 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
                    <Badge className="mb-2 bg-primary text-primary-foreground">{event.category}</Badge>
                    <h1 className="text-2xl font-bold leading-tight text-white shadow-sm">
                        {event.title}
                    </h1>
                </div>
            </div>

            <div className="px-4 py-6 space-y-6">
                {/* Verification Status */}
                {event.verificationStatus && (
                    <div className={cn(
                        "p-3 rounded-lg border flex items-start gap-3",
                        event.verificationStatus === 'verified' ? "bg-emerald-500/10 border-emerald-500/20" :
                            event.verificationStatus === 'claim' ? "bg-yellow-500/10 border-yellow-500/20" : "bg-secondary border-border"
                    )}>
                        {event.verificationStatus === 'verified' ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                        <div>
                            <h4 className={cn("font-semibold text-sm",
                                event.verificationStatus === 'verified' ? "text-emerald-500" : "text-yellow-500"
                            )}>
                                {event.verificationStatus === 'verified' ? "Doğrulanmış Bilgi" : "İddia Aşamasında"}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                                Bu haber topluluk ve doğruluk kontrolü kaynakları tarafından incelenmiştir.
                            </p>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="lead text-lg text-foreground/90">{event.summary}</p>
                    <div className="my-4 h-px bg-border" />
                    <p className="text-muted-foreground">
                        {event.content || "Detaylı içerik henüz eklenmedi."}
                    </p>
                </div>

                {/* Timeline */}
                {event.timeline && event.timeline.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Olayın Gelişimi
                        </h3>
                        <div className="relative pl-4 border-l-2 border-border space-y-8 ml-2">
                            {event.timeline.map((item, i) => (
                                <div key={item.id} className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
                                    <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                                        {item.time.includes('-') ? format(new Date(item.time), "d MMM", { locale: tr }) : item.time}
                                    </span>
                                    <h4 className="text-sm font-semibold mt-1">{item.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sources */}
                <div className="pt-4">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Kaynaklar</h4>
                    <div className="flex flex-wrap gap-2">
                        {event.sources.map(s => (
                            <Link key={s.id} href={s.url} className="text-xs bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors text-secondary-foreground">
                                {s.name} ↗
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
