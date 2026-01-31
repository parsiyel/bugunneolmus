"use client";

import { useBookmarks } from "@/hooks/use-bookmarks";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { EventCard } from "@/components/features/event-card";
import { Bookmark, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SavedPage() {
    const { bookmarkedIds, isInitialized } = useBookmarks();

    // Filter events based on bookmarks
    const savedEvents = MOCK_EVENTS.filter(event => bookmarkedIds.includes(event.id));

    if (!isInitialized) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto px-4 space-y-6">
            <div className="flex items-center gap-2 py-2">
                <Bookmark className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Koleksiyonum</h2>
            </div>

            {savedEvents.length > 0 ? (
                <div className="space-y-6">
                    {savedEvents.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}
                </div>
            ) : (
                <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4"
                    >
                        <Bookmark className="w-10 h-10 text-muted-foreground" />
                    </motion.div>

                    <h2 className="text-2xl font-bold">Listeniz Boş</h2>
                    <p className="text-muted-foreground max-w-[250px]">
                        Olayları kaydetmek için kartların üzerindeki yıldız ikonuna tıklayabilirsiniz.
                    </p>
                </div>
            )}
        </div>
    );
}
