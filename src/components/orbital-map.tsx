import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground font-headline text-2xl">
              [ Interactive Map Visualization ]
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
