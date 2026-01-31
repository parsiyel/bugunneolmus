import { EventType, VerificationStatus } from "./types";

export const MOCK_EVENTS = [
    {
        id: "1",
        title: "İstanbul'da Metro Arızası",
        summary: "M4 hattında teknik arıza nedeniyle seferler durdu. Binlerce yolcu mağdur oldu.",
        type: "breaking" as EventType,
        verification_status: "verified" as VerificationStatus,
        date: new Date().toISOString(),
        category: "Gündem",
        view_count: 12500,
        source_count: 5,
        sources: [
            { id: "1", name: "X (Twitter)", url: "#", type: "twitter" },
            { id: "2", name: "Metro İstanbul", url: "#", type: "official" }
        ]
    },
    {
        id: "2",
        title: "Viral Kedi Videosu",
        summary: "Kadıköy'de bir kedinin metro turnikesinden atlama anı viral oldu.",
        type: "viral" as EventType,
        verification_status: "verified" as VerificationStatus,
        date: new Date(Date.now() - 3600000).toISOString(),
        category: "Yaşam",
        view_count: 500000,
        source_count: 12,
        sources: [
            { id: "1", name: "Instagram", url: "#", type: "instagram" },
            { id: "2", name: "TikTok", url: "#", type: "tiktok" }
        ]
    },
    {
        id: "3",
        title: "Tarihi Bina Restorasyonu Tartışması",
        summary: "Galata'daki tarihi binanın restorasyonunda beton kullanıldığı iddiaları tepki çekti.",
        type: "history" as EventType,
        verification_status: "claim" as VerificationStatus,
        date: new Date(Date.now() - 7200000).toISOString(),
        category: "Kültür",
        view_count: 8500,
        source_count: 3,
        sources: [
            { id: "1", name: "Ekşi Sözlük", url: "#", type: "sozluk" }
        ]
    }
];
