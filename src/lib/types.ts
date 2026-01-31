export type EventType = 'breaking' | 'viral' | 'history' | 'default';
export type VerificationStatus = 'verified' | 'claim' | 'debunked' | 'uncertain';

export interface Source {
    id: string;
    name: string;
    url: string;
    icon?: string;
}

export interface TimelineItem {
    id: string;
    time: string; // ISO string or simple time string like "14:30"
    title: string;
    description: string;
    status?: 'new' | 'update' | 'final';
}

export interface NewsEvent {
    id: string;
    title: string;
    summary: string;
    content?: string; // Full content
    date: string; // ISO string
    type: EventType;
    verificationStatus?: VerificationStatus;
    sources: Source[];
    imageUrl?: string;
    isStarred?: boolean;
    category: string;
    timeline?: TimelineItem[];
}
