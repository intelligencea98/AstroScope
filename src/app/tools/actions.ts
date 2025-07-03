'use server';

import { getRecentEpicImages, buildEpicImageUrl, getApod as fetchApod } from '@/services/nasa-donki';

export interface EpicImageData {
    caption: string;
    date: string;
    imageUrl: string;
}

export async function getLatestEpicImages(): Promise<EpicImageData[]> {
    const images = await getRecentEpicImages();
    if (!images || images.length === 0) {
        return [];
    }

    return images.map((img: any) => ({
        caption: img.caption,
        date: new Date(img.date).toUTCString(),
        imageUrl: buildEpicImageUrl(img),
    }));
}

// Data structure from NASA APOD API
export interface ApodData {
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: 'image' | 'video';
    title: string;
    url: string;
    copyright?: string;
}

export async function getTodaysApod(): Promise<ApodData | null> {
    try {
        const data = await fetchApod();
        return data as ApodData;
    } catch (error) {
        console.error("Failed to fetch APOD:", error);
        return null;
    }
}
