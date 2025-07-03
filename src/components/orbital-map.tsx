import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Globe, Layers, MousePointerClick, Satellite, ShieldAlert, SlidersHorizontal } from "lucide-react";

export default function OrbitalMap() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Orbital Map</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] md:h-[600px] lg:h-[calc(100%-4.5rem)]">
        <div className="w-full h-full rounded-lg overflow-hidden relative border-2 border-primary/20 bg-background">
          <Image
            src="https://placehold.co/1200x800.png"
            alt="Orbital Map Placeholder"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            data-ai-hint="earth space"
          />
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm animate-in fade-in duration-500">
                <CardHeader>
                    <CardTitle className="font-headline text-primary">Map Features Roadmap</CardTitle>
                    <CardDescription>Key functionalities for the interactive map visualization.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <ul className="list-inside space-y-3">
                        <li className="flex items-start gap-3">
                            <Satellite className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <span className="font-semibold">Interactive Orbital Objects:</span>
                                <p className="text-muted-foreground text-xs">Plot real-time satellite positions, asteroid paths, and space weather events.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Layers className="h-4 w-4 mt-1 text-primary shrink-0"/>
                             <div>
                                <span className="font-semibold">Dynamic Risk Zones:</span>
                                <p className="text-muted-foreground text-xs">Highlight high-risk regions like debris fields and solar flare paths with toggleable overlays.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <SlidersHorizontal className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <span className="font-semibold">Timeline Scrubber:</span>
                                 <p className="text-muted-foreground text-xs">Drag a slider to view object positions over time, like for the next 24 hours.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3">
                            <MousePointerClick className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <span className="font-semibold">Click-to-Inspect:</span>
                                 <p className="text-muted-foreground text-xs">Click any object to get detailed info like name, speed, distance, and threat level.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3">
                            <ShieldAlert className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <span className="font-semibold">Alert Badges:</span>
                                <p className="text-muted-foreground text-xs">Display urgent threat notifications directly on the map.</p>
                            </div>
                        </li>
                         <li className="flex items-start gap-3">
                            <Globe className="h-4 w-4 mt-1 text-primary shrink-0"/>
                            <div>
                                <span className="font-semibold">Enhancements:</span>
                                <p className="text-muted-foreground text-xs">Future plans include a full 3D globe, debris density heatmaps, and a live feed window.</p>
                            </div>
                        </li>
                    </ul>
                </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
