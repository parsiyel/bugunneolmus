import { Bell } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 h-14 border-b border-border bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                <h1 className="text-lg font-bold tracking-tight text-foreground">
                    Bugün<span className="text-primary font-extrabold">Ne</span>Oldu?
                </h1>
            </div>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
        </header>
    );
}
