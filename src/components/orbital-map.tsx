import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

// Data structure from NASA APOD API
interface ApodData {
    date: string;
    explanation: string;
    hdurl?: string;
    media_type: 'image' | 'video';
    title: string;
    url: string;
    copyright?: string;
}

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

// The component is named OrbitalMap to match the filename and avoid breaking imports.
// Its function is now to display the Astronomy Picture of the Day.
export default function OrbitalMap({ data }: { data: ApodData | null }) {
    if (!data) {
        return <ApodError />;
    }

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
