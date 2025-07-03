'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getTodaysApod } from "@/app/tools/actions";
import { Skeleton } from "./ui/skeleton";
import type { ApodData } from "@/app/tools/actions";

function ApodError() {
    return (
        <Card className="h-full flex flex-col items-center justify-center">
            <CardHeader>
                <CardTitle>Unable to Load Picture of the Day</CardTitle>
                <CardDescription>There was an issue fetching the data from NASA's APOD API. Please try again later.</CardDescription>
            </CardHeader>
        </Card>
    );
}

function ApodLoading() {
     return (
        <Card className="h-full flex flex-col animate-pulse">
            <CardHeader>
                <Skeleton className="h-8 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <div className="space-y-2 flex-shrink-0">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-5/6 rounded-md" />
                </div>
            </CardContent>
             <CardFooter>
                <Skeleton className="h-4 w-1/4 ml-auto rounded-md" />
            </CardFooter>
        </Card>
    );
}

// The component is named OrbitalMap to match the filename and avoid breaking imports.
// Its function is now to display the Astronomy Picture of the Day.
export default function OrbitalMap() {
    const [data, setData] = useState<ApodData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        
        const fetchData = async () => {
            const apodData = await getTodaysApod();
            if (isMounted) {
                setData(apodData);
                setLoading(false);
            }
        };
        
        // Initial fetch
        fetchData();

        // Re-fetch every hour to see if there's a new picture
        const intervalId = setInterval(fetchData, 60 * 60 * 1000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);


    const getYouTubeEmbedUrl = (url: string) => {
        try {
            const urlObj = new URL(url);
            let videoId = urlObj.searchParams.get('v');
            if (urlObj.hostname === 'youtu.be') {
                videoId = urlObj.pathname.slice(1);
            }
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        } catch (e) {
            if (url.includes('embed/')) {
                return url;
            }
        }
        return url; // Fallback
    }

    if (loading) {
        return <ApodLoading />;
    }

    if (!data) {
        return <ApodError />;
    }

    return (
        <Card className="h-full flex flex-col animate-in fade-in duration-500">
            <CardHeader>
                <CardTitle className="font-headline">{data.title}</CardTitle>
                <CardDescription>Astronomy Picture of the Day for {new Date(data.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col gap-4">
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border bg-muted">
                    {data.media_type === 'image' ? (
                        <Image
                            src={data.hdurl || data.url}
                            alt={data.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain"
                            data-ai-hint="space galaxy"
                            priority
                        />
                    ) : (
                        <iframe
                            src={getYouTubeEmbedUrl(data.url)}
                            title={data.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    )}
                </div>
                 <div className="flex-shrink-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">{data.explanation}</p>
                </div>
            </CardContent>
            {data.copyright && (
                <CardFooter>
                    <p className="text-xs text-muted-foreground w-full text-right">Copyright: {data.copyright}</p>
                </CardFooter>
            )}
        </Card>
    );
}
