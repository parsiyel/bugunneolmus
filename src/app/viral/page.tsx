import { MOCK_EVENTS } from "@/lib/mock-data";
import { EventCard } from "@/components/features/event-card";
import { Flame } from "lucide-react";

export default function ViralPage() {
    const viralEvents = MOCK_EVENTS.filter(e => e.type === 'viral');

    return (
        <div className="max-w-md mx-auto px-4 space-y-6">
            <div className="flex items-center gap-2 py-2 text-purple-500">
                <Flame className="w-6 h-6 animate-pulse" />
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Viral Olaylar
                </h2>
            </div>

            <p className="text-sm text-muted-foreground">
                Sosyal medyada (X, Instagram, Ekşi) şu an en çok konuşulanlar.
            </p>

            <div className="space-y-6">
                {viralEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                ))}
                {viralEvents.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground">
                        Şu an viral bir olay yok.
                    </div>
                )}
            </div>
        </div>
    );
}
