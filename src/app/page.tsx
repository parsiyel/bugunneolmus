import { MOCK_EVENTS } from "@/lib/mock-data";
import { EventCard } from "@/components/features/event-card";

export default function Home() {
  return (
    <div className="max-w-md mx-auto px-4 space-y-6">

      {/* Date Header Idea */}
      <div className="flex items-center justify-between py-2">
        <h2 className="text-xl font-bold">Bugün</h2>
        <span className="text-sm text-muted-foreground">31 Ocak Cumartesi</span>
      </div>

      <div className="space-y-6">
        {MOCK_EVENTS.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>

      <div className="text-center py-8">
        <p className="text-sm text-muted-foreground">Şimdilik bu kadar...</p>
      </div>
    </div>
  );
}
