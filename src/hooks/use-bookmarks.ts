"use client";

import { useState, useEffect } from "react";

export function useBookmarks() {
    const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Client-side only initialization
        const stored = localStorage.getItem("bookmarks");
        if (stored) {
            setBookmarkedIds(JSON.parse(stored));
        }
        setIsInitialized(true);
    }, []);

    const toggleBookmark = (id: string) => {
        setBookmarkedIds((prev) => {
            let newIds;
            if (prev.includes(id)) {
                newIds = prev.filter((i) => i !== id);
            } else {
                newIds = [...prev, id];
            }
            localStorage.setItem("bookmarks", JSON.stringify(newIds));
            return newIds;
        });
    };

    const isBookmarked = (id: string) => bookmarkedIds.includes(id);

    return { bookmarkedIds, toggleBookmark, isBookmarked, isInitialized };
}
