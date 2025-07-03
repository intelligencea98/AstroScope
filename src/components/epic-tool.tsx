"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";

import { type EpicImageData, getLatestEpicImages } from "@/app/tools/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
} from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function EpicTool() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<EpicImageData[]>([]);

  async function handleAnalyze() {
    setLoading(true);
    setImages([]);
    try {
      const fetchedImages = await getLatestEpicImages();
      if (fetchedImages.length === 0) {
          toast({
            variant: "default",
            title: "No Images Found",
            description: "Could not find recent EPIC images.",
          });
      } else {
        setImages(fetchedImages);
        toast({
            title: "Images Loaded",
            description: `${fetchedImages.length} recent EPIC images loaded successfully.`,
        });
      }
    } catch (error) {
      console.error("Image fetch failed:", error);
      toast({
        variant: "destructive",
        title: "Fetch Failed",
        description: error instanceof Error ? error.message : "Could not fetch EPIC images.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="flex flex-col gap-4 p-4 border rounded-lg bg-muted/20">
        <div className="space-y-2">
          <h3 className="font-semibold font-headline">View Recent EPIC Images</h3>
          <p className="text-sm text-muted-foreground">
            Click the button to fetch the most recent daily imagery collected by DSCOVR's Earth Polychromatic Imaging Camera (EPIC).
          </p>
        </div>
        <Button onClick={handleAnalyze} disabled={loading} className="w-full">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Camera className="mr-2 h-4 w-4" />
          )}
          Fetch Latest Images
        </Button>
      </div>
      <div className="flex items-center justify-center min-h-[300px] lg:min-h-[450px]">
        {loading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
        {!loading && images.length === 0 && (
          <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
            <Camera className="mx-auto h-12 w-12" />
            <p className="mt-4 font-headline">EPIC Images will appear here</p>
          </div>
        )}
        {images.length > 0 && (
          <Carousel className="w-full max-w-sm animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-2">
                        <Image
                          src={image.imageUrl}
                          alt={image.caption}
                          width={400}
                          height={400}
                          className="rounded-md bg-muted"
                        />
                      </CardContent>
                      <CardFooter className="flex-col items-start gap-1 text-xs p-3">
                          <p className="font-semibold text-muted-foreground">{image.caption}</p>
                          <p className="text-muted-foreground/80">{image.date}</p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </div>
  );
}
