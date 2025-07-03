'use server';

import { getRecentEpicImages, buildEpicImageUrl } from '@/services/nasa-donki';

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
